import express from 'express';
import pg from 'pg';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;
const { Client } = pg;
const client = new Client({
  user: 'postgres.rauzumdprohaiyubtqsk',
  password: 'OwRzQjFsox7rvdSB',
  host: 'aws-0-us-west-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
});
await client.connect();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

client.keepAliveTimeout = 120000;
client.headersTimeout = 120000;

app.get('/posts', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM posts');
    const data = result.rows;
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

console.log(client.query);

app.get('/date', (req, res) => res.type('json').send({ date: new Date() }));

// — Posts endpoints —-

app.post('/posts.json', async (req, res) => {
  const { name, message, imgMessage } = req.body;
  console.log(req.body);
  try {
    console.log(req.cookies.mail);
    const email = req.cookies.mail;
    const getUserId = 'SELECT * FROM "userAuthorization" WHERE mail = $1';
    const readyUserId = await client.query(getUserId, [email]);
    console.log(readyUserId.rows[0].id);
    const currentDate = new Date();
    const query = `INSERT INTO posts ("userId", name, mail, message, "quantityReposts", "quantityLike", "quantityShare", "imgMessage", date)
VALUES ($1, $2, $3, $4, 0, 0, 0, $5, $6)
RETURNING *`;

    const result = await client.query(query, [
      readyUserId.rows[0].id,
      name,
      email,
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
  const token = crypto.randomUUID();
  const { mail, password } = req.body;
  const userToken = token;
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

      if (session.rowCount === 0) {
        const result = await client.query(postToken, [
          userId,
          userToken,
          currentDate,
        ]);
        console.log(result.rows);

        res.cookie('userToken', userToken, {
          maxAge: 604800000,
          httpOnly: false,
        });
        res.cookie('mail', mail, {
          maxAge: 604800000,
          httpOnly: false,
        });
      } else {
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
  const token = crypto.randomUUID();
  const { mail, password } = req.body;
  const userToken = token;

  try {
    const checkingMail = 'SELECT * FROM "userAuthorization" WHERE mail = $1';
    let result;
    const checkMail = await client.query(checkingMail, [mail]);
    const userId = checkMail.rows[0].id;
    if (checkMail.rows.length !== 1) {
      result = res.status(400).json({ error: 'Неверный логин' });
    } else {
      const truePass = await bcrypt.compare(
        password,
        checkMail.rows[0].password,
      );
      if (truePass) {
        try {
          const currentDate = new Date();
          const postToken = `INSERT INTO sessions ("userId", token, "createdAt")
VALUES ($1, $2, $3) RETURNING *`;
          const sendToken = await client.query(postToken, [
            userId,
            userToken,
            currentDate,
          ]);
          console.log('sendToken', sendToken.rows);

          res.cookie('userToken', userToken, {
            maxAge: 604800000,
            httpOnly: false,
          });
          res.cookie('mail', mail, {
            maxAge: 604800000,
            httpOnly: false,
          });
        } catch (error) {
          console.log(error);
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

app.get('/protected-route', async (req, res) => {
  const { userToken } = req.cookies;
  const { mail } = req.cookies;

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

  console.log('session', session.rows[0].createdAt);

  if (session.rows[0].createdAt >= maxDate) {
    return res.status(401).send('Токен просрочен, авторизуйтесь заново!');
  }

  return res
    .status(200)
    .send('Всё прошло успешно, токен и почта дейтсвительны!');
});

async function isValidToken(token) {
  const getToken = 'SELECT * FROM sessions WHERE token = $1';
  const isTokenExist = await client.query(getToken, [token]);
  console.log('is token exist', isTokenExist.rows);

  if (isTokenExist.rowCount === 1 && isTokenExist.rows[0].token === token) {
    return true;
  }
  return false;
}

app.get('/api/feed', (req, res) => {
  const { userToken } = req.cookies;
  if (!userToken || !isValidToken(userToken)) {
    return res.status(401).send({ text: 'Пользователь не авторизован' });
  }
  return res.status(200).send({ text: 'Всё ок' });
});

app.post('/updateUserInfo', async (req, res) => {
  const {
    avatar,
    name,
    nickname,
    about,
    location,
    website,
    birthday,
    whoSeeBirthday,
  } = req.body;
  const { mail } = req.cookies;
  let nicknameUsed;
  try {
    const nicknameUsingQuery = `SELECT * FROM "userAuthorization"
  WHERE nickname = $1`;
    const nicknameUsing = await client.query(nicknameUsingQuery, [nickname]);
    const prevUserInfo = 'SELECT * FROM "userAuthorization" WHERE mail = $1';
    const getPrevUserInfo = await client.query(prevUserInfo, [mail]);

    if (nicknameUsing.rowCount > 0 && nicknameUsing.rows[0].mail !== mail) {
      nicknameUsed = true;
      console.log('Не удалось изменить никнейм');
    } else {
      const changeNickname = 'UPDATE "userAuthorization" SET nickname = $1 WHERE mail = $2';
      await client.query(changeNickname, [nickname, mail]);
      console.log('Никнейм изменён!');
    }
    const changeInfo = `UPDATE "userAuthorization"
    SET name = $1, about = $2, location = $3, website = $4, birthday = $5, "whoSeeBirthday" = $6, avatar = $7
    WHERE mail = $8`;
    await client.query(changeInfo, [
      name || getPrevUserInfo.rows[0].name,
      about || getPrevUserInfo.rows[0].about,
      location || getPrevUserInfo.rows[0].location,
      website || getPrevUserInfo.rows[0].website,
      birthday || getPrevUserInfo.rows[0].birthday,
      whoSeeBirthday,
      avatar || getPrevUserInfo.rows[0].avatar,
      mail,
    ]);
    return res.status(200).json({ nicknameUsed });
  } catch (error) {
    return res.status(500);
  }
});

app.get('/getUserInfo', async (req, res) => {
  const { mail } = req.cookies;
  const getUserInfoSQL = 'SELECT * FROM "userAuthorization" WHERE mail = $1';
  let result;
  try {
    const getUserInfo = await client.query(getUserInfoSQL, [mail]);

    if (getUserInfo.rowCount === 1) {
      result = res.status(200).json({
        user: getUserInfo.rows[0],
      });
    } else {
      result = res
        .status(401)
        .json({ text: 'Данные о пользователе не получены' });
    }
  } catch (error) {
    console.log(error);
    result = res.status(500).json({ text: 'Ошибка сервера' });
  }
  return result;
});

app.get('/getAllUsers', async (req, res) => {
  const getAllUsersSQL = 'SELECT * FROM "userAuthorization"';
  const query = await client.query(getAllUsersSQL);
  return res.status(200).json(query.rows);
});

app.post('/changePass', async (req, res) => {
  const { oldPass, newPass } = req.body;
  const { mail, userToken } = req.cookies;
  const qGetUser = 'SELECT * FROM "userAuthorization" WHERE mail = $1';
  const qtrueToken = 'SELECT * FROM sessions WHERE "userId" = $1 AND token = $2';
  const qUpdatePass = 'UPDATE "userAuthorization" SET password = $1, "lastUpdatePass" = $2 WHERE mail = $3';

  const getUser = await client.query(qGetUser, [mail]);
  const userId = getUser.rows[0].id;
  const trueToken = await client.query(qtrueToken, [userId, userToken]);

  if (trueToken.rowCount === 1) {
    const thisDate = trueToken.rows[0].createdAt;
    const maxDate = new Date();
    maxDate.setDate(thisDate.getDate() + 7);
    if (thisDate >= maxDate) {
      return res.status(400).json('Старый токен!');
    }
  } else {
    return res.status(401).json('Неправильный токен!');
  }

  const checkOldPass = await bcrypt.compare(oldPass, getUser.rows[0].password);
  const checkNewPass = await bcrypt.compare(newPass, getUser.rows[0].password);
  let { lastUpdatePass } = getUser.rows[0];

  if (lastUpdatePass === null) {
    lastUpdatePass = new Date();
  }
  const lastUpdatePassMax = new Date();
  lastUpdatePassMax.setDate(lastUpdatePass.getDate() + 1);

  if (checkNewPass) {
    return res.status(400).json('Новый пароль должен отличаться от старого!');
  }

  if (!checkOldPass) {
    return res.status(400).json('Неправильный старый пароль!');
  }

  if (lastUpdatePass <= lastUpdatePassMax) {
    return res.status(400).json('Пароль можно менять лишь раз в день!');
  }

  if (!checkNewPass && checkOldPass) {
    const createSalt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(newPass, createSalt);
    await client.query(qUpdatePass, [hashedPass, new Date(), mail]);
    return res.status(200).json('Пароль успешно изменён!');
  }
  return res.status(400).json('Произошла какая-то ошибка');
});

app.post('/changeMail', async (req, res) => {
  const { newEmail, password } = req.body;
  const { mail, userToken } = req.cookies;
  const qGetUser = 'SELECT * FROM "userAuthorization" WHERE mail = $1';
  const qtrueToken = 'SELECT * FROM sessions WHERE "userId" = $1 AND token = $2';
  const qUpdateMail = 'UPDATE "userAuthorization" SET mail = $1 WHERE mail = $2';

  const getUser = await client.query(qGetUser, [mail]);
  const mailExist = await client.query(qGetUser, [newEmail]);
  let trueToken;

  if (getUser.rowCount === 1) {
    const userId = getUser.rows[0].id;
    if (userId !== null) {
      trueToken = await client.query(qtrueToken, [userId, userToken]);
      if (trueToken.rowCount === 1) {
        const thisDate = trueToken.rows[0].createdAt;
        const maxDate = new Date();
        maxDate.setDate(thisDate.getDate() + 7);
        if (thisDate >= maxDate) {
          return res.status(400).json('Старый токен!');
        }
      } else {
        return res.status(401).json('Неправильный токен!');
      }
    }
  }

  if (mailExist !== null && mailExist.rowCount !== 0) {
    return res.status(400).json('Почта уже занята!');
  }

  if (newEmail === mail) {
    return res.status(400).json('Новый адрес должен отличаться от старого!');
  }

  const passRight = await bcrypt.compare(password, getUser.rows[0].password);

  if (newEmail !== mail && passRight) {
    await client.query(qUpdateMail, [newEmail, mail]);
    res.cookie('mail', newEmail);
    return res.status(200).json('Почта успешно изменена!');
  }
  return res.status(400).json('Произошла какая-то ошибка');
});

const path = require('path');

// Если сервер не нашёл маршрут (например /feed),
// то пусть отдаёт React-приложение:
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
