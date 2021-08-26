const { auth } = require("../../middleware/auth");

module.exports = function (app) {
  const controller = require("./labController");

  // lab 생성 api
  app.post("/app/lab", controller.createLab);

  // lab 정보 가져오는 api
  app.get("/app/lab/:labId", controller.getOneLab);

  //lab 정보 수정 api
  app.patch("/app/lab/:labId", controller.updateLab);

  // lab 삭제 api
  app.delete("/app/lab/:labId", controller.deleteLab);

  app.get("/app/test", auth, controller.test);
};
