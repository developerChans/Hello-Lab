const { pool } = require("../../../config/db");
const researchDao = require("./researchDao");

exports.deleteOutline = async (professorId, labId, researchId) => {
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
        else if (checkLabResearchResult[0].professorId != professorId) {
            console.log("권한이 없습니다.")
            return false;
        }

        result = await researchDao.deleteOutline(con, researchId);
        await con.release();
        return result ? true : false;
    } catch (e) {
        console.log(`service Error \n ${e}`);
        return false;
    }
};

exports.postIntroduction = async (professorId, labId, researchId, content) => {
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
        else if (checkLabResearchResult[0].professorId != professorId) {
            console.log("권한이 없습니다.")
            return false;
        }

        let result;

        const checkStatus = await researchDao.getOutline(con, researchId);
        if(checkStatus.length<1) {
            result = await researchDao.insertOutline(con, researchId, content)
        }
        else {
            result = await researchDao.updateOutline(con, researchId, content);
        }
        await con.release();
        return result ? true : false;
    } catch (e) {
        console.log(`service Error \n ${e}`);
        return false;
    }
};