const secret_config = require("../../config/secret");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../../config/jwt");
const userProvider = require("../app/User/userProvider");

module.exports = {
  async userAuth(req, res, next) {
    if (req.cookies.access === undefined)
      throw Error("API 사용 권한이 없습니다.");
    const accessToken = verifyToken(req.cookies.access);
    const userId = accessToken.userId;
    const retrieveFromUser = await userProvider.getTokenFromUser(userId);
    const getRefreshToken = retrieveFromUser.refreshToken;
    const refreshToken = verifyToken(getRefreshToken);
    const job = retrieveFromUser.job;
    if (accessToken === null) {
      if (refreshToken === undefined) {
        //둘 다 만료
        throw Error("API 사용 권한이 없습니다.");
      } else {
        //accessToken만 만료
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
      if (refreshToken === undefined) {
        //access token 존재, refresh token 만료
        const newRefreshToken = jwt.sign(
          {
            id: userId,
          },
          secret_config.jwtsecret,
          {
            expiresIn: "14d",
            subject: "User",
          }
        );
        res.cookie("userId", newRefreshToken.id);
        req.cookies.userId = newRefreshToken.id;
      }
    }
    next();
  },
};
