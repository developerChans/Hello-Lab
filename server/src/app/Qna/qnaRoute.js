const { userAuth } = require("../../middleware/userAuth");

module.exports = function (app) {
  const controller = require("./qnaController");

  app.post("/app/qna/:noticeId", controller.createQna);

  app.get("/app/qna/:noticeId", (req, res) => {
    const noticeId = req.params.noticeId;
    res.send(noticeId);
  });

  app.get("/test", userAuth, (req, res) => {
    res.send("통과");
  });
};
