const selectStudentLabQuery = `
SELECT l.id, l.name, u.name as pname
FROM StudentLab s 
JOIN LAB l ON s.labId = l.id 
JOIN User u ON u.id = l.professorId
WHERE s.studentId = ? AND l.status = 0`;

module.exports = {
  selectStudentLabQuery,
};
