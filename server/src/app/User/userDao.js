async function selectStudent(connection){
    const selectStudentQuery = `
    select name, studentId, major
    from Student;
    `
    const selectStudentRow = await connection.query(selectStudentQuery);
    return selectStudentRow[0];
}

module.exports = {
    selectStudent
};