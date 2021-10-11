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
  const getAllNoticeQuery = `SELECT title,id, createdAt FROM LabNotice WHERE labId = ${labId} AND status = 0`;
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

const insertCommentQuery = `
INSERT INTO LabNoticeComment(noticeId, content, userId) VALUES (?,?,?)
`;

const getCommentQuery = `
SELECT l.id, l.content, l.createdAt, l.updatedAt, u.name 
FROM LabNoticeComment l join User u On l.userId = u.id 
WHERE noticeId = ? AND parentCommentId 
<=> null order by createdAt asc`;

const updateCommentQuery = `UPDATE LabNoticeComment SET content = ? WHERE noticeId = ? AND  id = ?`;

const deleteCommentQuery = `DELETE FROM LabNoticeComment WHERE id = ?`;

const insertReplyQuery = `INSERT INTO LabNoticeComment(content, parentCommentId, noticeId, userId) VALUES(?, ?, ?, ?)`;

const getReplyQuery = `
SELECT l.id,l.content, l.createdAt, l.updatedAt, u.name
FROM LabNoticeComment l join User u ON l.userId = u.id
WHERE parentCommentId = ? 
ORDER BY l.createdAt asc`;

const getACommentById = `
SELECT userId
FROM LabNoticeComment 
WHERE id = ?
`;

module.exports = {
  insertNoticeInfo,
  getAllNotice,
  getOneNotice,
  updateNotice,
  deleteNotice,
  updateCommentQuery,
  deleteCommentQuery,
  insertReplyQuery,
  getReplyQuery,
  insertCommentQuery,
  getCommentQuery,
  getACommentById,
};
