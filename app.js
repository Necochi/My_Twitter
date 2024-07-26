import express from "express";
import pg from "pg";

const app = express();
const port = 3000;
const { Client } = pg;
const client = new Client({
  user: "database_for_mytwitter_user",
  password: "K4Hw7ZEFJrb4CP5M4jXWBc3XkB5MGP0j",
  host: "dpg-cq8gpdqj1k6c73ckjsjg-a.oregon-postgres.render.com",
  port: 5432,
  database: "database_for_mytwitter",
  ssl: true,
});
await client.connect();

app.use(express.static("public"));
app.use(express.json());

app.get("/posts", (req, res) => {
  const query = `
  SELECT * FROM posts;
  `;

  client
    .query(query)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.log("error", err);
    });
});

console.log(client.query);

app.get("/date", (req, res) => res.type("json").send({ date: new Date() }));

app.post("/posts.json", async (req, res) => {
  const { user_id, name, mail, message, img_message } = req.body;
  try {
    const currentDate = new Date();
    const query = `INSERT INTO posts (user_id, name, mail, message, quantity_reposts, quantity_like, quantity_share, img_message, date)
    VALUES ($1, $2, $3, $4, 0, 0, 0, $5, $6)
    RETURNING *`;

    const result = await client.query(query, [
      user_id,
      name,
      mail,
      message,
      img_message || "",
      currentDate,
    ]);

    res.json(result.rows);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/posts/:id.json", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await client.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );
    res.json("Deleted post whith");
  } catch (error) {
    console.log(error);
  }
});

app.post("/posts/:id.json", async (req, res) => {
  const id = req.params.id;

  const {
    message,
    img_message,
    quantity_reposts,
    quantity_like,
    quantity_share,
  } = req.body;

  try {
    const recentPost = `SELECT * FROM posts WHERE id = $1`;
    const recentPostGet = await client.query(recentPost, [id]);
    const recentPostBody = recentPostGet.rows[0];

    const query = `UPDATE posts
    SET message = $1, img_message = $2, quantity_reposts = $3, quantity_like = $4, quantity_share = $5
    WHERE id = $6 RETURNING *`;
    const result = await client.query(query, [
      message || recentPostBody.message,
      img_message || recentPostBody.img_message,
      quantity_reposts || recentPostBody.quantity_reposts,
      quantity_like || recentPostBody.quantity_like,
      quantity_share || recentPostBody.quantity_share,
      id,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
