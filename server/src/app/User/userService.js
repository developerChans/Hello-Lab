const {pool} = require('../../../config/db');
const userProvider = require('./userProvider');
const userDao = require('./userDao');
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createStudent = async function (email, name, studentNum,major,phoneNum,password){
  const hashedPwd = await bcrypt.genSalt(saltRounds);
  const insertStudentInfoParams = [email, name, studentNum,major,phoneNum,hashedPwd];
  const connection = await pool.getConnection(async (conn) => conn);
  const createStudentResult = await userDao.insertStudentInfo(connection,insertStudentInfoParams);
  connection.release();
  return json({
      success: 성공,
      message: "회원가입 성공"
  });
}