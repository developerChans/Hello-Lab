const { professorAuth } = require("../../middleware/professorAuth");

module.exports = function (app) {
  const research = require("./researchController");

   // 연구 개요 조회 API
  app.get("/app/lab/:labId/research/:researchId/outline", research.getOutline);

  // 연구 개요 생성/수정 API
  app.post("/app/lab/:labId/research/:researchId/outline", professorAuth, research.postOutline);

  // 연구 개요 삭제 API
  app.delete("/app/lat/:labId/research/:researchId/outline", professorAuth, research.deleteOutline);

  // 연구 멤버 조회 API
  app. get("/app/lab/:labId/research/:researchId/member", research.getResearchMembers);
};
