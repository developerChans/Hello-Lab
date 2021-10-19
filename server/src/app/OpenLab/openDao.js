async function getOpenLabsList(con, condition) {
  const getOpenLabsListQuery = `
          select l.id labId, l.name labName, l.isRecruit, u.name professorName,
                 u.major, x.field
          from Lab l
                 join User u on u.id = professorId
                 left join LabField lf on lf.labId = l.id
                 left join (
            select l.id labId, group_concat(f.field) field
            from Lab l
                   join LabField lf on lf.labId = l.id
                   join Field f on f.id = lf.fieldId
            group by l.id
          ) x on x.labId = l.id
          where l.status = 0
          `+condition+`
          group by l.id;
    `;
  try {
    const row = await con.query(getOpenLabsListQuery);
    return row[0];
  } catch (e) {
    console.log(`query Error \n ${e}`);
  }
}

module.exports = {
  getOpenLabsList
};
