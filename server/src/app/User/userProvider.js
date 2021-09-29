const { pool } = require("../../../config/db");
const userDao = require("./userDao");

exports.retrieveUserList = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const userListResult = await userDao.selectUser(connection);
    await connection.commit();
    return userListResult;
  } catch (e) {
    await connection.rollback();
  } finally {
    connection.release();
  }
};

exports.userEmailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const emailCheckResult = await userDao.selectUserEmail(connection, email);
    connection.commit();
    return emailCheckResult[0];
  } catch (e) {
    connection.rollback();
  } finally {
    connection.release();
  }
};

exports.userPasswordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const passwordCheckResult = await userDao.checkUserPassword(
      connection,
      selectUserPasswordParams
    );
    await connection.commit();
    return passwordCheckResult[0];
  } catch (e) {
    await connection.rollback();
  } finally {
    connection.release();
  }
};

exports.selectUserPassword = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    await connection.beginTransaction();
    const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      email
    );
    await connection.commit();

    return passwordCheckResult[0];
  } catch (e) {
    await connection.rollback();
  } finally {
    connection.release();
  }
};

exports.userAccountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    await connection.beginTransaction();
    const userAccountResult = await userDao.selectUserAccount(
      connection,
      email
    );
    await connection.commit();
    return userAccountResult;
  } catch (e) {
    await connection.rollback();
  } finally {
    connection.release();
  }
};

exports.getTokenFromUser = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const Result = await userDao.getTokenFromUser(connection, userId);
    await connection.commit();
    return Result;
  } catch (e) {
    await connection.rollback();
  } finally {
    connection.release();
  }
};

exports.getUser = async function (userId) {
  const con = await pool.getConnection(async (conn) => conn);
  const getUserQuery = `
select *
from User
where id=? and status = 0;
`;
  try {
    await con.beginTransaction();
    const row = await con.query(getUserQuery, userId);
    await con.commit();
    return row[0];
  } catch (e) {
    await con.rollback();
    console.log(`DB error \n ${e}`);
  } finally {
    con.release();
  }
};
