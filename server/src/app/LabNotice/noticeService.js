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

exports.deleteNotice = async (deleteNoticeInfo) => {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const result = await noticeDao.deleteNotice(con, deleteNoticeInfo);
    await con.release();
    return result ? true : false;
  } catch (e) {
    console.log(`DB connect Error \n ${e}`);
    return false;
  }
};

exports.createComment = async (createCommentInfo) => {
  const con = await pool.getConnection(async (conn) => conn);
  const query = noticeDao.insertCommentQuery;
  try {
    const row = await con.query(query, createCommentInfo);
    return row[0].affectedRows ? true : false;
  } catch (e) {
    console.log(`Service Error \n ${e}`);
  } finally {
    con.release();
  }
};

exports.updateComment = async (updateCommentInfo, userId) => {
  const con = await pool.getConnection(async (conn) => conn);
  const getQuery = noticeDao.getACommentById;
  const updateQuery = noticeDao.updateCommentQuery;
  try {
    const getRow = await con.query(getQuery, userId);
    if (getRow[0][0].userId != userId) {
      return "No User";
    }
    const updateRow = await con.query(updateQuery, updateCommentInfo);
    console.log(updateRow[0]);
    return updateRow[0].affectedRows ? true : false;
  } catch (e) {
    console.log(`DB connect Error \n ${e}`);
    return false;
  } finally {
    con.release();
  }
};

exports.deleteComment = async (commentId, userId) => {
  const con = await pool.getConnection(async (conn) => conn);
  const getQuery = noticeDao.getACommentById;
  const deleteQuery = noticeDao.deleteCommentQuery;

  try {
    const getRow = await con.query(getQuery, commentId);
    if (getRow[0][0].userId != userId) {
      return "No User";
    }
    const deleteRow = await con.query(deleteQuery, commentId);
    console.log(deleteRow[0]);
    return deleteRow[0].affectedRows;
  } catch (e) {
    console.log(`Service Error \n ${e}`);
  } finally {
    con.release();
  }
};

exports.createReply = async (createReplyInfo) => {
  const con = await pool.getConnection(async (conn) => conn);
  const query = noticeDao.insertReplyQuery;
  try {
    const row = await con.query(query, createReplyInfo);
    console.log(row[0]);
    return row[0];
  } catch (e) {
    console.log(`Service Error \n ${e}`);
    // 오류 뜨면 95% 확률로 없는 댓글에 대댓글 생성하려고 해서 그럴듯
    // client에 떠있는 댓글들은 100프로 있는 댓글들이니까 굳이 validation안함
    // 나중에 필요하면 작성하겠음
  } finally {
    con.release();
  }
};
