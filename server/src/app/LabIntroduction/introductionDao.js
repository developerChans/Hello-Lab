async function getIntroduction(con, labId) {
  const getProfessorQuery = `
      select li.content
      from LabIntroduction li
      where li.status = 0
      and li.labId = ${labId}
  `;
  try {
    await con.beginTransaction();
    const [row] = await con.query(getProfessorQuery);
    await con.commit();
    return row;
  } catch (e) {
    await con.rollback();
    await con.release();
    console.log(`query error \n ${e}`);
    return false;
  }
}

async function getLab(con, labId) {
  const getLabQuery = `
    select l.professorId
    from Lab l
    where l.id = ${labId}
    and l.status = 0
  `;
  try {
    await con.beginTransaction();
    const [row] = await con.query(getLabQuery);
    await con.commit();
    return row;
  } catch (e) {
    await con.rollback();
    await con.release();
    console.log(`query error \n ${e}`);
    return false;
  }
}

async function insertIntroduction(con, labId, content) {
  const insertIntroductionQuery = `
    INSERT INTO LabIntroduction(content, labId) VALUES(?,?)
    `;

  try {
    await con.beginTransaction();
    const [row] = await con.query(insertIntroductionQuery, [content, labId]);
    await con.commit();
    return row;
  } catch (e) {
    await con.rollback();
    await con.release();
    console.log(`query error \n ${e}`);
    return false;
  }
}

async function updateIntroduction(con, labId, content) {
  const updateIntroductionQuery = `
    UPDATE LabIntroduction SET content = ?
    WHERE labId = ${labId}
    and status = 0
    `;

  try {
    await con.beginTransaction();
    const [row] = await con.query(updateIntroductionQuery, content);
    await con.commit();
    return row;
  } catch (e) {
    await con.rollback();
    await con.release();
    console.log(`query error \n ${e}`);
    return false;
  }
}

async function deleteIntroduction(con, labId) {
  const deleteIntroductionQuery = `
    UPDATE LabIntroduction SET status = 1
    WHERE labId = ${labId}
    and status = 0
    `;

  try {
    await con.beginTransaction();
    const [row] = await con.query(deleteIntroductionQuery);
    await con.commit();
    return row;
  } catch (e) {
    await con.rollback();
    await con.release();
    console.log(`query error \n ${e}`);
    return false;
  }
}

module.exports = {
  getIntroduction,
  getLab,
  insertIntroduction,
  updateIntroduction,
  deleteIntroduction
};
