require('dotenv/config');
const pg = require('pg');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const ClientError = require('./client-error');

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

app.post('/api/sessions', uploadsMiddleware, (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    throw new ClientError(400, 'title and description are required fields');
  }
  const url = `/images/${req.file.filename}`;
  const sql = 'insert into "posts" ("title", "description", "imgUrl") values ($1, $2, $3) returning *';
  const params = [title, description, url];

  db.query(sql, params)
    .then(response => {
      res.status(201).json(response.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
