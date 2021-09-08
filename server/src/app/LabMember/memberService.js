const { pool } = require("../../../config/db");
const memberDao = require("./memberDao");

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
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const result = await noticeDao.insertComment(con, createCommentInfo);
    con.release();
    return result ? true : false;
  } catch (e) {
    console.log(`DB connect Error \n ${e}`);
    return false;
  }
};

exports.updateComment = async (updateCommentInfo) => {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const result = await noticeDao.updateComment(con, updateCommentInfo);
    con.release();
    return result ? true : false;
  } catch (e) {
    console.log(`DB connect Error \n ${e}`);
    return false;
  }
};

exports.deleteComment = async (commentId) => {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const result = await noticeDao.deleteComment(con, commentId);
    if (result === undefined) {
      throw Error("최상단 에러를 확인하시오");
    }
    con.release();
    return result ? true : false;
  } catch (e) {
    console.log(`DB connet Error \n ${e}`);
  }
};

exports.createReply = async (createReplyInfo) => {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const result = await noticeDao.insertReply(con, createReplyInfo);
    if (result === undefined) {
      throw Error("최상단 에러를 확인하세요");
    }
    con.release();
    return result ? true : false;
  } catch (e) {
    console.log(`DB connect Error \n ${e}`);
  }
};
