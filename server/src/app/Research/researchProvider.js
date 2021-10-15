const { pool } = require("../../../config/db");
const researchDao = require("./researchDao");

exports.getOutline = async (labId, researchId) => {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const checkLabResearchResult = await researchDao.checkLabResearch(con, researchId);
    console.log(checkLabResearchResult)
    if(checkLabResearchResult.length < 1) {
      console.log("해당하는 id의 연구가 없습니다.")
    }
    if(checkLabResearchResult[0].labId != labId) {
      console.log("해당 연구실의 연구과제가 아닙니다.")
      return false;
    }
    const result = await researchDao.getOutline(con, researchId);
    await con.release();
    return result;
  } catch (e) {
    console.log(`DB connection Error \n ${e}`);
    return false;
  }
};

exports.getResearchMembers = async (labId, researchId) => {
  try {
    const con = await pool.getConnection(async (conn) => conn);
    const checkLabResearchResult = await researchDao.checkLabResearch(con, researchId);
    console.log(checkLabResearchResult)
    if(checkLabResearchResult.length < 1) {
      console.log("해당하는 id의 연구가 없습니다.")
    }
    if(checkLabResearchResult[0].labId != labId) {
      console.log("해당 연구실의 연구과제가 아닙니다.")
      return false;
    }
    const result = await researchDao.getResearchMembersList(con, researchId);
    await con.release();
    console.log(result)
    return result;
  } catch (e) {
    console.log(`DB connection Error \n ${e}`);
    return false;
  }
};