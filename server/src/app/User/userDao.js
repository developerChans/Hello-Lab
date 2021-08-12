// 학생 생성
async function insertStudentInfo(connection, insertStudentInfoParams) {
    const insertStudentInfoQuery = `
          INSERT INTO Student(email, name, studentId, major,phoneNumber,password,imageUrl)
          VALUES (?, ?, ?, ?, ?, ?,?);
      `;
    const insertStudentInfoRow = await connection.query(
      insertStudentInfoQuery,
      insertStudentInfoParams
    );
  
    return insertStudentInfoRow;
}

// 학생 조회
async function selectStudent(connection){
    const selectStudentQuery = `
    select name, studentId, major
    from Student;
    `
    const selectStudentRow = await connection.query(selectStudentQuery);
    return selectStudentRow[0];
}


module.exports = {
    insertStudentInfo,
    selectStudent
};