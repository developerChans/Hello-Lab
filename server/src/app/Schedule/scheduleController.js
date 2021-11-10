const scheduleProvider = require("../../app/Schedule/scheduleProvider");
const scheduleService = require("../../app/Schedule/scheduleService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const {emit} = require("nodemon");
const { checkUpdateRights } = require("./scheduleDao");

/**
 * schedule API NO. 1
 * API NAME : 유저 스케줄 조회 API
 * [GET] /app/schedules/user/:userIdx
 */
exports.getSchedulesEachUser = async function(req, res) {
    /**
     * Path Variable : userIdx
     */
    
    const userIdx = req.params.userIdx;

    if(!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    const scheduleListResult = await scheduleProvider.callScheduleListsEachUser(userIdx);
    return res.send(response(baseResponse.SUCCESS, scheduleListResult));
};

/**
 * schedule API NO. 2
 * API NAME : 교수 스케줄 조회 API
 * [GET] /app/schedules/lab/:labIdx
 */
 exports.getSchedulesEachProfessor = async function(req, res) {
    /**
     * Path Variable : labIdx
     */
    
    const labIdx = req.params.labIdx;

    if(!labIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    const scheduleListResult = await scheduleProvider.callScheduleListsEachLab(labIdx);
    return res.send(response(baseResponse.SUCCESS, scheduleListResult));
};

/**
 * schedule API NO. 3
 * API NAME : 스케줄 생성 API
 * [POST] /app/schedules/lab
 */
 exports.createScheduleByProfessor = async function(req, res) {
    /**
     * Body : startDate, content, labId, finishDate, calendarTopicId, location (프론트에서 넘겨줘야함)
     */
    const {startDate, content, labId, finishDate, calendarTopicId, location} = req.body;

    const createScheduleResponse = await scheduleService.createScheduleByProfessor(
        startDate, content, labId, finishDate, calendarTopicId, location
    );

    return res.send(createScheduleResponse);
};

/**
 * schedule API NO. 4
 * API NAME : 스케줄 생성 API
 * [POST] /app/schedules/user
 */
 exports.createScheduleByUser = async function(req, res) {
    /**
     * Body : startDate, content, userId, finishDate, calendarTopicId, location (프론트에서 넘겨줘야함)
     */
    const {startDate, content, userId, finishDate, calendarTopicId, location} = req.body;

    const createScheduleResponse = await scheduleService.createScheduleByUser(
        startDate, content, userId, finishDate, calendarTopicId, location
    );

    return res.send(createScheduleResponse);
};


/**
 * schedule API NO. 5
 * API NAME : 일정 삭제 API (교수)
 * [PATCH] /app/schedules/delete/lab/:labIdx
 * body : status
 */
 exports.updateScheduleByProfessor = async function(req,res) {
    /**
     * Path Variable : labIdx
     */
    const {labScheduleIdx} = req.body;
    const labIdx = req.params.labIdx;
    const updateScheduleByProfessorResult = await scheduleService.updateScheduleByProfessor(labScheduleIdx, labIdx);
    return res.send(updateScheduleByProfessorResult);

};

/**
 * schedule API NO. 6
 * API NAME : 일정 삭제 API ()
 * [PATCH] /app/schedules/delete/user/:userIdx
 * body : status
 */
 exports.updateScheduleByUser = async function(req,res) {
    /**
     * Path Variable : userIdx
     */
    const {labScheduleIdx} = req.body;
    const userIdx = req.params.userIdx;
    const updateScheduleByUserResult = await scheduleService.updateScheduleByUser(labScheduleIdx, userIdx);
    return res.send(updateScheduleByUserResult);

};

/** 
 * schedule API NO. 7
 * API NAME : 일정 수정 API (교수)
 * [PATCH] /app/schedules/patch/lab/:labIdx
 * body : date, content
 */

exports.changeScheduleByProfessor = async function(req,res) {
    /**
     * Path Variable : labIdx
     */
    const {labScheduleIdx, startDate, content, finishDate, calendarTopicId, location} = req.body;
    const labIdx = req.params.labIdx;
    const changeScheduleResult = await scheduleService.changeScheduleByProfessor(startDate, content, finishDate, calendarTopicId, location, labScheduleIdx, labIdx);
    return res.send(changeScheduleResult);
};

/** 
 * schedule API NO. 8
 * API NAME : 일정 수정 API (유저)
 * [PATCH] /app/schedules/patch/user/:userIdx
 * body : date, content
 */

 exports.changeScheduleByUser = async function(req,res) {
    /**
     * Path Variable : userIdx
     */
    const {labScheduleIdx, startDate, content, finishDate, calendarTopicId, location} = req.body;
    const userIdx = req.params.userIdx;
    const changeScheduleResult = await scheduleService.changeScheduleByUser(startDate, content, finishDate, calendarTopicId, location, labScheduleIdx, userIdx);
    return res.send(changeScheduleResult);
};