module.exports = function (app) {
  const member = require("./memberController");

   //연구실 멤버목록 조회 API
  app.get("/app/lab/:labId/member", member.getAllMember);
};
