// 모든 스케줄 조회 (연구생 기준)
async function callSchedules(connection, studentIdx) {
    const callScheduleListQuery = `
    select LS.date as 일정날짜, LS.content as 일정내용,L.id as 연구실id, L.name as 연구실이름, LS.status as 삭제여부
        from LabSchedule LS
            join Lab L on LS.labId = L.id
            join StudentLab SL on L.id = SL.labId
        where SL.studentId = ? group by LS.id;`;
    const [scheduleRows] = await connection.query(callScheduleListQuery, studentIdx);
    return scheduleRows;
}

// 연구실 스케줄 조회 (연구실 기준)
async function callSchedulesEachLab(connection, labIdx) {
    const callScheduleEachLabListQuery = `
    select LS.date as 일정날짜, LS.content as 일정내용,L.id as 연구실id, L.name as 연구실이름, LS.status as 삭제여부
        from LabSchedule LS
            join Lab L on LS.labId = L.id
        where L.id = ? group by LS.id;`;
    const [scheduleEachLabRows] = await connection.query(callScheduleEachLabListQuery, labIdx);
    return scheduleEachLabRows;
}

// 스케줄 등록(교수 전용)
async function createSchedule(connection, createScheduleParams) {
    const createScheduleQuery = `
        insert into LabSchedule (date, content, labId)
         VALUES (?,?,?);`;
    const createScheduleRow = await connection.query(createScheduleQuery, createScheduleParams);
    return createScheduleRow;
}

// 스케줄 삭제 (교수 전용) ==> patch입니다. (0이면 업로드 상태 1이면 일정 삭제)
async function updateScheduleStatus(connection, status, LabScheduleIdx) { // professorIdx 대신 나중에 아이디를 받아야함 logInId <-- 이경우 프로페서 테이블을 조인해야함
    const updateScheduleStatusQuery = `
        UPDATE LabSchedule LS
        SET LS.status = ?
        where LS.id = ?`;
    const updateScheduleStatusRow = await connection.query(updateScheduleStatusQuery, [status, LabScheduleIdx]);
    return updateScheduleStatusRow[0];
}

// 연구실 Id 입력시 교수이거나 조교인지 체크
async function checkUpdateRights(connection, labIdx) {
    const checkUpdateRightsQuery = `
        select professorId, associateProfessorId
        from Lab
        where id = ?`;
    const [checkUpdateRightsRow] = await connection.query(checkUpdateRightsQuery, labIdx);
    return checkUpdateRightsRow;
}

// 일정 수정 patch (교수전용) ==> patch입니다.
async function changeSchedule(connection, date, content, LabScheduleIdx) {
    const changeScheduleQuery = `
        UPDATE LabSchedule LS
        SET LS.date = ? , LS. content = ?
        where LS.id = ?`;
    const changeScheduleRow = await connection.query(changeScheduleQuery, [date, content,LabScheduleIdx]);
    return changeScheduleRow[0];
};

module.exports = {
    callSchedules,
    callSchedulesEachLab,
    createSchedule,
    updateScheduleStatus,
    checkUpdateRights,
    changeSchedule
};