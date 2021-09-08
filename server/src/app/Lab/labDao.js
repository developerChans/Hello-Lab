async function insertLabInfo(con, createLabEntity) {
  const InsertLabInfoQuery = `INSERT INTO Lab(name, professorId, associateProfessorId) VALUES( ?, ?, ?);`;
  try {
    await con.beginTransaction();
    const row = await con.query(InsertLabInfoQuery, createLabEntity);
    await con.commit();
    return row;
  } catch (e) {
    await con.rollback();
    console.log(`query Error \n ${e}`);
    return false;
  }
}

const getOneLabQuery = `SELECT l.*, p.name as "pname" from Lab l join User p on p.id = l.professorId where l.id = ?`;

async function updateLabInfo(con, updateInfo) {
  const updateLabQuery = `UPDATE Lab SET name = ?, associateProfessorId = ? WHERE id = ?`;
  try {
    await con.beginTransaction();
    const row = await con.query(updateLabQuery, updateInfo);
    await con.commit();
    return row[0];
  } catch (e) {
    await con.rollback();
    await con.release();
    console.log(`query Error \n ${e}`);
  }
}

async function deleteLab(con, labId) {
  const deleteQuery = `DELETE FROM Lab WHERE id = ${labId}`;
  try {
    await con.beginTransaction();
    const row = await con.query(deleteQuery);
    await con.commit();
    return row[0];
  } catch (e) {
    await con.rollback().release();

    console.log(`query Error \n ${e}`);
  }
}

const joinLabRequestQuery = `INSERT INTO LabJoinRequest(userId, labId) VALUES(?, ?)`;
const updateJoinLabQuery = `UPDATE LabJoinRequest SET status = 1 WHERE Id = ?`;
const getNotieOfRequest = `SELECT r.userId, r.labId FROM LabJoinRequest r WHERE id = ?`;
const insertStudentLabQeury = `INSERT INTO StudentLab(studentId, labId) VALUES(?, ?) `;

module.exports = {
  insertLabInfo,
  getOneLabQuery,
  updateLabInfo,
  deleteLab,
  joinLabRequestQuery,
  updateJoinLabQuery,
  getNotieOfRequest,
  insertStudentLabQeury,
};
