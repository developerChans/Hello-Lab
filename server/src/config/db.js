const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "cc080819!",
  database: "DKLTEST",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("LOCAL DB connected");
});

module.exports = db;
