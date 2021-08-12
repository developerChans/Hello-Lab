const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host : 'dkkdb.cojnoghuurl7.ap-northeast-2.rds.amazonaws.com',
    user : 'admin',
    port : '3306',
    password : 'dankkuko1!',
    database : 'dkkDB'
});

module.exports = {
    pool : pool
};