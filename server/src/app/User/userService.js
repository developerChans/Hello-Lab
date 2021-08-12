const {pool} = require('../../../config/db');
const userProvider = require('./userProvider');
const userDao = require('./userDao');
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createStudent = async function (email, name, studentNum,major,phoneNum,password,imageUrl){
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPwd = await bcrypt.hash(password, salt);
  const insertStudentInfoParams = [email, name, studentNum,major,phoneNum,hashedPwd,imageUrl];
  const connection = await pool.getConnection(async (conn) => conn);
  const createStudentResult = await userDao.insertStudentInfo(connection,insertStudentInfoParams);
  connection.release();
  return;
}

exports.createProfessor = async function (email, name, professorNum,major,phoneNum,password,imageUrl){
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPwd = await bcrypt.hash(password, salt);
  const insertProfessorInfoParams = [email, name, professorNum,major,phoneNum,hashedPwd,imageUrl];
  const connection = await pool.getConnection(async (conn) => conn);
  const createProfessorResult = await userDao.insertProfessorInfo(connection,insertProfessorInfoParams);
  connection.release();
  return;
}