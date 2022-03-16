const Pool = require('pg').Pool
const pool = new Pool({
  user: 'sam',
  host: 'localhost',
  database: 'attendance',
  password: 'password',
  port: 5432,
});