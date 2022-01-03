require('dotenv/config');
const pg = require('pg');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const ClientError = require('./client-error');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.post('/api/sessions/', uploadsMiddleware, (req, res, next) => {
  const { title, description, price } = req.body;
  if (!title || !description) {
    throw new ClientError(400, 'title and description are required fields');
  }
  const url = `/images/${req.file.filename}`;
  const sql = 'insert into "posts" ("title", "description", "price", "imgUrl", "userId") values ($1, $2, $3, $4, $5) returning *';
  const params = [title, description, price, url, 1];

  db.query(sql, params)
    .then(response => {
      res.status(201).json(response.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/sessions', (req, res, next) => {
  const sql = 'select * from "posts" order by "postId" desc';
  db.query(sql)
    .then(response => {
      res.status(200).json(response.rows);
    })
    .catch(err => next(err));
});

app.get('/api/sessions/:postId', (req, res, next) => {
  const postId = Number(req.params.postId);
  if (!Number(postId) || postId < 1) {
    res.status(400).json({ error: 'post Id must be a positive integer' });

  }
  const sql = 'select "title", "description", "price", "imgUrl", "userId" from "posts" where "postId" = $1';
  const params = [postId];
  db.query(sql, params)
    .then(response => {
      const post = response.rows[0];
      if (!post) {
        res.status(400).json({
          error: `cannot find post with postId ${postId}`
        });
        return;
      }
      res.json(post);
    })
    .catch(err => next(err));
});
app.post('/api/sessions/:recipientId', (req, res, next) => {
  const message = `Hi, I would like to book this session for $${req.body.offerAmount}!`;
  const postId = req.body.postId;
  const { recipientId } = req.params;
  if (!message) {
    throw new ClientError(400, 'message is required field');
  }
  const sql = 'insert into "messages" ("message", "recipientId", "postId", "senderId") values ($1, $2, $3, $4) returning * ';
  const params = [message, recipientId, postId, 2];
  db.query(sql, params)
    .then(response => {
      const [message] = response.rows;
      res.status(200).json(message);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = 'select "username", "userId", "password" from "users" where username = $1';
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const hashedPassword = result.rows[0].password;
      const userId = result.rows[0].userId;
      argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = {
            user: {
              userId: userId,
              username: username
            }
          };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          payload.token = token;
          res.status(201).json(payload);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.get('/api/messages', authorizationMiddleware, (req, res, next) => {
  const userId = req.user.user.userId;
  // using a common table expression
  const sql = `with "receivedOffers" as (
    --get the columns
  select "u"."userId",
         "u"."username",
         "p"."postId",
         "p"."title",
         "p"."imgUrl",
         "m"."message",
    --assigning a row number to every row in the groups
         row_number() over (
    --grouping messages by who its from and what its about
           partition by ("m"."senderId", "m"."postId")
    --sorting by most recent messages
               order by "m"."createdAt" desc
         ) as "row number"
    from "messages" as "m"
    join "posts" as "p" using ("postId")
    join "users" as "u"
      on "m"."senderId" = "u"."userId"
   where "m"."recipientId" = $1
  )
  select "userId",
        "username",
        "postId",
        "title",
        "imgUrl",
        "message"
    from "receivedOffers"
    --get the most recent message from each group of messages
  where "row number" = 1`;

  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/messages/:postId/:senderId', authorizationMiddleware, (req, res, next) => {
  const { postId, senderId } = req.params;
  const recipientId = req.user.user.userId;
  const sql = `select "u"."userId",
              "u"."username",
              "p"."postId",
              "p"."title",
              "p"."price",
              "p"."imgUrl",
              "m"."message"
          from "messages" as "m"
          join "posts" as "p" using ("postId")
          join "users" as "u"
            on "m"."senderId" = "u"."userId"
        where "postId" = $3
        and (
          ("recipientId" = $1 and "senderId" = $2) or
          ("recipientId" = $2 and "senderId" = $1)
          )
          order by "m"."createdAt" desc`;
  const params = [recipientId, senderId, postId];
  db.query(sql, params)
    .then(response => {
      res.status(200).json(response.rows);
    })
    .catch(err => next(err));
});

app.post('/api/messages/:postId/:senderId', (req, res, next) => {
  const { reply } = req.body;
  const { postId, senderId } = req.params;
  const sql = `insert into "messages"
               ("message", "recipientId", "postId", "senderId")
               values ($1, $2, $3, $4)
               returning *
               `;
  const params = [reply, 1, postId, senderId];
  db.query(sql, params)
    .then(response => {
      res.status(201).json(response.rows[0]);
    });
});
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
