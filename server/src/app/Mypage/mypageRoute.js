const { studentAuth } = require("../../middleware/studentAuth");

module.exports = function (app) {
  const controller = require("./mypageController");

  // dashbord 접근 시 학생이 속하는 연구실 목록 가져오는 api
  app.get("/app/mypage", studentAuth, controller.getStudentLab);
};
