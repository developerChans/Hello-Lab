const { pool } = require("../../../config/db");
const userDao =require("./userDao");

exports.retrieveStudentList = async function(){
    const connection = await pool.getConnection(async (conn) => conn);
    const studentListResult = await userDao.selectStudent(connection);
    connection.release();

    return studentListResult;
}

exports.retrieveProfessorList = async function(){
    const connection = await pool.getConnection(async (conn) => conn);
    const professorListResult = await userDao.selectProfessor(connection);
    connection.release();

    return professorListResult;
}

exports.studentEmailCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await userDao.selectStudentEmail(connection, email);
    connection.release();
    return emailCheckResult;
};
exports.professorEmailCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await userDao.selectProfessorEmail(connection, email);
    connection.release();
    return emailCheckResult;
};

exports.studentPasswordCheck = async function (selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.checkStudentPassword(
        connection,
        selectUserPasswordParams
    );
    connection.release();
    return passwordCheckResult[0];
};

exports.professorPasswordCheck = async function (selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.checkProfessorPassword(
        connection,
        selectUserPasswordParams
    );
    connection.release();
    return passwordCheckResult[0];
};

exports.selectStudentPassword = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.selectStudentPassword(
        connection,
        email
    );
    connection.release();
    return passwordCheckResult[0];
};

exports.selectProfessorPassword = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.selectProfessorPassword(
        connection,
        email
    );
    connection.release();
    return passwordCheckResult[0];
};

exports.studentAccountCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userAccountResult = await userDao.selectStudentAccount(connection, email);
    connection.release();
  
    return userAccountResult;
};

exports.professorAccountCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userAccountResult = await userDao.selectProfessorAccount(connection, email);
    connection.release();
  
    return userAccountResult;
};
