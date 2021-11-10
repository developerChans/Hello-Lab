// 스케줄 조회 (사람 기준)
async function callScheduleListEachUser(connection, userIdx) {
    const callScheduleListEachUserQuery = `
    select LS.id as calendarId, LS.content as content, LS.location as location, LS.startDate as start, LS.finishDate as end, CT.topic as title, CT.color as color
        from LabSchedule LS
            join CalendarTopic CT on LS.CalendarTopicId = CT.id
        where LS.userId = ? and LS.status = 0
        group by LS.id;
    `;
    const [scheduleListEachUserRow] = await connection.query(callScheduleListEachUserQuery, userIdx);
    return scheduleListEachUserRow;
};

// 스케줄 조회(교수 기준)
async function callScheduleListEachLab(connection, labIdx) {
    const callScheduleListEachLabQuery = `
    select LS.id as calendarId, LS.content as content, LS.location as location, LS.startDate as start, LS.finishDate as end, CT.topic as title, CT.color as color
        from LabSchedule LS
            join CalendarTopic CT on LS.CalendarTopicId = CT.id
        where LS.labId = ? and LS.status = 0
        group by LS.id;
    `;
    const [scheduleListEachLabRow] = await connection.query(callScheduleListEachLabQuery, labIdx);
    return scheduleListEachLabRow;
};

// 스케줄 등록(교수 전용)
async function createScheduleByProfessor(connection, createScheduleParams) {
    const createScheduleQuery = `
        insert into LabSchedule (startDate, content, labId, finishDate, calendarTopicId, location)
         VALUES (?,?,?,?,?,?);`;
    const createScheduleRow = await connection.query(createScheduleQuery, createScheduleParams);
    return createScheduleRow;
}

// 스케줄 등록(개인)
async function createScheduleByUser(connection, createScheduleParams) {
    const createScheduleQuery = `
        insert into LabSchedule (startDate, content, userId, finishDate, calendarTopicId, location)
         VALUES (?,?,?,?,?,?);`;
    const createScheduleRow = await connection.query(createScheduleQuery, createScheduleParams);
    return createScheduleRow;
}

// 스케줄 삭제 (교수 전용) ==> patch입니다. (0이면 업로드 상태 1이면 일정 삭제)
async function updateScheduleByProfessor(connection, labScheduleIdx, labIdx) { // professorIdx 대신 나중에 아이디를 받아야함 logInId <-- 이경우 프로페서 테이블을 조인해야함
    const updateScheduleStatusQuery = `
        UPDATE LabSchedule LS
        SET LS.status = 1
        where LS.id = ? and LS.labId = ?`;
    const updateScheduleStatusRow = await connection.query(updateScheduleStatusQuery, [labScheduleIdx, labIdx]);
    return updateScheduleStatusRow[0];
}

// 스케줄 삭제(개인 전용)
async function updateScheduleByUser(connection, labScheduleIdx, userIdx) { // professorIdx 대신 나중에 아이디를 받아야함 logInId <-- 이경우 프로페서 테이블을 조인해야함
    const updateScheduleStatusQuery = `
        UPDATE LabSchedule LS
        SET LS.status = 1
        where LS.id = ? and LS.userId = ?`;
    const updateScheduleStatusRow = await connection.query(updateScheduleStatusQuery, [labScheduleIdx, userIdx]);
    return updateScheduleStatusRow[0];
}


// 일정 수정 patch (교수 전용) 
async function changeScheduleByProfessor(connection, startDate, content, finishDate, calendarTopicId, location, labScheduleIdx, labIdx) {
    const changeScheduleQuery = `
        UPDATE LabSchedule LS
        SET LS.startDate = ? , LS. content = ?, LS.finishDate = ?, LS.calendarTopicId = ?, LS.location = ?
        where LS.id = ? and LS.labId = ?`;
    const changeScheduleRow = await connection.query(changeScheduleQuery, [startDate, content, finishDate, calendarTopicId, location, labScheduleIdx, labIdx]);
    return changeScheduleRow[0];
}

// 일정 수정 patch(개인 전용) 
async function changeScheduleByUser(connection, startDate, content, finishDate, calendarTopicId, location, labScheduleIdx, labIdx) {
    const changeScheduleQuery = `
        UPDATE LabSchedule LS
        SET LS.startDate = ? , LS. content = ?, LS.finishDate = ?, LS.calendarTopicId = ?, LS.location = ?
        where LS.id = ? and LS.userId = ?`;
    const changeScheduleRow = await connection.query(changeScheduleQuery, [startDate, content, finishDate, calendarTopicId, location, labScheduleIdx, userIdx]);
    return changeScheduleRow[0];
}

module.exports = {
    callScheduleListEachUser,
    callScheduleListEachLab,
    createScheduleByProfessor,
    createScheduleByUser,
    updateScheduleByProfessor,
    updateScheduleByUser,
    changeScheduleByProfessor,
    changeScheduleByUser
};
