module.exports = function (app) {
  const member = require("./memberController");

   //해당 연구실 공지사항 가져오는 api
  app.get("/app/lab/:labId/member", member.getAllMember);
};
