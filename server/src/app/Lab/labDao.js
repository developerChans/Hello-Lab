const InsertLabInfoQuery = `INSERT INTO Lab(name, professorId, associateProfessorId) VALUES( ?, ?, ?);`;
const insertUserLabProfessorQuery = `INSERT INTO UserLab(userId, labId) VALUES(?,?);`;

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

const applyLabRequestQuery = `INSERT INTO ApplicationForm(studentId, labId, content) VALUES(?,?,?)`;
const updateJoinLabQuery = `UPDATE ApplicationForm SET status = ? WHERE Id = ?`;
const getNotieOfRequest = `SELECT af.studentId, af.labId FROM ApplicationForm af WHERE id = ?`;
const insertStudentLabQeury = `INSERT INTO UserLab(userId, labId) VALUES(?, ?) `;
const getLabIdByProfessorId = `SELECT id FROM Lab WHERE professorId = ?`;
const getAllApplyByLabId = `
SELECT af.id, af.content, u.name, u.major, u.userNum, u.phoneNum
FROM ApplicationForm af
JOIN User u ON u.id = af.studentId
WHERE af.labId = ? AND af.status = 2
`;

module.exports = {
  InsertLabInfoQuery,
  getOneLabQuery,
  insertUserLabProfessorQuery,
  updateLabInfo,
  deleteLab,
  applyLabRequestQuery,
  updateJoinLabQuery,
  getNotieOfRequest,
  insertStudentLabQeury,
  getLabIdByProfessorId,
  getAllApplyByLabId,
};
