const { pool } = require("../../../config/db");
const searchService = require("./searchService");
const searchDao = require("./searchDao");


/*
//통합검색 api
exports.getAllList = async function(token) {

}
*/

//게시판 검색 api
exports.getDebateList = async function(search, filter) {
    const connection = await pool.getConnection(async (conn) => conn);
    let condition = '';
    switch(filter) {
        case '1' : condition += `l.title LIKE '%`+search+`%'`; break;
        case '2' : condition += `l.content LIKE '%`+search+`%'`; break;
        case '3' : condition += `p.name LIKE '%`+search+`%' OR s.name LIKE '%`+search+`%'`; break;
    }
    console.log(condition);
    const debateInfoResult = await searchDao.debateInfo(connection, condition);
    connection.release();
    return debateInfoResult;
}
