const { pool } = require("../../../config/db");
const memberDao = require("./memberDao");

exports.getAllMember = async (labId) => {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const result = await memberDao.getAllMember(con, labId);
    await con.release();
    return result;
  } catch (e) {
    console.log(`DB connection Error \n ${e}`);
    return false;
  }
};