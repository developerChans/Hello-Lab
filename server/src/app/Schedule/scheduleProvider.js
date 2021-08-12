const { pool, connect } = require("../../../config/db");
const scheduleDao = require("./scheduleDao");

exports.getScheduleList = async function(studentIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    const scheduleListResult = await scheduleDao.callSchedules(connection, studentIdx);
    return scheduleListResult;
};
/*
exports.professorIdCheck = async function(selectProfessionalIdParams) {
    const connection = await pool.getConnection(async(conn) => conn);
    const professorIdCheckResult = await scheduleDao.selectProfessionalId(
        connection,
        selectProfessionalIdParams
    );
    connection.release();
    return professorIdCheckResult[0];
};
*/
