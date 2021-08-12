// 모든 스케줄 조회
async function callSchedules(connection, studentIdx) {
    const callScheduleListQuery = `
    select date as 일정날짜, content as 일정내용,L.labIdx as 연구실id, L.name as 연구실이름, LS.status as 삭제여부 
    from LabSchedule LS
        join Lab L on LS.labIdx = L.labIdx
        join StudentLab SL on L.labIdx = SL.labIdx
    where SL.studentId = ? group by LS.labScheduleIdx;`;
    const [scheduleRows] = await connection.query(callScheduleListQuery, studentIdx);
    return scheduleRows;
}

// 스케줄 등록(교수 전용)
async function createSchedule(connection, createScheduleParams) {
    const createScheduleQuery = `
        insert into LabSchedule (date, content, labIdx) VALUES (?,?,?);
    `;
    const createScheduleRow = await connection.query(createScheduleQuery, createScheduleParams);
    return createScheduleRow;
}

// 스케줄 삭제 (교수 전용) ==> patch입니다.
async function modify
/*
async function selectProfessionalId(connection,selectProfessionalIdParams) {
    const selectProfessionalIdQuery = `
        select P.Id as profess L.id as LabIdx from Lab L
            join Professor P on L.professorId = P.id
        where P.Id = ?;
    `;
    const selectProfessionalIdRow = await connection.query(
        selectProfessionalIdQuery,
        selectProfessionalIdParams
    );
    return selectProfessionalIdRow
};
*/
module.exports = {
    callSchedules,
    createSchedule
    // selectProfessionalId
};