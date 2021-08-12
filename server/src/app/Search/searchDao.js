async function debateInfo(connection, condition) {
    const debateInfoQuery = `
        select l.title '제목',LEFT(l.content, 30), coalesce(p.name, s.name) '작성자', l.createdAt '작성 날짜'
        from LabDebate l
        left join Professor p on p.id = l.professorId
        left join Student s on s.id = l.studentId
        where `+condition+`
        order by l.createdAt
        limit 0,10;
    `;
    const debateInfoRows = await connection.query(debateInfoQuery);
    return debateInfoRows[0];
}

module.exports = {
    debateInfo
};