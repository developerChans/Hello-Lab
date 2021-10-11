const insertQnaQuery = `
INSERT INTO LabQna(content, userId, labId) 
VALUES(?, ?, ?)`;

const selectQnaQuery = `
SELECT q.id, q.createdAt, q.updatedAt, q.content, u.name 
FROM LabQna q JOIN User u on u.id = q.userId 
WHERE q.labId = ? AND q.status = 0 AND q.parentId is NULL
ORDER BY q.createdAt desc`;

const updateQnaQuery = `
UPDATE LabQna 
SET content = ?
WHERE id = ? AND labId = ?
`;

const deleteQnaQuery = `
Update LabQna
SET status = 1
WHERE id = ? AND labId = ?
`;

const insertQnaReplyQuery = `
INSERT INTO LabQna(content, userId, parentId, labId)
VALUES(?,?,?,?)
`;

const selectQnaReplyQuery = `
SELECT q.*, u.name 
FROM LabQna q JOIN User u ON u.id = q.userId
WHERE q.parentId = ? AND q.labId = ? AND q.status = 0
`;

const getUserIdById = `
SELECT userId 
FROM LabQna
WHERE id = ?
`;
module.exports = {
  insertQnaQuery,
  selectQnaQuery,
  updateQnaQuery,
  deleteQnaQuery,
  insertQnaReplyQuery,
  selectQnaReplyQuery,
  getUserIdById,
};
