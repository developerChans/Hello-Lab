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

exports.createUser = async function (
  email,
  name,
  userNum,
  major,
  phoneNum,
  password,
  imageUrl,
  job
) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPwd = await bcrypt.hash(password, salt);
  const insertUserInfoParams = [
    email,
    name,
    userNum,
    major,
    phoneNum,
    hashedPwd,
    imageUrl,
    job,
  ];
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const createUserResult = await userDao.insertUserInfo(
      connection,
      insertUserInfoParams
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

exports.postUserSignIn = async function (email, password) {
  const connection = await pool.getConnection(async (conn) => await conn);
  try {
    // 이메일 여부 확인
    const emailRows = await userProvider.userEmailCheck(email);
    if (emailRows.email.length < 1)
      return errResponse(baseResponse.SIGNIN_EMAIL_EMPTY);
    const selectEmail = emailRows.email;
    const hashedPassword = await userProvider.selectUserPassword(selectEmail);
    const check = await bcrypt.compare(password, hashedPassword.password);
    if (!check) {
      return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
    }
    // 계정 상태 확인
    const userInfoRows = await userProvider.userAccountCheck(email);

    if (userInfoRows[0].status === 1) {
      return errResponse(conbaseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }
    //토큰 생성 Service
    const refreshToken = jwt.sign(
      {}, //payload
      secret_config.jwtsecret, //secret key
      {
        expiresIn: "14d",
        subject: "User",
      }
    );
    await connection.beginTransaction();
    const inputToken = await userDao.inputTokenUser(
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
        subject: "User",
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
      `App - postUserSignIn Service error\n: ${err.message} \n${JSON.stringify(
        err
      )}`
    );
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

exports.withdrawUser = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const userResult = await userDao.withdrawUserId(connection, userId);
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (e) {
    await connecdtion.rollback();
    console.log(`App - withdrawUser Service error\n: ${e.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};
