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
 * process API NO. 5
 * API NAME : 프로세스 등록 API
 * [POST] /app/processes
 */

exports.postProcess = async function(req, res) {
    /**
     * Body : labId, title, userId, standardDate
     */

    const {labIdx, title, userIdx, standardDate} = req.body;
    const postProcessResponse = await processService.postPrcoess(labIdx, title, userIdx, standardDate);
    // const postProcessParams = req.body;
    // const postProcessResponse = await processService.postPrcoess(postProcessParams);
    
    return res.send(postProcessResponse);
};

/**
 * process API NO. 6
 * API NAME : process content 등록 API
 * [POST] /app/processes/contents
 */

exports.postProcessContent = async function(req, res) {
    /**
     * Body : processIdx, content, importance, startDate, endDate, title
     */

    const {processIdx, content, importance, startDate, endDate, title} =req.body;
    const postProcessContentResponse = await processService.postProcessContent(processIdx, content, importance, startDate, endDate, title);

    return res.send(postProcessContentResponse);
};


/**
 * process API NO. 7
 * API NAME : process Tag 등록 API
 * [POST] /app/processes/tags
 */

exports.postProcessTag = async function(req, res) {
    /**
     * Body : processContentIdx, userIdxes
     */

    const {processContentIdx, userIdxes} = req.body;
    const userIdx = userIdxes.split(',');

    for(let i = 1; i <= userIdx.length; i++) {
        const postProcessTagResponse = await processService.postProcessTag(processContentIdx, parseInt(userIdx[i-1]));
    }
    return res.send(baseResponse.SUCCESS);
};

/**
 * prcoess API NO. 8
 * API NAME : process 수정 API
 * [PATCH] /app/processes/patch/:processIdx
 */

exports.patchProcess = async function(req, res) {
    /**
     * Body : title, standardDate
     * Path Variable : processIdx
     */

    const {title, standardDate} =req.body;
    const processIdx = req.params.processIdx;
    
    const patchProcessResponse = await processService.patchProcess(title, standardDate, processIdx);
    return res.send(patchProcessResponse);
};

/**
 * process API NO. 9
 * API NAME : process content 수정 API
 * [PATCH] /app/processes/contents/:processConetentIdx
 */

exports.patchProcessContent = async function(req, res) {
    /**
     * Body : content, importance, startDate, endDate, title
     * Path Variable : processContentIdx
     */

    const {content, importance, startDate, endDate, title} = req.body;
    const processContentIdx = req.params.processContentIdx;

    const patchProcessContentResponse = await processService.patchProcessContent(content, importance, startDate, endDate, title, processContentIdx);
    return res.send(patchProcessContentResponse);
};

/**
 * process API NO. 10
 * API NAME : process Tag 삭제 API
 * [DELETE] /app/processes/delete/tags/:processContentIdx
 */

exports.deleteProcessTag = async function(req, res) {
    /**
     * Path Variable : processContentIdx
     */

    const processContentIdx = req.params.processContentIdx;

    const deleteProcessTagResponse = await processService.deleteProcessTag(processContentIdx);
    return res.send(deleteProcessTagResponse);
};

/**
 * process API NO. 11
 * API NAME : process 삭제 API
 * [PATCH] /app/processes/delete/process/:processIdx
 */

exports.deleteProcess = async function(req, res) {
    /**
     * Path Variable : processIdx
     */

    const processIdx = req.params.processIdx;

    const deleteProcessResponse = await processService.deleteProcess(processIdx);
    return res.send(deleteProcessResponse);
};

/**
 * process API NO. 12
 * API NAME : process content 삭제 API
 * [PATCH] /app/processes/delete/content/:processContentIdx
 */

exports.deleteProcessContent = async function(req, res) {
    /**
     * Path Variable : processContentIdx
     */

    const processContentIdx = req.params.processContentIdx;

    const deleteProcessContentResponse = await processService.deleteProcessContent(processContentIdx);
    return res.send(deleteProcessContentResponse);
};



