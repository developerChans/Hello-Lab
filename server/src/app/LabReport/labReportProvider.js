const {pool, connect} = require("../../../config/db");
const labReportDao = require("./labReportDao");

exports.calllabReportList = async function(labNoticeIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    const labReportListResult = await labReportDao.calllabReports(connection, labNoticeIdx);
    connection.release();
    return labReportListResult;
};

exports.calllabReportContent = async function(labReportIdx) {
    const connection= await pool.getConnection(async(conn)=> conn);
    const labReportContentResult = await labReportDao.calllabReport(connection, labReportIdx);
    connection.release();
    return labReportContentResult;
};
