const { userAuth } = require("../../middleware/userAuth");

module.exports = function (app) {
  const controller = require("./mypageController");

  // dashbord 접근 시 유저가 속하는 연구실 목록 가져오는 api
  app.get("/app/mypage", userAuth, controller.getStudentLab);
};
