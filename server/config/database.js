const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "dankkuko.ckyfxxqvophj.ap-northeast-2.rds.amazonaws.com",
  user: "DKKmanager",
  port: "3306",
  password: "eksRnzh12!",
  database: "HelloLab",
});
module.exports = {
  pool: pool,
};
