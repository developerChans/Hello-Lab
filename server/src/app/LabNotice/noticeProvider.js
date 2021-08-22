const { pool } = require("../../../config/db");
const noticeDao = require("./noticeDao");

exports.getAllNotice = async (labId) => {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const result = await noticeDao.getAllNotice(con, labId);
    await con.release();
    return result;
  } catch (e) {
    console.log(`DB connection Error \n ${e}`);
    return false;
  }
};

exports.getOneNotice = async (labId, noticeId) => {
  const getOneNoticeInfo = [labId, noticeId];
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const result = await noticeDao.getOneNotice(con, getOneNoticeInfo);
    await con.release();
    return result;
  } catch (e) {
    console.log(`DB connection Error \n ${e}`);
    return false;
  }
};
