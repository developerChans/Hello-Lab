const selectStudentLabQuery = `SELECT l.id, l.name FROM StudentLab s join LAB l ON s.labId = l.id WHERE s.studentId = ? AND l.status = 0`;

module.exports = {
  selectStudentLabQuery,
};
