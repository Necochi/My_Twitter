import express from 'express';
import pg from 'pg';

const app = express();
const port = 3000;
const { Client } = pg;
const client = new Client({
  user: 'database_for_mytwitter_user',
  password: 'K4Hw7ZEFJrb4CP5M4jXWBc3XkB5MGP0j',
  host: 'dpg-cq8gpdqj1k6c73ckjsjg-a.oregon-postgres.render.com',
  port: 5432,
  database: 'database_for_mytwitter',
  ssl: true,
});
await client.connect();

app.use(express.static('public'));

app.get('/posts', (req, res) => {
  const query = `
  SELECT * FROM posts;
  `;

  client
    .query(query)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.log('error', err);
    });
});

console.log(client.query);

app.get('/date', (req, res) => res.type('json').send({ date: new Date() }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
