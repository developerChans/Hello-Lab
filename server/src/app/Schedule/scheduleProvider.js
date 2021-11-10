const { pool, connect } = require("../../../config/db");
const scheduleDao = require("./scheduleDao");

exports.callScheduleListsEachUser = async function(userIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    const scheduleListResult = await scheduleDao.callScheduleListEachUser(connection, userIdx);
    connection.release();
    return scheduleListResult;
};

exports.callScheduleListsEachLab = async function(labIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    const scheduleListEachLabResult = await scheduleDao.callScheduleListEachLab(connection, labIdx);
    connection.release();
    return scheduleListEachLabResult;
};

/*
exports.checkUpdateRights = async function(labIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    const checkUpdateRightsResult = await scheduleDao.checkUpdateRights(connection, labIdx);
    connection.release();
    return checkUpdateRightsResult[0];
};
*/
