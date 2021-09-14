const mypageDao = require("./mypageDao");
const { pool } = require("../../../config/db");

exports.getStudentLab = async (userId) => {
  const con = await pool.getConnection(async (conn) => conn);
  const query = mypageDao.selectStudentLabQuery;
  try {
    await con.beginTransaction();
    const row = await con.query(query, userId);
    await con.commit();
    return row[0];
  } catch (e) {
    await con.rollback();
    console.log(`DB Error \n ${e}`);
  } finally {
    con.release();
  }
};
