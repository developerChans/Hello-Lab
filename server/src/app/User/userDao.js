// 학생 생성
async function insertStudentInfo(connection, insertStudentInfoParams) {
    const insertStudentInfoQuery = `
          INSERT INTO Student(email, name, StudentNum, major,phoneNumber,password,imageURL)
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
    select name, studentNum, major
    from Student;
    `;
  const selectStudentRow = await connection.query(selectStudentQuery);
  return selectStudentRow[0];
}

// 교수 생성
async function insertProfessorInfo(connection, insertProfessorInfoParams) {
    const insertProfessorInfoQuery = `
          INSERT INTO Professor(email, name, professorNum, major,phoneNumber,password,imageUrl)
          VALUES (?, ?, ?, ?, ?, ?,?);
      `;
  const insertProfessorInfoRow = await connection.query(
    insertProfessorInfoQuery,
    insertProfessorInfoParams
  );

  return insertProfessorInfoRow;
}

// 교수 조회
async function selectProfessor(connection){
    const selectProfessorQuery = `
    select name, professorNum, major
    from Professor;
    `;
  const selectProfessorRow = await connection.query(selectProfessorQuery);
  return selectProfessorRow[0];
}

// 이메일로 학생 조회
async function selectStudentEmail(connection, email) {
    const selectStudentEmailQuery = `
                  SELECT email,name 
                  FROM Student 
                  WHERE email = ?;
                  `;
    const [emailRows] = await connection.query(selectStudentEmailQuery, email);
    return emailRows;
}
// 이메일로 교수 조회
async function selectProfessorEmail(connection, email) {
    const selectProfessorEmailQuery = `
                  SELECT email,name 
                  FROM Professor 
                  WHERE email = ?;
                  `;
    const [emailRows] = await connection.query(selectProfessorEmailQuery, email);
    return emailRows;
}  
  // 학생 패스워드 체크
async function checkStudentPassword(connection, selectUserPasswordParams) {
    const selectUserPasswordQuery = `
          SELECT email, name, password
          FROM Student
          WHERE email = ? AND password = ?;`;
    const selectUserPasswordRow = await connection.query(
        selectUserPasswordQuery,
        selectUserPasswordParams
    );
  
    return selectUserPasswordRow;
  }
  
  // 교수 패스워드 체크
async function checkProfessorPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT email, name, password
        FROM Professor
        WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}
//학생 hashed 비밀번호 가져오기
async function selectStudentPassword(connection, email) {
  const selectUserPasswordQuery = `
        SELECT password
        FROM Student
        WHERE email = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery, email
  );

  return selectUserPasswordRow[0];
}

//교수 hashed 비밀번호 가져오기
async function selectProfessorPassword(connection, email) {
  const selectUserPasswordQuery = `
        SELECT password
        FROM Professor
        WHERE email = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery, email
  );

  return selectUserPasswordRow[0];
}

  // 학생 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
  async function selectStudentAccount(connection, email) {
    const selectUserAccountQuery = `
          SELECT status, id
          FROM Student
          WHERE email = ?;`;
    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        email
    );
    return selectUserAccountRow[0];
  }

  // 교수 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
  async function selectProfessorAccount(connection, email) {
    const selectUserAccountQuery = `
          SELECT status, id
          FROM Professor
          WHERE email = ?;`;
    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        email
    );
    return selectUserAccountRow[0];
  }

  async function inputTokenStudent(connection, rtoken, id){
    const inputTokenStudentQuery =`
    update Student
    set refreshToken=?
    where id = ?;
    `;
    const inputTokenStudentRow = await connection.query(
      inputTokenStudentQuery, [rtoken, id]
    );
  
    return inputTokenStudentRow;
  }

  async function inputTokenProfessor(connection, rtoken, index){
    const inputTokenProfessorQuery =`
    update Professor
    set refreshToken=?
    where id=?;
    `
    const inputTokenProfessorRow = await connection.query(
      inputTokenProfessorQuery,[rtoken,index]
    );
  
    return inputTokenProfessorRow;
  }
module.exports = {
    insertStudentInfo,
    selectStudent,
    insertProfessorInfo,
    selectProfessor,
    selectStudentEmail,
    selectProfessorEmail,
    selectStudentPassword,
    selectProfessorPassword,
    checkStudentPassword,
    checkProfessorPassword,
    selectStudentAccount,
    selectProfessorAccount,
    inputTokenStudent,
    inputTokenProfessor
};
