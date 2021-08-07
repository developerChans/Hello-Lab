const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "cc080819!",
  database: "DKLTEST",
});

db.connect();
console.log("db connected");

module.exports = db;
