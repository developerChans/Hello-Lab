const labReportProvider = require("./labReportProvider");
const labReportService = require("./labReportService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const {emit} = require("nodemon");

/**
 * labReport API NO.1
 * API NAME : 과제 제출 목록 조회 API (교수)
 * [GET] /app/lab/:labIdx/reports/:labNoticeIdx
 */
// labIdx 조회하여 같은지 확인 필요함 아닐시 다른 연구실에서 접근한 것임
// 교수인지도 확인 labIdx를 이용하여 담당교수를 찾는 것이 중요
exports.calllabReportsLists = async function(req, res) {
    /**
     * Path Variable : labIdx, labNoticeIdx
     */
    const labIdx = req.params.labIdx;
    const labNoticeIdx = req.params.labNoticeIdx;

    const calllabReportListsResult = await labReportProvider.calllabReportList(labNoticeIdx);
    return res.send(response(baseResponse.SUCCESS, calllabReportListsResult));
};

/**
 * labReport API NO.2
 * API NAME : 제출 상세 조회 API (교수 및 해당 학생)
 * [GET] /app/lab/:labIdx/report/:labReportIdx 
 */

exports.calllabReportContents =async function(req, res) {
    /**
     * Path Variable : labIdx, labReportIdx
     */

     const labIdx = req.params.labIdx;
     const labReportIdx = req.params.labReportIdx;

     const calllabReportContentsResult = await labReportProvider.calllabReportContent(labReportIdx);
     return res.send(response(baseResponse.SUCCESS, calllabReportContentsResult));
};

/**
 * labReport API NO.3
 * API NAME : 과제 제출 API
 * [POST] /app/lab/report
 */

exports.createlabReport = async function(req, res) {
    /**
     * Body : reports, discussion, labNoticeId, title, userId
     */

    const {reports, discussion, labNoticeIdx, title, userIdx} = req.body;

    const createlabReportResponse = await labReportService.createReport(
        reports, discussion, labNoticeIdx, title, userIdx
    );

    return res.send(createlabReportResponse);
};

/**
 * labReport API NO.4
 * API NAME : 과제 제출 수정 API
 * [PATCH] /app/lab/report/:labReportIdx
 */

exports.updatelabReport = async function(req, res) {
    /**
     * Path Variable : labReportIdx
     * Body : reports, discussion, title
     */

    const labReportIdx = req.params.labReportIdx;
    const {reports, discussion, title} = req.body;

    const updatelabReportResponse = await labReportService.updateReport(
        reports, discussion, title, labReportIdx
    );

    return res.send(updatelabReportResponse);
};

/**
 * labReport API NO.5
 * API NAME : 과제 제출 삭제 API
 * [PATCH] /app/lab/report/delete/:labReportIdx
 */

exports.deletelabReport = async function(req, res) {
    /**
     * Path Variable : labReportIdx
     */

    const labReportIdx = req.params.labReportIdx;

    const deletelabReportResponse = await labReportService.deleteReport(labReportIdx);

    return res.send(deletelabReportResponse);
};
