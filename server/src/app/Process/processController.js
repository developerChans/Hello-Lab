const processProvider = require("../../app/Process/processProvider");
const processService = require("../../app/Process/processService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");
const { checkUpdateRights } = require("./processDao");

/**
 * process API NO. 1
 * API NAME : 프로세스 전체 조회 API
 * [GET] /app/processes/:labIdx
 */
exports.getProcessList = async function(req, res) {
    /**
     * Path Variable : labIdx
     */

    const labIdx = req.params.labIdx;

    const processListResult = await processProvider.getProcessList(labIdx);
    return res.send(response(baseResponse.SUCCESS, processListResult));

};

/**
 * process API NO. 2
 * API NAME : 프로세스 컨텐트 및 참조 조회(완료기준) API
 * [GET] /app/processes/completed/:processIdx
 */

exports.getCompletedProcess = async function(req, res) {
    /**
     * Path Variable : processIdx
     */

    const processIdx = req.params.processIdx;

    const completedProcessResult = await processProvider.getCompletedProcess(processIdx);
    return res.send(response(baseResponse.SUCCESS, completedProcessResult));
};

/**
 * process API NO. 3
 * API NAME : 프로세스 컨텐트 및 참조 조회(진행기준) API
 * [GET] /app/processes/onGoing/:processIdx
 */

 exports.getOnGoingdProcess = async function(req, res) {
    /**
     * Path Variable : processIdx
     */

    const processIdx = req.params.processIdx;

    const onGoingProcessResult = await processProvider.getOnGoingProcess(processIdx);
    return res.send(response(baseResponse.SUCCESS, onGoingProcessResult));
};

/**
 * process API NO. 4
 * API NAME : 프로세스 컨텐트 및 참조 조회(미래기준) API
 * [GET] /app/processes/expected/:processIdx
 */

 exports.getExpectedProcess = async function(req, res) {
    /**
     * Path Variable : processIdx
     */

    const processIdx = req.params.processIdx;

    const expectedProcessResult = await processProvider.getExpectedProcess(processIdx);
    return res.send(response(baseResponse.SUCCESS, expectedProcessResult));
};

/**
 * 
 */
