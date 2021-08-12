const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "wnstjr0406",
  database: "dkkdb"
});

module.exports = {
  pool: pool
};
