const { studentAuth } = require("../../middleware/studentAuth");
const { professorAuth } = require("../../middleware/professorAuth");
const { userAuth } = require("../../middleware/userAuth");

module.exports = function (app) {
  const controller = require("./labController");

  // lab 생성 api
  app.post("/app/lab", professorAuth, controller.createLab);

  // lab 정보 가져오는 api
  app.get("/app/lab/:labId", controller.getOneLab);

  //lab 정보 수정 api
  app.patch("/app/lab/:labId", controller.updateLab);

  // lab 삭제 api
  app.delete("/app/lab/:labId", controller.deleteLab);

  // lab 가입 요청서 정보 가져오는 api
  app.get("/app/lab-apply/:labId", userAuth, controller.applyLabInfo);

  // lab 가입 요청 api
  app.post("/app/lab-apply/:labId", userAuth, controller.applyLab);

  // 미처리 lab 가입 요청들 확인 api
  app.get("/app/lab-apply", professorAuth, controller.getAllApply);

  // lab 가입 요청 처리 api
  app.patch("/app/lab-apply/:requestId", professorAuth, controller.treatApply);

  // test
  app.get("/test", studentAuth, (req, res) => {
    return res.send("통과");
  });
};
