const { pool } = require("../../../config/db");
const introductionDao = require("./introductionDao");

exports.getIntroduction = async (labId) => {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const result = await introductionDao.getIntroduction(con, labId);
    await con.release();
    return result;
  } catch (e) {
    console.log(`DB connection Error \n ${e}`);
    return false;
  }
};