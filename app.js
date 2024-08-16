import express from 'express';
import pg from 'pg';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;
const { Client } = pg;
const token = crypto.randomUUID();
const client = new Client({
  user: 'database2_pz1p_user',
  password: '3GRkghqQYJB64aPbwpLp02vpeJfLSrTO',
  host: 'dpg-cqt1bbdsvqrc73foglfg-a.oregon-postgres.render.com',
  port: 5432,
  database: 'database2_pz1p',
  ssl: true,
});
await client.connect();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

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

// — Posts endpoints —-

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

// —- Authorization endpoints —-

app.post('/createUser', async (req, res) => {
  const { mail, password } = req.body;
  let userToken = token;
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

    try {
      const currentDate = new Date();
      const postToken = `INSERT INTO sessions ("userId", token, "createdAt")
VALUES ($1, $2, $3) RETURNING *`;
      const checkUserId = await client.query(checkingEmail, [mail]);
      const userId = checkUserId.rows[0].id;
      const getToken = 'SELECT * from sessions WHERE "userId" = $1';
      const session = await client.query(getToken, [userId]);
      const existToken = session.rows[0].token;

      if (session.rowCount === 0) {
        const result = await client.query(postToken, [
          userId,
          userToken,
          currentDate,
        ]);
        console.log(result.rows);

        const userData = {
          userToken,
          mail,
        };

        res.cookie('token', userData, {
          maxAge: 604800000,
          httpOnly: true,
        });
      } else {
        userToken = existToken;
        const userData = {
          userToken,
          mail,
        };

        res.cookie('token', userData, {
          maxAge: 604800000,
          httpOnly: true,
        });
        console.log('cookie already exist');
      }
    } catch (error) {
      console.log(error);
    }

    return res.json(createUser.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

app.post('/login', async (req, res) => {
  const { mail, password } = req.body;
  let userToken = token;

  try {
    const checkingMail = 'SELECT * FROM "userAuthorization" WHERE mail = $1';
    let result;
    const checkMail = await client.query(checkingMail, [mail]);
    const userId = checkMail.rows[0].id;
    const getToken = 'SELECT * from sessions WHERE "userId" = $1';
    const session = await client.query(getToken, [userId]);
    const existToken = session.rows[0].token;
    if (checkMail.rows.length !== 1) {
      result = res.status(400).json({ error: 'Неверный логин' });
    } else {
      const truePass = await bcrypt.compare(
        password,
        checkMail.rows[0].password,
      );
      if (truePass) {
        if (session.rowCount === 0) {
          try {
            const currentDate = new Date();
            const postToken = `INSERT INTO sessions ("userId", token, "createdAt")
VALUES ($1, $2, $3) RETURNING *`;
            const sendToken = await client.query(postToken, [
              userId,
              userToken,
              currentDate,
            ]);
            console.log(sendToken.rows);

            const userData = {
              userToken,
              mail,
            };

            res.cookie('token', userData, {
              maxAge: 604800000,
              httpOnly: true,
            });

            console.log(req.cookies.token);
          } catch (error) {
            console.log(error);
          }
        } else {
          userToken = existToken;
          const userData = {
            userToken,
            mail,
          };

          res.cookie('token', userData, {
            maxAge: 604800000,
            httpOnly: true,
          });
          console.log('cookie already exist');
        }
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

app.get('/checking-token', async (req, res) => {
  const { userToken } = req.cookies.token;
  const { mail } = req.cookies.token;

  console.log(userToken, mail);

  if (!userToken || !mail) {
    return res.status(401).send('Необходима авторизация либо регистрация');
  }

  const getSession = 'SELECT * FROM sessions WHERE token = $1';
  const session = await client.query(getSession, [userToken]);
  console.log(session.rows);
  const thisDate = session.rows[0].createdAt;
  const maxDate = new Date();
  maxDate.setDate(thisDate.getDate() + 7);
  console.log(thisDate, maxDate);

  if (session.rowCount === 0) {
    return res.status(401).send('Такого токена нет!');
  }

  console.log(session.rows[0].createdAt);

  if (session.rows[0].createdAt >= maxDate) {
    return res.status(401).send('Токен просрочен, авторизуйтесь заново!');
  }

  return res
    .status(200)
    .send('Всё прошло успешно, токен и почта дейтсвительны!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
