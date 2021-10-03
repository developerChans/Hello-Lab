const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/db");
// const processProvider = require("./processProvider");
const processDao = require("./processDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const {connect} = require("http2");

exports.postPrcoess = async function(labIdx, title, userId, standardDate) {
    const postProcessParams = [labIdx, title, userId, standardDate];
    const connection = await pool.getConnection(async(conn) => conn);
    const postProcessResult = await processDao.postProcess(connection, postProcessParams);
    console.log(`프로세스 추가`);
    connection.release();

    return response(baseResponse.SUCCESS);
};

exports.postProcessContent = async function(processidx, content, importance, startDate, endDate, title) {
    const postProcessContentParams =[processidx, content, importance, startDate, endDate, title];
    const connection = await pool.getConnection(async(conn) => conn);
    const postProcessContentResult = await processDao.postProcessContent(connection, postProcessContentParams);
    console.log(`프로세스 컨텐츠 추가`);
    connection.release();

    return response(baseResponse.SUCCESS);
};

exports.postProcessTag = async function(processContentIdx, userIdx) {
    const postProcessTagParams = [processContentIdx, userIdx];
    const connection = await pool.getConnection(async(conn) => conn);
    const postProcessTagResult = await processDao.postProcessTag(connection, postProcessTagParams);
    console.log(`프로세스 태그 추가`);
    connection.release();

    return response(baseResponse.SUCCESS);
};

exports.patchProcess = async function(title, standardDate, processIdx) {
    try{
        const patchProcessParams = [title, standardDate, processIdx];
        const connection = await pool.getConnection(async(conn) => conn);
        const patchProcessResult = await processDao.patchProcess(connection, patchProcessParams);
        // logger.SUCCESS("프로세스 수정 완료");
        console.log("프로세스 수정 완료");
        connection.release();
        return response(baseResponse.SUCCESS);
    } catch(err) {
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.patchProcessContent = async function(content, importance, startDate, endDate, title, processContentIdx) {
    try {
        const patchProcessContentParams = [content, importance, startDate, endDate, title, processContentIdx];
        const connection = await pool.getConnection(async(conn) => conn);
        const patchProcessContentResult = await processDao.patchProcessContent(connection, patchProcessContentParams);
        // logger.SUCCESS("프로세스 컨텐츠 수정 완료");
        console.log("프로세스 컨텐츠 수정 완료");
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch(err) {
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.deleteProcess = async function (processIdx) {
    try {
        const connection = await pool.getConnection(async(conn) => conn);
        const deleteProcessResult = await processDao.deleteProcess(connection, processIdx);
        connection.release();
        // logger.SUCCESS("해당 프로세스가 삭제되었습니다.");
        return response(baseResponse.SUCCESS);
    } catch(err) {
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteProcessContent = async function (processContentIdx) {
    try {
        const connection = await pool.getConnection(async(conn) => conn);
        const deleteProcessContentResult = await processDao.deleteProcessContent(connection, processContentIdx);
        connection.release();
        // logger.SUCCESS("해당 프로세스 컨텐트가 삭제되었습니다.");
        return response(baseResponse.SUCCESS);
    } catch(err) {
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteProcessTag = async function (processContentIdx) {
    try {
        const connection = await pool.getConnection(async(conn) => conn);
        const deleteProcessTagResult = await processDao.deleteProcessTag(connection, processContentIdx);
        console.log("해당 프로세스 태그들이 삭제되었습니다.")
        connection.release();
        // logger.SUCCESS("해당 프로세스 태그가 삭제되었습니다.");
        return response(baseResponse.SUCCESS);
    } catch(err) {
        return errResponse(baseResponse.DB_ERROR);
    }
};

