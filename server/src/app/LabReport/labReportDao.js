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

// 제출물 목록 조회(교수 전용)
async function calllabReports(connection, labNoticeId) { // 첨부파일관련 쿼리 추가할 예정
    const calllabReportsQuery = `
        select LR.reports, LR.discussion, LR.title U.name 
            from LabReport LR
            join User U on U.id = LR.userId
            where LR.status = 0 and labNoticeId = ?; 
    `; // 추후에 교수전용 트랜젝션 jwt에서 넣어줘야함
    const [reportsRow] = await connection.query(calllabReportsQuery, labNoticeId);
    return reportsRow;
}