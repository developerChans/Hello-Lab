// const jwtMiddleware = require("../../../config/jwtMiddleware");
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
 * [GET] /app/schedules
 */
exports.createSchedule = async function(req, res) {
    /**
     * Body : date, content, labId(프론트에서 넘겨줘야함)
     */
    const {date, content, labIdx} = req.body;
    if(!date)
        return res.send(response(baseResponse.TOKEN_EMPTY)); // 일정 입력 안함 오류
    if(!content)
        return res.send(response(baseResponse.TOKEN_EMPTY)); // 일정 내용 입력 안함 오류
    if(!labIdx)
        return res.send(response(baseResponse.TOKEN_EMPTY)); // 연구실 아이디 입력 안된 오류
    // 날짜내용이 맞는지 확인해야함 일정내용 길이 조절도 필요하다면 해야함

    const createScheduleResponse = await scheduleService.createSchedule(
        date,
        content,
        labIdx
    );

    return res.send(createScheduleResponse);
};

/**
 * schedule API NO. 2
 * API NAME : 특정 유저 스케줄 전체 조회 API
 * [GET] /app/schedules/:studentIdx
 */
exports.getSchedules = async function(req, res) {
    /**
     * Path Variable : studentIdx
     */
    
    const studentIdx = req.params.studentIdx;

    if(!studentIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    const scheduleListResult = await scheduleProvider.getScheduleList(studentIdx);
    return res.send(response(baseResponse.SUCCESS, scheduleListResult));
};

/**
 * schedule API NO. 3
 * API NAME : 일정 삭제 및 복구 API
 * [PATCH] /app/schedules/:LabScheduleIdx
 * body : status
 */
 exports.updateScheduleStatus = async function(req,res) {
    /**
     * Path Variable : LabScheduleIdx
     */
    const {status, labIdx} = req.body;
    const LabScheduleIdx = req.params.LabScheduleIdx;
    const userIdFromJwt = 1; // 임시
    // const userIdFromJWT = req.verifiedToken.userId
    /*
    const checkUpdateRightsIdRow = scheduleProvider.checkUpdateRights(labIdx);
    const professorIdx = checkUpdateRightsIdRow.professorId;
    const associateProfessorIdx = checkUpdateRightsIdRow.associateProfessorId;
    console.log(professorIdx);
    console.log(associateProfessorIdx);
    if (userIdFromJwt !== professorIdx || userIdFromJwt !== associateProfessorIdx) {
        res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE));
    } else {
        const updateScheduleStatusResult = await scheduleService.updateScheduleStatus(status, professorIdx);
        return res.send(updateScheduleStatusResult);
    }
    */
    const updateScheduleStatusResult = await scheduleService.updateScheduleStatus(status, LabScheduleIdx);
    return res.send(updateScheduleStatusResult);

};

/** 
 * schedule API NO. 4
 * API NAME : 일정 수정 API
 * [PATCH] /app/schedules/patch/:LabScheduleIdx
 * body : date, content
 */

exports.changeSchedule = async function(req,res) {
    /**
     * Path Variable : LabScheduleIdx
     */
    const {date, content} = req.body;
    const LabScheduleIdx = req.params.LabScheduleIdx;
    const changeScheduleResult = await scheduleService.changeSchedule(date, content, LabScheduleIdx);
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
    console.log(1);
    const labIdx = req.params.labIdx;
    console.log(1);

    if(!labIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    console.log(1);

    const scheduleListEachLabResult = await scheduleProvider.getScheduleListEachLab(labIdx);
    return res.send(response(baseResponse.SUCCESS, scheduleListEachLabResult));
};
