const { professorAuth } = require("../../middleware/professorAuth");
const { userAuth } = require("../../middleware/userAuth");

module.exports = function (app) {
  const controller = require("./qnaController");

  // 질문 생성 api
  app.post("/app/qna/:labId", userAuth, controller.createQna);

  // 질문 페이지의 댓글 전부 가져오는 api
  app.get("/app/qna/:labId", controller.getQna);

  // 질문 수정 api
  app.patch("/app/qna/:labId/:qnaId", controller.updateQna);

  // 질문 삭제 api
  app.delete("/app/qna/:labId/:qnaId", controller.deleteQna);

  // 질문 대댓글 생성 api
  app.post("/app/qna/:labId/:qnaId", userAuth, controller.createQnaReply);

  // 질문 대댓글 불러오는 api
  app.get("/app/qna/:labId/:qnaId", controller.getQnaReply);

  app.get("/test", professorAuth, (req, res) => {
    res.send("통과");
  });
};
