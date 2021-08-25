const { pool } = require("../../../config/db");
const userDao =require("./userDao");

exports.retrieveStudentList = async function(){
    const connection = await pool.getConnection(async (conn) => conn);
    try{
    await connection.beginTransaction();
    const studentListResult = await userDao.selectStudent(connection);
    await connection.commit();
    return studentListResult;

    }catch(e){
        await connection.rollback();
    }finally{
        connection.release();
    }
}

exports.retrieveProfessorList = async function(){
    const connection = await pool.getConnection(async (conn) => conn);
    try{
    await connection.beginTransaction();
    const professorListResult = await userDao.selectProfessor(connection);
    await connection.commit();

    return professorListResult;
    }catch(e){
        await connection.rollback();
    }finally{
        connection.release();
    }
}

exports.studentEmailCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    try{
    await connection.beginTransaction();
    const emailCheckResult = await userDao.selectStudentEmail(connection, email);
    connection.commit();
    return emailCheckResult;

    }catch(e){
        connection.rollback();
    }finally{
    connection.release();
    }
};
exports.professorEmailCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        await connection.beginTransaction();
        const emailCheckResult = await userDao.selectProfessorEmail(connection, email);
        await connection.commit();
        return emailCheckResult;

        }catch(e){
            await connection.rollback();
        }finally{
        connection.release();
        }
};

exports.studentPasswordCheck = async function (selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        await connection.beginTransaction();
        const passwordCheckResult = await userDao.checkStudentPassword(
            connection,
            selectUserPasswordParams
        );
        await connection.commit();
        return passwordCheckResult[0];

    }catch(e){
            await connection.rollback();
        }finally{
        connection.release();
        }
};

exports.professorPasswordCheck = async function (selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        await connection.beginTransaction();
        const passwordCheckResult = await userDao.checkProfessorPassword(
            connection,
            selectUserPasswordParams
        );
        await connection.commit();
        return passwordCheckResult[0];

    }catch(e){
            await connection.rollback();
        }finally{
        connection.release();
        }
};

exports.selectStudentPassword = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try{
        await connection.beginTransaction();
        const passwordCheckResult = await userDao.selectStudentPassword(
            connection,
            email
        );
        await connection.commit();
        
        return passwordCheckResult[0];
        
    }catch(e){
            await connection.rollback();
        }finally{
        connection.release();
        }
};

exports.selectProfessorPassword = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);

    try{
        await connection.beginTransaction();
        const passwordCheckResult = await userDao.selectProfessorPassword(
            connection,
            email
        );
        await connection.commit();
        return passwordCheckResult[0];

    }catch(e){
            await connection.rollback();
        }finally{
        connection.release();
        }
};

exports.studentAccountCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try{
        await connection.beginTransaction();
        const userAccountResult = await userDao.selectStudentAccount(connection, email);
        await connection.commit();
        return userAccountResult;

    }catch(e){
        await connection.rollback();
        }finally{
        connection.release();
        }
};

exports.professorAccountCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        await connection.beginTransaction();
        const userAccountResult = await userDao.selectProfessorAccount(connection, email);
        await connection.commit();
        return userAccountResult;

    }catch(e){
        await connection.rollback();
        }finally{
        connection.release();
        }
};
