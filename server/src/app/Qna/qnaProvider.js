const { pool } = require("../../../config/db");
const dao = require("./qnaDao");
exports.getQna = async (labId) => {
  const con = await pool.getConnection(async (conn) => conn);
  const query = dao.selectQnaQuery;
  try {
    await con.beginTransaction();
    const row = await con.query(query, labId);
    await con.rollback();
    return row[0];
  } catch (e) {
    await con.rollback();
    console.log(`DB error \n ${e}`);
  } finally {
    con.release();
  }
};

exports.getQnaReply = async (getQnaReplyInfo) => {
  const con = await pool.getConnection(async (conn) => conn);
  const query = dao.selectQnaReplyQuery;

  try {
    await con.beginTransaction();
    const row = await con.query(query, getQnaReplyInfo);
    await con.commit();
    return row[0];
  } catch (e) {
    await con.rollback();
    console.log(`DB error \n ${e}`);
  } finally {
    con.release();
  }
};
