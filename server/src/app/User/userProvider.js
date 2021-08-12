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