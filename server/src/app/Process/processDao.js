//모든 프로세스 조회(연구실 기준) --> 날짜 기준 정해줘야함
async function getProcessList(connection, labIdx) {
    const getProcessListQuery = `
    select P.id as processId , P.title as title, P.standardDate as standard, U.name as writer
        from Process P
            join User U on U.id = P.userId
    where labId = ? and P.status = 0;`;

    const [processListRows] = await connection.query(getProcessListQuery, labIdx);
    return processListRows;
}

//프로세스 내 완료한 세부 내용 조회(프로세스 아이디 기준)

async function getCompletedProcess(connection, processIdx) {
    const getCompletedProcessQuery =`
    select PC.id, P.title, PC.id, PC.content, PC.importance, PC.startDate, PC.endDate,
    group_concat((select U.name from User U where U.id = PT.userId)) as names
        from Process P
            join ProcessContent PC on PC.processId = P.id
            LEFT join ProcessTag PT on PT.processContentId = PC.id
    where PC.endDate < CURDATE() and P.id = ? and PC.status = 0
    group by PC.id;`;

    const [completedProcessRows] = await connection.query(getCompletedProcessQuery, processIdx);
    return completedProcessRows;
}

//프로세스 내 진행중인 세부 내용 조회(프로세스 아이디 기준)

async function getOnGoingProcess(connection, processIdx) {
    const getOnGoingProcessQuery =`
    select PC.id, P.title, PC.id, PC.content, PC.importance, PC.startDate, PC.endDate,
    group_concat((select U.name from User U where U.id = PT.userId)) as names
        from Process P
            join ProcessContent PC on PC.processId = P.id
            LEFT join ProcessTag PT on PT.processContentId = PC.id
    where PC.startDate <= CURDATE() and PC.endDate >= CURDATE() and P.id = ? and PC.status = 0
    group by PC.id;`;

    const [onGoingProcessRows] = await connection.query(getOnGoingProcessQuery, processIdx);
    return onGoingProcessRows;
}

//프로세스 내 예정된 세부 내용 조회(프로세스 아이디 기준)

async function getExpectedProcess(connection, processIdx) {
    const getExpectedProcessQuery =`
    select PC.id, P.title, PC.id, PC.content, PC.importance, PC.startDate, PC.endDate,
    group_concat((select U.name from User U where U.id = PT.userId)) as names
        from Process P
            join ProcessContent PC on PC.processId = P.id
            LEFT join ProcessTag PT on PT.processContentId = PC.id
    where PC.startDate > CURDATE() and P.id = ? and PC.status = 0
    group by PC.id;`;

    const [expectedProcessRows] = await connection.query(getExpectedProcessQuery, processIdx);
    return expectedProcessRows;
}

// process 등록 (labIdx 필요)

async function postProcess(connection, postProcessParams) {
    const postProcessQuery = `
    insert into Process (labId, title, userId, standardDate) 
    VALUES (?,?,?,?);`;

    const postProcessRow = await connection.query(postProcessQuery, postProcessParams);
    return postProcessRow;
}

// process content 등록 (processIdx 필요)

async function postProcessContent(connection, postProcessContentParams) {
    const postProcessContentQuery = `
    insert into ProcessContent (processId, content, importance, startdate, enddate, title)
    VALUES (?,?,?,?,?,?);`;

    const postProcessContentRow = await connection.query(postProcessContentQuery, postProcessContentParams);
    return postProcessContentRow
}

// process Tag 등록 (prcoessContentIdx 필요)

async function postProcessTag(connection, postProcessTagParams) {
    const postProcessTagQuery = `
    insert into ProcessTag (processContentId, userId) 
    VALUES (?,?);`;

    const postProcessTagRow = await connection.query(postProcessTagQuery, postProcessTagParams);
    return postProcessTagRow;
}

// 프로세스 삭제 (status 변경)

async function deleteProcess(connection, processIdx) {
    const deleteProcessQuery = `
    update Process P
    set P.status = 1
    where P.id = ?;`;

    const deleteProcessRow = await connection.query(deleteProcessQuery, processIdx);
    return deleteProcessRow[0]
}

// 프로세스 content 삭제(status 변경)

async function deleteProcessContent(connection, processContentIdx) {
    const deleteProcessContentQuery = `
    update ProcessContent PC
    set PC.status = 1
    where PC.id = ?;`;

    const deleteProcessContentRow = await connection.query(deleteProcessContentQuery, processContentIdx);
    return deleteProcessContentRow[0]
}

// tag 전체 삭제 (processContentIdx 필요)

async function deleteProcessTag(connection, processContentIdx) {
    const deleteProcessTagQuery = `
    delete from ProcessTag where processContentId = ?; `;
    
    const deleteProcessTagRow = await connection.query(deleteProcessTagQuery, processContentIdx);
    return deleteProcessTagRow;
}

// 프로세스 수정

async function patchProcess(connection, patchProcessParams) {
    const patchProcessQuery = `
    update Process P
    set P.title = ?, P.standardDate = ?
    where P.id = ?;`;
    const patchProcessRow = await connection.query(patchProcessQuery, patchProcessParams);
    return patchProcessRow[0];
}

// 프로세스 content 수정

async function patchProcessContent(connection, patchProcessContentParams) {
    const patchProcessContentQuery = `
    update ProcessContent PC
    set PC.content = ? , PC.importance = ?, PC.startDate = ?, PC.endDate = ?, PC.title = ?
    where PC.id = ?;`;
    const patchProcessContentRow = await connection.query(patchProcessContentQuery,patchProcessContentParams);
    return patchProcessContentRow[0];
}



module.exports = {
    getProcessList,
    getCompletedProcess,
    getOnGoingProcess,
    getExpectedProcess,
    postProcess,
    postProcessContent,
    postProcessTag,
    deleteProcess,
    deleteProcessContent,
    deleteProcessTag,
    patchProcess,
    patchProcessContent
};