/*
// 과제 게시판 조회 (연구실id 기준)
async function callAssginments(connection, labIdx) {
    const callAssignmentListQuery = `
    select LA.id, LA.title, LA.deadline, U.name
        from LabAssignment LA
        join User U on U.id = LA.userId 
        where LA.status = 0 and LA.labId = ?`;
    const [assignmentRows] = await connection.query(callAssignmentListQuery, labIdx);
    return assignmentRows;
}
*/

/*
// 과제 게시글 등록(연구실 id 기준)
async function createAssginment(connection, labIdx, job) {
    const createAssignmentQuery = `
        insert into LabAssginment ()
    `
}
*/

// 제출물 목록 조회(교수)
async function calllabReports(connection, labNoticeIdx) {
    const calllabReportsQuery = `
        select LR.id, LR.createdAt, LR.title, U.name
            from LabReport LR
            join User U on LR.userId = U.id
        where LR.labNoticeId = ? and LR.status = 0;
    `;
    const [labReportRow] = await connection.query(calllabReportsQuery, labNoticeIdx);
    return labReportRow;
};

// 목록 상세조회(교수, 학생)
async function calllabReport(connection, labReportIdx) { // 첨부파일관련 쿼리 추가할 예정
    const calllabReportsQuery = `
        select LR.reports, LR.discussion, LR.title, U.name, LR.updatedAt 
            from LabReport LR
            join User U on U.id = LR.userId
            where LR.status = 0 and LR.id = ?; 
    `; // 추후에 교수전용 트랜젝션 jwt에서 넣어줘야함
    const [labReportRow] = await connection.query(calllabReportsQuery, labReportIdx);
    return labReportRow;
};

// 과제 제출
async function createReport(connection, createReportParams) {
    const createReportQuery = `
        insert into LabReport (reports, discussion, labNoticeId, title, userId)
        VALUES (?,?,?,?,?);
    `;
    const createReportRow = await connection.query(createReportQuery, createReportParams);
    return createReportRow;
};

// 과제 제출 수정
async function updateReport(connection, reports, discussion, title, labReportIdx) {
    const updateReportQuery = `
        UPDATE LabReport LR
        SET LR.reports = ?, LR.discussion = ?, LR.title = ?
        where LR.id = ?;
    `;
    const updateReportRow = await connection.query(updateReportQuery, [reports, discussion, title, labReportIdx]);
    return updateReportRow[0];
};

// 과제 제출 삭제
async function deleteReport(connection, labReportIdx) {
    const deleteReportQuery = `
    UPDATE LabReport LR
    SET LR.status = 1
    where LR.id = ?
    `;
    const deleteReportRow = await connection.query(deleteReportQuery, labReportIdx);
    return deleteReportRow;
};

module.exports = {
    calllabReport,
    calllabReports,
    createReport,
    updateReport,
    deleteReport
};