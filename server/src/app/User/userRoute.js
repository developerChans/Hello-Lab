module.exports = function (app) {
  const user = require("./userController");
  const LoginAuth = require("../../../config/logintAuth");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  //학생 회원가입
  app.post("/app/users/students", user.postStudents);
  //학생 정보 get
  app.get("/app/users/students", user.getStudents);

  //교수 회원가입
  app.post("/app/users/professors", user.postProfessors);

  //교수 정보 get
  app.get("/app/users/professors", user.getProfessors);

  //학생 로그인
  app.post("/app/login/students", user.studentLogin);

  //교수 로그인
  app.post("/app/login/professors", user.professorLogin);
};
