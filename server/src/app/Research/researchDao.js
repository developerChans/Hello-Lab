
async function checkLabResearch(con, researchId) {
  const getOutlineQuery = `
    select r.labId, l.professorId
    from Research r
    join Lab l on r.labId = l.id
    where r.id = ?;
  `;
  try {
    const [row] = await con.query(getOutlineQuery, researchId);
    return row;
  } catch (e) {
    console.log(`query error \n ${e}`);
    return false;
  }
}

async function getOutline(con, researchId) {
  const getOutlineQuery = `
    select ro.content, ro.status
    from ResearchOutline ro
    join Research r on r.id = ro.researchId
    where ro.researchId = ${researchId}
    and ro.status = 0
  `;
  try {
    const [row] = await con.query(getOutlineQuery);
    return row;
  } catch (e) {
    console.log(`query error \n ${e}`);
    return false;
  }
}

// 연구 개요 생성/수정
async function insertOutline(con, researchId, content) {
  const insertOutlineQuery = `
    INSERT INTO ResearchOutline(researchId, content) VALUES(?,?)
    `;

  try {
    const [row] = await con.query(insertOutlineQuery, [researchId, content]);
    return row;
  } catch (e) {
    console.log(`query error \n ${e}`);
    return false;
  }
}

async function updateOutline(con, researchId, content) {
  const updateIntroductionQuery = `
    UPDATE ResearchOutline SET content = ?
    WHERE  researchId= ?
    and status = 0
    `;

  try {
    await con.beginTransaction();
    const [row] = await con.query(updateIntroductionQuery, [content, researchId]);
    await con.commit();
    return row;
  } catch (e) {
    await con.rollback();
    await con.release();
    console.log(`query error \n ${e}`);
    return false;
  }
}


// 연구 개요 삭제
async function deleteOutline(con, researchId) {
  const updateIntroductionQuery = `
    DELETE FROM ResearchOutline 
    WHERE id = ${researchId}
    `;

  try {
    const [row] = await con.query(updateIntroductionQuery);
    return row;
  } catch (e) {
    console.log(`query error \n ${e}`);
    return false;
  }
}


// 연구 멤버 조회
async function getResearchMembersList(con, researchId) {
  const getResearchMembersListQuery = `
      select u.id, u.name, u.imageUrl
      from ResearchMember rm
      join Research r on r.id = rm.researchId
      join User u on rm.userId = u.id
      where r.status = 0
      and rm.status = 0
      and r.id = ?;
  `;
  try {
    const [row] = await con.query(getResearchMembersListQuery, researchId);
    return row;
  } catch (e) {
    console.log(`query error \n ${e}`);
    return false;
  }
}

module.exports = {
  checkLabResearch,
  getOutline,
  insertOutline,
  updateOutline,
  deleteOutline,
  getResearchMembersList
};
