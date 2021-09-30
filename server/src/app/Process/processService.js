const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/db");
const processProvider = require("./processProvider");
const processDao = require("./processDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const {connect} = require("http2");

exports.postPrcoess = async function(postProcessParams) {
    const postProcessParams = [labId, title, userId, standardDate];
    const connection = await pool.getConnection(async(conn) => conn);
    const postProcessResult = await processDao.postProcess(connection, postProcessParams);
    console.log(`프로세스 추가`);
    connection.release();

    return response(baseResponse.SUCCESS);
};

exports.postProcessContent = async function(postProcessContentParams) {
    const postProcessContentParams =[];
    const connection = await pool.getConnection(async(conn) => conn);
    const postProcessContentResult = await processDao.postProcessContent(connection, postProcessContentParams);
    console.log(`프로세스 컨텐츠 추가`);
    connection.release();

    return response(baseResponse.SUCCESS);
};

exports.postProcessTag = async function(postProcessTagParams) {

};