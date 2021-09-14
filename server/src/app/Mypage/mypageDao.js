const selectStudentLabQuery = `SELECT l.name, l.id, u.name as pname
FROM UserLab ul
JOIN Lab l ON ul.labId = l.id
JOIN User u ON l.professorId = u.id
WHERE ul.userId = ? AND l.status = 0;
`;

module.exports = {
  selectStudentLabQuery,
};
