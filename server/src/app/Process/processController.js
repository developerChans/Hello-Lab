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