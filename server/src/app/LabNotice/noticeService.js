const { pool } = require("../../../config/db");
const noticeDao = require("./noticeDao");

exports.createNotice = async (createNoticeEntity) => {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const result = await noticeDao.insertNoticeInfo(con, createNoticeEntity);
    await con.release;
    return result ? true : false;
  } catch (e) {
    console.log(`DB connection Error \n ${e}`);
    return false;
  }
};

exports.updateNotice = async (updateNoticeEntity, noticeId) => {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const result = await noticeDao.updateNotice(
      con,
      updateNoticeEntity,
      noticeId
    );
    await con.release();

    return result ? true : false;
  } catch (e) {
    console.log(`DB connect error \n ${e}`);
    return false;
  }
};
