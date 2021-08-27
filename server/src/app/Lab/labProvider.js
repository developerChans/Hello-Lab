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
