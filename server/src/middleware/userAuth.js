const secret_config = require("../../config/secret");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../../config/jwt");
const userProvider = require("../app/User/userProvider");
const userService = require("../app/User/userService");
module.exports = {
  async userAuth(req, res, next) {
    try {
      const accessToken = await verifyToken(req.cookies.access);
      const userId = req.cookies.userId;
      const retrieveFromUser = await userProvider.getTokenFromUser(userId);
      const getRefreshToken = retrieveFromUser.refreshToken;
      const refreshToken = verifyToken(getRefreshToken);
      const job = retrieveFromUser.job;
      req.userId = userId;
      if (accessToken === null) {
        if (refreshToken === null) {
          //둘 다 만료
          throw Error("API 사용 권한 없습니다.");
        } else {
          //accessToken만 만료
          console.log(`accessToken재발급`);
          const newAccessToken = jwt.sign(
            {
              id: userId,
            },
            secret_config.jwtsecret,
            {
              expiresIn: "1h",
              subject: job ? "professor" : "student",
            }
          );
          res.cookie("access", newAccessToken);
          req.cookies.access = newAccessToken;
        }
      } else {
        //access token 존재, refresh token 만료
        if (refreshToken === null) {
          console.log(`refreshToken재발급`);
          const newRefreshToken = jwt.sign(
            {
              id: userId,
            },
            secret_config.jwtsecret,
            {
              expiresIn: "12h",
              subject: "User",
            }
          );
          userService.updateToken(userId, newRefreshToken);
          req.cookies.userId = newRefreshToken.id;
        }
      }
    } catch (e) {
      res.status(401).json({ isAuth: false, message: "유효하지 않은 토큰" });
      next(e);
      console.log(`error occured: ${e}`);
    } finally {
      next();
    }
  },
};
