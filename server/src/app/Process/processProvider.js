const { pool, connect } = require("../../../config/db");
const processDao = require("./processDao");

exports.getProcessList = async function(labIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    const processListResult = await processDao.getProcessList(connection, labIdx);
    connection.release();
    return processListResult;
};

exports.getCompletedProcess = async function(processIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    const completedProcessResult = await processDao.getCompletedProcess(connection, processIdx);
    connection.release();
    return completedProcessResult;
};

exports.getOnGoingProcess = async function(processIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    const onGoingProcessResult = await processDao.getOnGoingProcess(connection, processIdx);
    connection.release();
    return onGoingProcessResult;
};

exports.getExpectedProcess = async function(processIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    const expectedProcessResult = await processDao.getExpectedProcess(connection, processIdx);
    connection.release();
    return expectedProcessResult;
};
