const scheduleProvider = require("../../app/Schedule/scheduleProvider");
const scheduleService = require("../../app/Schedule/scheduleService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");
const { checkUpdateRights } = require("./scheduleDao");

/**
 * schedule API NO. 1
 * API NAME : 스케줄 생성 API
 * [POST] /app/schedules
 */
exports.createSchedule = async function(req, res) {
    /**
     * Body : startDate, content, labId, finishDate, calendarTopicId, location (프론트에서 넘겨줘야함)
     */
    const {startDate, content, labId, finishDate, calendarTopicId, location} = req.body;

    const createScheduleResponse = await scheduleService.createSchedule(
        startDate, content, labId, finishDate, calendarTopicId, location
    );

    return res.send(createScheduleResponse);
};

/**
 * schedule API NO. 2
 * API NAME : 특정 유저 스케줄 전체 조회 API
 * [GET] /app/schedules/:userIdx
 */
exports.getSchedules = async function(req, res) {
    /**
     * Path Variable : userIdx
     */
    
    const userIdx = req.params.userIdx;

    if(!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    const scheduleListResult = await scheduleProvider.getScheduleList(userIdx);
    return res.send(response(baseResponse.SUCCESS, scheduleListResult));
};

/**
 * schedule API NO. 3
 * API NAME : 일정 삭제 API
 * [PATCH] /app/schedules/delete/:labIdx
 * body : status
 */
 exports.updateScheduleStatus = async function(req,res) {
    /**
     * Path Variable : labIdx
     */
    const {labScheduleIdx} = req.body;
    const labIdx = req.params.labIdx;
    const updateScheduleStatusResult = await scheduleService.updateScheduleStatus(labScheduleIdx, labIdx);
    return res.send(updateScheduleStatusResult);

};

/** 
 * schedule API NO. 4
 * API NAME : 일정 수정 API
 * [PATCH] /app/schedules/patch/:labIdx
 * body : date, content
 */

exports.changeSchedule = async function(req,res) {
    /**
     * Path Variable : labIdx
     */
    const {labScheduleIdx, startDate, content, finishDate, calendarTopicId, location} = req.body;
    const labIdx = req.params.labIdx;
    const changeScheduleResult = await scheduleService.changeSchedule(startDate, content, finishDate, calendarTopicId, location, labScheduleIdx, labIdx);
    return res.send(changeScheduleResult);
};

/**
 * schedule API NO 5
 * API NAME : 특정 연구실 스케줄 조회 API
 * [GET] /app/schedules/:labIdx
 */

exports.getSchedulesEachLab = async function(req, res) {
    /**
     * Path Variable : labIdx
     */

    const labIdx = req.params.labIdx;
    if(!labIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const scheduleListEachLabResult = await scheduleProvider.getScheduleListEachLab(labIdx);
    return res.send(response(baseResponse.SUCCESS, scheduleListEachLabResult));
};
