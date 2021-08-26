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
  const getOneLabQuery = `SELECT l.*, p.name from Lab l join professor p on p.professorId = l.professorId where l.id = ${labId}`;
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

const selectStudentLabQuery = `SELECT l.id, l.name FROM StudentLab s join LAB l ON s.labId = l.id WHERE s.studentId = ? AND l.status = 0`;
module.exports = {
  insertLabInfo,
  getOneLab,
  updateLabInfo,
  deleteLab,
  selectStudentLabQuery,
};
