const { pool } = require("../../../config/db");

const labDao = require("./labDao");

exports.getOneLab = async (labId) => {
  const con = await pool.getConnection(async (conn) => conn);
  const query = labDao.getOneLabQuery;
  try {
    await con.beginTransaction();
    const row = await con.query(query, labId);
    await con.commit();
    return row[0];
  } catch (e) {
    await con.rollback();
    console.log(`DB connect error \n ${e}`);
  } finally {
    con.release();
  }
};

exports.getAllApplyByProfessorId = async (professorId) => {
  const con = await pool.getConnection(async (conn) => conn);
  const getLabIdQuery = labDao.getLabIdByProfessorId;
  const getAllApplyByLabId = labDao.getAllApplyByLabId;
  try {
    await con.beginTransaction();
    const labId = await con.query(getLabIdQuery, professorId);
    const row = await con.query(getAllApplyByLabId, labId[0][0].id);
    console.log(row[0]);
    await con.commit();
    return row[0];
  } catch (e) {
    await con.rollback();
    console.log(`Provider Error \n ${e}`);
  } finally {
    con.release();
  }
};
