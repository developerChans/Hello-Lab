const { pool } = require("../../../config/db");

const openDao = require("./openDao");

exports.createLab = async function (createLabEntity, professorId) {
  const con = await pool.getConnection(async (conn) => conn);
  const insertLabQuery = labDao.InsertLabInfoQuery;
  const insertUserLabQuery = labDao.insertUserLabProfessorQuery;
  try {
    await con.beginTransaction();
    const row = await con.query(insertLabQuery, createLabEntity);
    //await con.query(insertUserLabQuery);
    const userLabEntity = [professorId, row[0].insertId];
    const result = await con.query(insertUserLabQuery, userLabEntity);
    await con.commit();
    return result[0].affectedRows;
  } catch (e) {
    await con.rollback();
    console.log(`DB error\m${e}'`);
  } finally {
    con.release();
  }
};


