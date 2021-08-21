async function insertNoticeInfo(con, createNoticeEntity) {
  const insertNoticeInfoQeury = `INSERT INTO LabNotice(title, content, labId) VALUES(?, ?, ?)`;
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
    return row[0];
  } catch (e) {
    await con.rollback();
    await con.release();
    console.log(`query error \n ${e}`);
    return false;
  }
}

module.exports = {
  insertNoticeInfo,
  getAllNotice,
  getOneNotice,
  updateNotice,
};