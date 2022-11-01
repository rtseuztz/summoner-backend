"use strict";
const mariadb = require("mariadb");

async function query(query) {
  const pool = mariadb.createPool({
    host: process.env.DB_SUMMONER_HOST,
    port: process.env.DB_PORT,
    user: "root",
    password: process.env.DB_SUMMONER_PASS,
    database: process.env.DB_SUMMONER_DB,
  });
  const rows = await pool.query(query);
  return rows;
}
exports.query = query;
