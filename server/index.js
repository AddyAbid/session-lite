require('dotenv/config');
const pg = require('pg');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
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
  const sql = 'select * from "posts" order by "postId"';
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
  const message = req.body.offerAmount;
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
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
