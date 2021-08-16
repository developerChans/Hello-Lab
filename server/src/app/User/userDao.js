// 학생 생성
async function insertStudentInfo(connection, insertStudentInfoParams) {
  const insertStudentInfoQuery = `
          INSERT INTO Student(email, name, id, major,phoneNumber,password,imageUrl)
          VALUES (?, ?, ?, ?, ?, ?,?);
      `;
  const insertStudentInfoRow = await connection.query(
    insertStudentInfoQuery,
    insertStudentInfoParams
  );

  return insertStudentInfoRow;
}

// 학생 조회
async function selectStudent(connection) {
  const selectStudentQuery = `
    select name, id, major
    from Student;
    `;
  const selectStudentRow = await connection.query(selectStudentQuery);
  return selectStudentRow[0];
}

// 교수 생성
async function insertProfessorInfo(connection, insertProfessorInfoParams) {
  const insertProfessorInfoQuery = `
          INSERT INTO Professor(email, name, professorId, major,phoneNumber,password,imageUrl)
          VALUES (?, ?, ?, ?, ?, ?,?);
      `;
  const insertProfessorInfoRow = await connection.query(
    insertProfessorInfoQuery,
    insertProfessorInfoParams
  );

  return insertProfessorInfoRow;
}

// 교수 조회
async function selectProfessor(connection) {
  const selectProfessorQuery = `
    select name, professorId, major
    from Professor;
    `;
  const selectProfessorRow = await connection.query(selectProfessorQuery);
  return selectProfessorRow[0];
}

module.exports = {
  insertStudentInfo,
  selectStudent,
  insertProfessorInfo,
  selectProfessor,
};
