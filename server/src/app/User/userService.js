const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/db");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");
const jwt = require("jsonwebtoken");
const secret_config = require("../../../config/secret");
const secret = require("../../../config/secret");
const { connect } = require("react-redux");

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
  try {
    await connection.beginTransaction();
    const createStudentResult = await userDao.insertStudentInfo(
      connection,
      insertStudentInfoParams
    );
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (e) {
    await connection.rollback();
    console.log(`App - createUser Service error\n: ${e.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
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
  try {
    await connection.beginTransaction();
    const createProfessorResult = await userDao.insertProfessorInfo(
      connection,
      insertProfessorInfoParams
    );
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (e) {
    await connection.rollback();
    console.log(`App - createUser Service error\n: ${e.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};
exports.postStudentSignIn = async function (email, password) {
  const connection = await pool.getConnection(async (conn) => await conn);
  try {
    // 이메일 여부 확인
    const emailRows = await userProvider.studentEmailCheck(email);
    if (emailRows.length < 1)
      return errResponse(baseResponse.SIGNIN_EMAIL_EMPTY);
    const selectEmail = emailRows[0].email;

    const hashedPassword = await userProvider.selectStudentPassword(
      selectEmail
    );
    const check = await bcrypt.compare(password, hashedPassword.password);
    if (!check) {
      return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
    }
    // 계정 상태 확인
    const userInfoRows = await userProvider.studentAccountCheck(email);

    if (userInfoRows[0].status === 1) {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }

    //토큰 생성 Service
    const refreshToken = jwt.sign(
      {}, //payload
      secret_config.jwtsecret, //secret key
      {
        expiresIn: "14d",
        subject: "Student",
      }
    );
    await connection.beginTransaction();
    const inputToken = await userDao.inputTokenStudent(
      connection,
      refreshToken,
      userInfoRows[0].id
    );
    await connection.commit();
    const accessToken = jwt.sign(
      {
        userId: userInfoRows[0].id,
      }, // 토큰의 내용(payload)
      secret_config.jwtsecret, // 비밀키
      {
        expiresIn: "1h",
        subject: "Student",
      } // 유효 기간 1시간
    );
    return response(baseResponse.SUCCESS, {
      userId: userInfoRows[0].id,
      accessJwt: accessToken,
      refreshJwt: refreshToken,
    });
  } catch (err) {
    await connection.rollback();
    console.log(
      `App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(
        err
      )}`
    );
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

exports.postProfessorSignIn = async function (email, password) {
  try {
    // 이메일 여부 확인
    const emailRows = await userProvider.professorEmailCheck(email);
    if (emailRows.length < 1)
      return errResponse(baseResponse.SIGNIN_EMAIL_EMPTY);

    const selectEmail = emailRows[0].email;
    console.log(selectEmail);
    // 비밀번호 확인
    const hashedPassword = await userProvider.selectProfessorPassword(
      selectEmail
    );
    const check = await bcrypt.compare(password, hashedPassword.password);
    if (!check) {
      return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
    }
    // 계정 상태 확인
    const userInfoRows = await userProvider.professorAccountCheck(email);

    if (userInfoRows[0].status === 1) {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }

    console.log(userInfoRows[0].id); // DB의 userId

    const connection = await pool.getConnection(async (conn) => await conn);
    try {
      //토큰 생성 Service
      const refreshToken = jwt.sign(
        {}, //payload
        secret_config.jwtsecret, //secret key
        {
          expiresIn: "14d",
          subject: "Professor",
        }
      );
      await connection.beginTransaction();
      const inputToken = await userDao.inputTokenProfessor(
        connection,
        refreshToken,
        userInfoRows[0].id
      );
      await connection.commit();

      const accessToken = jwt.sign(
        {
          userId: userInfoRows[0].id,
        }, // 토큰의 내용(payload)
        secret_config.jwtsecret, // 비밀키
        {
          expiresIn: "1h",
          subject: "Professor",
        } // 유효 기간 1시간
      );
      return response(baseResponse.SUCCESS, {
        userId: userInfoRows[0].id,
        accessJwt: accessToken,
        refreshJwt: refreshToken,
      });
    } catch (e) {
      await connection.rollback();
    } finally {
      connection.release();
    }
  } catch (err) {
    console.log(
      `App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(
        err
      )}`
    );
    return errResponse(baseResponse.DB_ERROR);
  }
};
exports.withdrawStudent = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const userResult = await userDao.withdrawStudentId(connection, userId);
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (e) {
    await connecdtion.rollback();
    console.log(`App - createUser Service error\n: ${e.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};
