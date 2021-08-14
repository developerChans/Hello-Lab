const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "1234",
  database: "dkltest",
});

module.exports = {
  pool: pool
};
