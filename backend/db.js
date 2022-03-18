const { Pool } = require("pg");

const pool = new Pool({
  user: "fnquvetqntnonq",
  password: "c6e072860daaf691b580fef122e35a4d152bb8517c8c18e40097ec41d01c2473",
  host: "ec2-3-209-61-239.compute-1.amazonaws.com",
  port: 5432,
  database: "d1v7vihon49s49",
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
