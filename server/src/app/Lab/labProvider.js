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
