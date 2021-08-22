const {logger} = require("../../../config/winston");
const { pool } = require("../../../config/db");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const jwt = require("jsonwebtoken");
const secret_config = require("../../../config/secret")

exports.createStudent = async function (
  email,
  name,
  studentNum,
  major,
  phoneNum,
  password,
  imageUrl
) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPwd = await bcrypt.hash(password, salt);
  console.log(hashedPwd);
  const insertStudentInfoParams = [
    email,
    name,
    studentNum,
    major,
    phoneNum,
    hashedPwd,
    imageUrl,
  ];
  const connection = await pool.getConnection(async (conn) => conn);
  const createStudentResult = await userDao.insertStudentInfo(
    connection,
    insertStudentInfoParams
  );
  connection.release();
  return;
};

exports.createProfessor = async function (
  email,
  name,
  professorNum,
  major,
  phoneNum,
  password,
  imageUrl
) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPwd = await bcrypt.hash(password, salt);
  const insertProfessorInfoParams = [
    email,
    name,
    professorNum,
    major,
    phoneNum,
    hashedPwd,
    imageUrl,
  ];
  const connection = await pool.getConnection(async (conn) => conn);
  const createProfessorResult = await userDao.insertProfessorInfo(
    connection,
    insertProfessorInfoParams
  );
  connection.release();
  return;
}

exports.postStudentSignIn = async function (email, password) {
  try {
      // 이메일 여부 확인
      const emailRows = await userProvider.studentEmailCheck(email);
      if (emailRows.length < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
     
      const selectEmail = emailRows[0].email;
    
      // 비밀번호 확인
      /*
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const selectUserPasswordParams = [selectEmail, hashedPassword];
      const passwordRows = await userProvider.studentPasswordCheck(selectUserPasswordParams);
      console.log(hashedPassword);
      console.log(1);
      if (passwordRows[0].password !== hashedPassword) {
          return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
      }
      */
      const hashedPassword = await userProvider.selectStudentPassword(selectEmail);
      console.log(hashedPassword.password);
      const check = await bcrypt.compare(password,hashedPassword.password);
      console.log(check);
      if(!check) {
        return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
      }
      // 계정 상태 확인
      const userInfoRows = await userProvider.studentAccountCheck(email);

      if (userInfoRows[0].status === 1) {
          return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
      }

      console.log(`DB의 userId:`,userInfoRows[0].id) // DB의 userId

      //토큰 생성 Service
      let token = await jwt.sign(
          {
              userId: userInfoRows[0].id,
          }, // 토큰의 내용(payload)
          secret_config.jwtsecret, // 비밀키
          {
              expiresIn: "365d",
              subject: "Student",
          } // 유효 기간 365일
      );

      return response(baseResponse.SUCCESS, {'userId': userInfoRows[0].id, 'jwt': token});

  } catch (err) {
      logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
      return errResponse(baseResponse.DB_ERROR);
  }
};

exports.postProfessorSignIn = async function (email, password) {
  try {
      // 이메일 여부 확인
      const emailRows = await userProvider.professorEmailCheck(email);
      if (emailRows.length < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
     
      const selectEmail = emailRows[0].email;
    
      // 비밀번호 확인
      /*
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const selectUserPasswordParams = [selectEmail, hashedPassword];
      const passwordRows = await userProvider.studentPasswordCheck(selectUserPasswordParams);
      console.log(hashedPassword);
      console.log(1);
      if (passwordRows[0].password !== hashedPassword) {
          return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
      }
      */
      const hashedPassword = await userProvider.selectProfessorPassword(selectEmail);
      console.log(hashedPassword.password);
      const check = await bcrypt.compare(password,hashedPassword.password);
      console.log(check);
      if(!check) {
        return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
      }
      // 계정 상태 확인
      const userInfoRows = await userProvider.professorAccountCheck(email);

      if (userInfoRows[0].status === 1) {
          return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
      }

      console.log(`DB의 userId:`,userInfoRows[0].id) // DB의 userId

      //토큰 생성 Service
      let token = await jwt.sign(
          {
              userId: userInfoRows[0].id,
          }, // 토큰의 내용(payload)
          secret_config.jwtsecret, // 비밀키
          {
              expiresIn: "365d",
              subject: "Professor",
          } // 유효 기간 365일
      );

      return response(baseResponse.SUCCESS, {'userId': userInfoRows[0].id, 'jwt': token});

  } catch (err) {
      logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
      return errResponse(baseResponse.DB_ERROR);
  }
};