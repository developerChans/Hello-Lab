const { pool } = require("../../../config/db");
const introductionDao = require("./introductionDao");

exports.postIntroduction = async (labId, content, professorId) => {
  try {
    let result
    const con = await pool.getConnection(async (conn) => conn);
    const checkProfessor = await introductionDao.getLab(con, labId);
    if (checkProfessor[0].professorId != professorId) {
      return false; //TODO: 에러메세지 제대로(해당 연구실의 교수id가 아님)
    }
    const checkStatus = await introductionDao.getIntroduction(con, labId);
    if(checkStatus.length<1) {
      result = await introductionDao.insertIntroduction(con, labId, content)
    }
    else {
      result = await introductionDao.updateIntroduction(con, labId, content);
    }
    await con.release();
    return result ? true : false;
  } catch (e) {
    console.log(`DB connection Error \n ${e}`);
    return false;
  }
};

exports.deleteIntroduction = async (labId, professorId) => {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const checkProfessor = await introductionDao.getLab(con, labId);
    if (checkProfessor[0].professorId != professorId) {
      return false; //TODO: 에러메세지 제대로(해당 연구실의 교수id가 아님)
    }
    result = await introductionDao.deleteIntroduction(con, labId)
    await con.release();
    return result ? true : false;
  } catch (e) {
    console.log(`DB connection Error \n ${e}`);
    return false;
  }
};