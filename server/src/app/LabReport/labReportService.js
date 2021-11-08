const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/db");
const labReportProvider = require("./labReportProvider");
const labReportDao = require("./labReportDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const {connect} = require("http2");

exports.createReport = async function(reports, discussion, labNoticeIdx, title, userIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    try {
        const createReportParams = [reports, discussion, labNoticeIdx, title, userIdx];
        const createReportResult = await labReportDao.createReport(connection, createReportParams);
        console.log(`추가된 내용 : ${createReportResult[0].insertId}`);

        await connection.commit();
        return response(baseResponse.SUCCESS);
    } catch(err) {
        await connection.rollback();
        console.log(
            `App - postlabReport Service error\n: ${err.message} \n${JSON.stringify(
              err
            )}`
          );
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};

exports.updateReport = async function(reports, discussion, title, labReportIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    try {
        const updateReportResult = await labReportDao.updateReport(connection, reports, discussion, title, labReportIdx);
        console.log(`변경 성공`);
        await connection.commit();
        return response(baseResponse.SUCCESS);
    } catch(err) {
        await connection.rollback();
        console.log(
            `App - updatelabReport Service error\n: ${err.message} \n${JSON.stringify(
              err
            )}`
          );
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};

exports.deleteReport = async function(labReportIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    try {
        const deleteReportResult = await labReportDao.deleteReport(connection, labReportIdx);
        console.log(`삭제완료`);
        await connection.commit();
        return response(baseResponse.SUCCESS);
    } catch(err) {
        await connection.rollback();
        console.log(
            `App - deletelabReport Service error\n: ${err.message} \n${JSON.stringify(
              err
            )}`
          );
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};
