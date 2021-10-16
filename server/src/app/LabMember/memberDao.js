async function getAllMember(con, labId) {
  const getProfessorQuery = `
    select u.id, u.major, u.name, u.imageURL
    from Lab l
           join User u on u.id = l.professorId
    where l.id = ${labId}
      and u.status = 0
      and l.status = 0;
  `;
  const getAllMemberQuery = `
    select u.id, u.major, u.name, u.imageURL
    from Lab l
          join UserLab ul on ul.labId = l.id
          join User u on ul.userId = u.id
    where l.id = ${labId}
    and u.status = 0
    and l.status = 0;
    `;
  try {
    await con.beginTransaction();
    const [row] = await con.query(getProfessorQuery+getAllMemberQuery);
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
  getAllMember
};
