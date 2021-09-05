const { pool } = require("../../../config/db");
const dao = require("./qnaDao");

exports.createQna = async (createQnaInfo) => {
  const con = await pool.getConnection(async (conn) => conn);
  const query = dao.insertQnaQuery;
  try {
    await con.beginTransaction();
    const row = await con.query(query, createQnaInfo);
    await con.commit();
    return row[0];
  } catch (e) {
    await con.rollback();
    console.log(`DB error \n ${e}`);
  } finally {
    con.release();
  }
};

exports.updateQna = async (updateQnaInfo) => {
  const con = await pool.getConnection(async (conn) => conn);
  const query = dao.updateQnaQuery;
  try {
    await con.beginTransaction();
    const row = await con.query(query, updateQnaInfo);
    await con.commit();
    return row[0].affectedRows;
  } catch (e) {
    await con.rollback();
    console.log(`DB error \n ${e}`);
  } finally {
    con.release();
  }
};

exports.deleteQna = async (deleteQnaInfo) => {
  const con = await pool.getConnection(async (conn) => conn);
  const query = dao.deleteQnaQuery;

  try {
    await con.beginTransaction();
    const row = await con.query(query, deleteQnaInfo);
    await con.commit();
    console.log(row[0]);
    return row[0].affectedRows;
  } catch (e) {
    await con.rollback();
    console.log(`DB error \n ${e}`);
  } finally {
    con.release();
  }
};

exports.createQnaReply = async (qnaCreateReplyInfo) => {
  const con = await pool.getConnection(async (conn) => conn);
  const query = dao.insertQnaReplyQuery;
  try {
    await con.beginTransaction();
    const row = await con.query(query, qnaCreateReplyInfo);
    await con.commit();
    return row[0];
  } catch (e) {
    await con.rollback();
    console.log(`DB error \n ${e}`);
  } finally {
    con.release();
  }
};
