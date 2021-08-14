const { pool, connect } = require("../../../config/db");
const scheduleDao = require("./scheduleDao");

exports.getScheduleList = async function(studentIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    const scheduleListResult = await scheduleDao.callSchedules(connection, studentIdx);
    connection.release();
    return scheduleListResult;
};

exports.checkUpdateRights = async function(labIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    const checkUpdateRightsResult = await scheduleDao.checkUpdateRights(connection, labIdx);
    connection.release();
    return checkUpdateRightsResult[0];
};
