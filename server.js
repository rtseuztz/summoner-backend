"use strict";
const mariadb = require("mariadb");
const express = require("express");

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

//DB
console.log(process.env.DB_PORT);
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: "root",
  password: "pass",
  database: "todos",
});
console.log(process.env.DB_HOST);
/*
async function asyncFunction() {

  let conn;
          try {
                        conn = await pool.getConnection();
                        const rows = await conn.query("SELECT * FROM todos");
                        console.log(rows); //[ {val: 1}, meta: ... ]

                    } catch (err) {
                                throw err;
                                  } finally {
                                        if (conn) return conn.end();
                                          }

}

//asyncFunction();
*/
async function getTodos() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM todos");
    return rows;
  } catch (err) {
    return err;
  }
}

/*
database.connect(function (err) {
        if (err) {
                console.log('Error connecting to Db');
                console.log(err);
                return;
        }
        console.log('Connection established');
        console.log(err);
});

*/
// App
const app = express();

app.get("/todos", async (req, res) => {
  const obj = await getTodos();
  res.send(obj);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
