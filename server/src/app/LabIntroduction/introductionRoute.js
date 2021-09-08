const { professorAuth } = require("../../middleware/professorAuth");

module.exports = function (app) {
  const introduction = require("./introductionController");

   //해당 연구실 소개 조회 API
  app.get("/app/lab/:labId/introduction", introduction.getIntroduction);
  
  //연구실 소개 생성/수정 API
  app.post("/app/lab/:labId/introduction", professorAuth, introduction.postIntroduction)

  //연구실 소개 삭제 API
  app.patch("/app/lab/:labId/introduction", professorAuth, introduction.deleteIntroduction )
};
