// 모든 스케줄 조회 (사람 기준)
async function callSchedules(connection, userIdx) {
    const callScheduleListQuery = `
    select LS.id as labScheduleId, LS.startDate as startDate, LS.finishDate as finishDate, LS.content as content, LS.location as location,
    CT.id as calendarTopicId, CT.topic as topic, CT.color as color,
    L.id as labId, L.name as labName, LS.status as status
        from LabSchedule LS
            join Lab L on LS.labId = L.id
            join UserLab SL on L.id = SL.labId
            join CalendarTopic CT on LS.CalendarTopicId = CT.id
        where SL.userId = ? group by LS.id;`;
    const [scheduleRows] = await connection.query(callScheduleListQuery, userIdx);
    return scheduleRows;
} // 수정완료

// 연구실 스케줄 조회 (연구실 기준)
async function callSchedulesEachLab(connection, labIdx) {
    const callScheduleEachLabListQuery = `
    select LS.id as labScheduleId, LS.startDate as startDate, LS.finishDate as finishDate, LS.content as content, LS.location as location,
    CT.id as calendarTopicId, CT.topic as topic, CT.color as color,
    L.id as labId, L.name as labName, LS.status as status
        from LabSchedule LS
            join Lab L on LS.labId = L.id
            join CalendarTopic CT on LS.calendarTopicId = CT.id
        where L.id = ? group by LS.id;`;
    const [scheduleEachLabRows] = await connection.query(callScheduleEachLabListQuery, labIdx);
    return scheduleEachLabRows;
}

// 스케줄 등록(교수 전용)
async function createSchedule(connection, createScheduleParams) {
    const createScheduleQuery = `
        insert into LabSchedule (startDate, content, labId, finishDate, calendarTopicId, location)
         VALUES (?,?,?,?,?,?);`;
    const createScheduleRow = await connection.query(createScheduleQuery, createScheduleParams);
    return createScheduleRow;
}

// 스케줄 삭제 (교수 전용) ==> patch입니다. (0이면 업로드 상태 1이면 일정 삭제)
async function updateScheduleStatus(connection, labScheduleIdx, labIdx) { // professorIdx 대신 나중에 아이디를 받아야함 logInId <-- 이경우 프로페서 테이블을 조인해야함
    const updateScheduleStatusQuery = `
        UPDATE LabSchedule LS
        SET LS.status = 1
        where LS.id = ? and LS.labId = ?`;
    const updateScheduleStatusRow = await connection.query(updateScheduleStatusQuery, [labScheduleIdx, labIdx]);
    return updateScheduleStatusRow[0];
}


// 일정 수정 patch (교수전용) ==> patch입니다.
async function changeSchedule(connection, startDate, content, finishDate, calendarTopicId, location, labScheduleIdx, labIdx) {
    const changeScheduleQuery = `
        UPDATE LabSchedule LS
        SET LS.startDate = ? , LS. content = ?, LS.finishDate = ?, LS.calendarTopicId = ?, LS.location = ?
        where LS.id = ? and LS.labId = ?`;
    const changeScheduleRow = await connection.query(changeScheduleQuery, [startDate, content, finishDate, calendarTopicId, location, labScheduleIdx, labIdx]);
    return changeScheduleRow[0];
}

module.exports = {
    callSchedules,
    callSchedulesEachLab,
    createSchedule,
    updateScheduleStatus,
//    checkUpdateRights,
    changeSchedule
};
/*
// 연구실 Id 입력시 교수이거나 조교인지 체크
async function checkUpdateRights(connection, labIdx) {
    const checkUpdateRightsQuery = `
        select professorId, associateProfessorId
        from Lab
        where id = ?`;
    const [checkUpdateRightsRow] = await connection.query(checkUpdateRightsQuery, labIdx);
    return checkUpdateRightsRow;
}
*/