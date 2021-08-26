const { pool } = require("../../../config/db");

const labDao = require("./labDao");

exports.getOneLab = async (labId) => {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const labInfo = await labDao.getOneLab(con, labId);
    con.release();
    return labInfo;
  } catch (e) {
    console.log(`DB connect error \n ${e}`);
  }
};

exports.getStudentLab = async (userId) => {
  const con = await pool.getConnection(async (conn) => conn);
  const query = labDao.selectStudentLabQuery;
  try {
    await con.beginTransaction();
    const row = await con.query(query, userId);
    await con.commit();
    console.log(row[0]);
    return row[0];
  } catch (e) {
    await con.rollback();
    console.log(`DB Error \n ${e}`);
  } finally {
    con.release();
  }
};
