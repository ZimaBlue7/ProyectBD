const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "199656",
  host: "localhost",
  port: 5432,
  database: "proyecto",
});

module.exports = pool;
