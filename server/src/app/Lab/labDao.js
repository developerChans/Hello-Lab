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

async function getOneLab(con, labId) {
  const getOneLabQuery = `SELECT l.*, p.name from Lab l join professor p on p.id = l.professorId where l.id = ${labId}`;
  try {
    await con.beginTransaction();
    const row = await con.query(getOneLabQuery);
    await con.commit();
    return row[0];
  } catch (e) {
    await con.rollback();
    console.log(`query Error \n ${e}`);
  }
}

async function updateLabInfo(con, updateInfo) {
  const updateLabQuery = `UPDATE Lab SET name = ?, professorId = ?, associateProfessorId = ? WHERE id = ?`;
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

const joinLabRequestQuery = `INSERT INTO LabJoinRequest(studentId, labId) VALUES(?, ?)`;
const updateJoinLabQuery = `UPDATE LabJoinRequest SET status = 1 WHERE Id = ?`;
const getNotieOfRequest = `SELECT r.studentId, r.labId FROM LabJoinRequest r WHERE id = ?`;
const insertStudentLabQeury = `INSERT INTO StudentLab(studentId, labId) VALUES(?, ?) `;

module.exports = {
  insertLabInfo,
  getOneLab,
  updateLabInfo,
  deleteLab,
  joinLabRequestQuery,
  updateJoinLabQuery,
  getNotieOfRequest,
  insertStudentLabQeury,
};
