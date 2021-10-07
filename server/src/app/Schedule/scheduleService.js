const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/db");
const scheduleProvider = require("./scheduleProvider");
const scheduleDao = require("./scheduleDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
const {connect} = require("http2");

exports.createSchedule = async function (startDate, content, labId, finishDate, calendarTopicId, location) {
    //try {
        const insertScheduleParams = [startDate, content, labId, finishDate, calendarTopicId, location];
        const connection = await pool.getConnection(async(conn) => conn);
        const scheduleResult = await scheduleDao.createSchedule(connection, insertScheduleParams);
        console.log(`추가된 내용 : ${scheduleResult[0].insertId}`);
        connection.release();

        return response(baseResponse.SUCCESS);

    //}   //catch(console.error();)
};

exports.updateScheduleStatus = async function (labScheduleIdx, labIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const updateScheduleStatusResult = await scheduleDao.updateScheduleStatus(connection, labScheduleIdx, labIdx);
        connection.release();
        //logger.SUCCESS(`해당 일정이 삭제되었습니다.\n`)

        return response(baseResponse.SUCCESS);

    } catch(err) {
        // logger.error(`App - updateStatus Service error\n : ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.changeSchedule = async function (startDate, content, finishDate, calendarTopicId, location, labScheduleIdx, labIdx) {
    try {
        const connection = await pool.getConnection(async(conn) => conn);
        const changeScheduleResult = await scheduleDao.changeSchedule(connection, startDate, content, finishDate, calendarTopicId, location, labScheduleIdx, labIdx);

        return response(baseResponse.SUCCESS);
        
    } catch(err) {
        return errResponse(baseResponse.DB_ERROR);
    }
};
