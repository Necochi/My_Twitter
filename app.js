import express from 'express';
import pg from 'pg';
import bcrypt from 'bcrypt';

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
app.use(express.json());

app.get('/posts', (req, res) => {
  const query = `
  SELECT * FROM posts;
  `;

  client
    .query(query)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.log('error', err);
    });
});

console.log(client.query);

app.get('/date', (req, res) => res.type('json').send({ date: new Date() }));

// -- Posts endpoints ---

app.post('/posts.json', async (req, res) => {
  const {
    userId, name, mail, message, imgMessage,
  } = req.body;
  try {
    const currentDate = new Date();
    const query = `INSERT INTO posts (userId, name, mail, message, "quantityReposts", "quantityLike", "quantityShare", "imgMessage", date)
    VALUES ($1, $2, $3, $4, 0, 0, 0, $5, $6)
    RETURNING *`;

    const result = await client.query(query, [
      userId,
      name,
      mail,
      message,
      imgMessage || '',
      currentDate,
    ]);

    res.json(result.rows);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/posts/:id.json', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [id],
    );
    res.json(result.rows, 'Deleted post whith');
  } catch (error) {
    console.log(error);
  }
});

app.post('/posts/:id.json', async (req, res) => {
  const { id } = req.params;

  const {
    message, imgMessage, quantityReposts, quantityLike, quantityShare,
  } = req.body;

  try {
    const recentPost = 'SELECT * FROM posts WHERE id = $1';
    const recentPostGet = await client.query(recentPost, [id]);
    const recentPostBody = recentPostGet.rows[0];

    const query = `UPDATE posts
    SET message = $1, "imgMessage" = $2, "quantityReposts" = $3, "quantityLike" = $4, "quantityShare" = $5
    WHERE id = $6 RETURNING *`;
    const result = await client.query(query, [
      message || recentPostBody.message,
      imgMessage || recentPostBody.imgMessage,
      quantityReposts || recentPostBody.quantityReposts,
      quantityLike || recentPostBody.quantityLike,
      quantityShare || recentPostBody.quantityShare,
      id,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
  }
});

// --- Authorization endpoints ---

app.post('/createUser', async (req, res) => {
  const { mail, password } = req.body;
  try {
    const checkingEmail = 'SELECT * FROM "userAuthorization" WHERE mail = $1';
    const createUserData = `INSERT INTO "userAuthorization" (mail, password)
    VALUES ($1, $2) RETURNING *`;

    const checkMail = await client.query(checkingEmail, [mail]);

    if (checkMail.rows.length > 0) {
      return res.status(400).json({ error: 'Email уже существует' });
    }
    const createSalt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, createSalt);

    const createUser = await client.query(createUserData, [mail, hashedPass]);
    console.log('Пользователь создан:', createUser.rows);

    return res.json(createUser.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

app.post('/login', async (req, res) => {
  const { mail, password } = req.body;

  try {
    const checkingMail = 'SELECT * FROM "userAuthorization" WHERE mail = $1';
    let result;

    const checkMail = await client.query(checkingMail, [mail]);
    if (checkMail.rows.length !== 1) {
      result = res.status(400).json({ error: 'Неверный логин' });
    } else {
      const truePass = await bcrypt.compare(password, checkMail.rows[0].password);
      if (truePass) {
        result = res.status(200).json({ text: 'Успешно залогинены!' });
      } else {
        result = res.status(400).json({ error: 'Неправильный пароль' });
      }
    }
    return result;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'some server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
