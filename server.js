"use strict";
const mariadb = require("mariadb");
const express = require("express");
const router = express.Router();
const { query } = require("./sql.js");
const summoners_routes = require("./routes/summoner.js");
const PORT = 8080;
const HOST = "0.0.0.0";

// App
const app = express();

app.get("/todos", async (req, res) => {
  const obj = await getTodos();
  res.send(obj);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/summoners", summoners_routes);

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
