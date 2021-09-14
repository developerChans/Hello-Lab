async function insertNoticeInfo(con, createNoticeEntity) {
  const insertNoticeInfoQeury = `INSERT INTO LabNotice(title, content, labId, userId) VALUES(?, ?, ?, ?)`;
  try {
    await con.beginTransaction();
    const row = await con.query(insertNoticeInfoQeury, createNoticeEntity);
    await con.commit();
    return row;
  } catch (e) {
    await con.rollback();
    await con.release();
    console.log(`query Error \n ${e}`);
    return false;
  }
}

async function getAllNotice(con, labId) {
  const getAllNoticeQuery = `SELECT title,id, createdAt FROM LabNotice WHERE labId = ${labId}`;
  try {
    await con.beginTransaction();
    const row = await con.query(getAllNoticeQuery);
    await con.commit();
    return row[0];
  } catch (e) {
    await con.rollback();
    await con.release();
    console.log(`query error \n ${e}`);
    return false;
  }
}

async function getOneNotice(con, getOneNoticeInfo) {
  const getOneNoticeQuery = `SELECT * FROM LabNotice WHERE labId = ? AND id = ?`;
  try {
    await con.beginTransaction();
    const row = await con.query(getOneNoticeQuery, getOneNoticeInfo);
    await con.commit();
    return row[0];
  } catch (e) {
    await con.rollback();
    await con.release();
    console.log(`query error \n ${e}`);
    return false;
  }
}

async function updateNotice(con, updateNoticeEntity, noticeId) {
  const updateNoticeQuery = `UPDATE LabNotice SET title = ?, content = ? WHERE id = ${noticeId}`;
  try {
    await con.beginTransaction();
    const row = await con.query(updateNoticeQuery, updateNoticeEntity);
    await con.commit();
    return row[0].affectedRows;
  } catch (e) {
    await con.rollback();
    await con.release();
    console.log(`query error \n ${e}`);
    return false;
  }
}

async function deleteNotice(con, deleteNoticeInfo) {
  const deleteNoticeQuery = `DELETE FROM LabNotice WHERE labId= ? AND Id = ?`;
  try {
    await con.beginTransaction();
    const row = await con.query(deleteNoticeQuery, deleteNoticeInfo);
    await con.commit();
    return row[0].affectedRows;
  } catch (e) {
    await con.rollback();
    con.release();
    console.log(`query error \n ${e}`);
    return false;
  }
}

async function insertComment(con, insertCommentInfo) {
  const insertCommentQuery = `INSERT INTO LabNoticeComment(noticeId, content) VALUES(?,?) `;
  try {
    await con.beginTransaction();
    const row = await con.query(insertCommentQuery, insertCommentInfo);
    await con.commit();
    return row[0];
  } catch (e) {
    await con.rollback();
    con.release();
    console.log(`query error \n ${e}`);
    return false;
  }
}

async function getComment(con, noticeId) {
  const getCommentQuery = `SELECT * FROM LabNoticeComment WHERE noticeId = ${noticeId} AND parentCommentId <=> null order by createAt asc`;
  try {
    await con.beginTransaction();
    const row = await con.query(getCommentQuery);
    await con.commit();
    return row[0];
  } catch (e) {
    await con.rollback();
    con.release();
    console.log(`query error \n ${e}`);
  }
}
async function updateComment(con, updateCommentInfo) {
  const updateCommentQuery = `UPDATE LabNoticeComment SET content = ? WHERE noticeId = ? AND  id = ?`;
  try {
    await con.beginTransaction();
    const row = await con.query(updateCommentQuery, updateCommentInfo);
    await con.commit();
    return row[0].affectedRows;
  } catch (e) {
    await con.rollback();
    con.release();
    console.log(`query error \n ${e}`);
    return false;
  }
}

async function deleteComment(con, commentId) {
  const deleteCommentQuery = `DELETE FROM LabNoticeComment WHERE id = ${commentId}`;
  try {
    await con.beginTransaction();
    const row = await con.query(deleteCommentQuery);
    await con.commit();
    con.release();
    return row[0].affectedRows;
  } catch (e) {
    await con.rollback();
    con.release();
    console.log(`query error \n ${e}`);
  }
}

async function insertReply(con, createReplyInfo) {
  const insertReplyQuery = `INSERT INTO LabNoticeComment(content, parentCommentId, noticeId) VALUES(?, ?, ?)`;
  try {
    await con.beginTransaction();
    const row = await con.query(insertReplyQuery, createReplyInfo);
    await con.commit();
    con.release();
    return row[0];
  } catch (e) {
    await con.rollback();
    con.release();
    console.log(`query error \n ${e}`);
  }
}

const getReplyQuery = `SELECT * FROM LabNoticeComment WHERE parentCommentId = ? ORDER BY createAt asc`;

module.exports = {
  insertNoticeInfo,
  getAllNotice,
  getOneNotice,
  updateNotice,
  deleteNotice,
  insertComment,
  getComment,
  updateComment,
  deleteComment,
  insertReply,
  getReplyQuery,
};
