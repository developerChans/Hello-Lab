module.exports = function (app) {
  const user = require("./userController");
  const LoginAuth = require("../../../config/logintAuth");
  const jwtMiddleware = require("../../../config/jwt");
  const { userAuth } = require("../../middleware/userAuth");

  //회원가입
  app.post("/app/users", user.postUsers);

  //사용자 정보 get
  app.get("/app/users", user.getUsers);

  //로그인
  app.post("/app/login", user.login);

  //탈퇴
  app.post("/app/users/withdraw", userAuth, user.withdraw);

  //로그아웃
  app.post("/app/logout", userAuth, user.logout);

  //유저 인증
  app.get("/app/users/auth", userAuth, user.userAuth);

  app.get("/test/test", userAuth, user.check);
};
