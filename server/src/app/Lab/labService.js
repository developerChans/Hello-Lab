const { pool } = require("../../../config/db");

const labDao = require("./labDao");

exports.createLab = async function (createLabEntity) {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const result = await labDao.insertLabInfo(con, createLabEntity);
    con.release();
    return result ? true : false;
  } catch (e) {
    console.log(`DB connetion Error \n ${e}`);
    con.release();
    return false;
  }
};

exports.updateLab = async (updateInfo) => {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const result = await labDao.updateLabInfo(con, updateInfo);
    con.release();

    return result;
  } catch (e) {
    console.log(`DB connection Error \n ${e}`);
    return false;
  }
};

exports.deleteLab = async (labId) => {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const result = await labDao.deleteLab(con, labId);
    con.release();

    return result;
  } catch (e) {
    console.log(`DB connection Error \n ${e}`);
  }
};
