const { pool } = require("../../../config/db");

const openDao = require("./openDao");

exports.getOpenLabs = async (search, isRecruit, major) => {
  const con = await pool.getConnection(async (conn) => conn);

  let condition = '';
  if(isRecruit) {
    condition += 'and l.isRecruit = 1'
  }
  if(major) {
    condition += ` and u.major='${major}'`
  }

  const getOpenLabsListResult = openDao.getOpenLabsList(con, condition);

  con.release();
  return getOpenLabsListResult;

};
