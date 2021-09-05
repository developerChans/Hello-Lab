// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
          INSERT INTO User(email, name, UserNum, major, phoneNum, password, imageURL, job)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

// 유저 조회
async function selectUser(connection) {
  const selectUserQuery = `
    select name,email,userNum,major,phoneNum,job
    from User;
    `;
  const selectUserRow = await connection.query(selectUserQuery);
  return selectUserRow[0];
}

// 이메일로 유저 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                  SELECT name,email,userNum,major,phoneNum,job
                  FROM User 
                  WHERE email = ?;
                  `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}
// 유저 패스워드 체크
async function checkUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
          SELECT name,email,userNum,major,phoneNum,job
          FROM User
          WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
    selectUserPasswordQuery,
    selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

//유저 hashed 비밀번호 가져오기
async function selectUserPassword(connection, email) {
  const selectUserPasswordQuery = `
        SELECT name,email,password
        FROM User
        WHERE email = ?;`;
  const selectUserPasswordRow = await connection.query(
    selectUserPasswordQuery,
    email
  );

  return selectUserPasswordRow[0];
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
          SELECT status, id, job
          FROM User
          WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
    selectUserAccountQuery,
    email
  );
  return selectUserAccountRow[0];
}

//토큰 넣기
async function inputTokenUser(connection, rtoken, id) {
  const inputTokenUserQuery = `
    update User
    set refreshToken=?
    where id = ?;
    `;
  const inputTokenUserRow = await connection.query(inputTokenUserQuery, [
    rtoken,
    id,
  ]);

  return inputTokenUserRow;
}

// 해당 id의 회원 refresh 토큰 get
async function getTokenFromUser(connection, userId) {
  const withdrawUserIdQuery = `
        select refreshToken
        from User
        where id = ?;
        `;
  const [userRow] = await connection.query(withdrawUserIdQuery, userId);
  return userRow;
}

// 해당 id의 회원 탈퇴
async function withdrawUserId(connection, userId) {
  const withdrawUserIdQuery = `
        update User set status = 1 
        where id =?;
        `;
  const [userRow] = await connection.query(withdrawUserIdQuery, userId);
  return userRow;
}

module.exports = {
  insertUserInfo,
  selectUser,
  selectUserEmail,
  selectUserPassword,
  checkUserPassword,
  selectUserAccount,
  inputTokenUser,
  withdrawUserId,
  getTokenFromUser,
};
