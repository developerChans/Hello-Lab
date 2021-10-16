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

exports.getComment = async (noticeId) => {
  const con = await pool.getConnection(async (conn) => conn);
  const query = noticeDao.getCommentQuery;
  try {
    const row = await con.query(query, noticeId);
    return row[0];
  } catch (e) {
    console.log(`Provider Error \n ${e}`);
  } finally {
    con.release();
  }
};

// 리팩토링 practice
exports.getReply = async (commentId) => {
  const con = await pool.getConnection(async (conn) => conn);
  const getReplyQuery = noticeDao.getReplyQuery;
  try {
    await con.beginTransaction();
    const row = await con.query(getReplyQuery, commentId);
    await con.commit();
    return row[0];
  } catch (e) {
    await con.rollback();
    console.log(`DB error \n ${e}`);
  } finally {
    con.release();
  }
};
