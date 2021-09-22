const secret_config = require("../../config/secret");
const jwt = require("jsonwebtoken");

// const studentAuth = (req, res, next) => {
//   const token = req.cookies.access;
//   try {
//     const check = jwt.verify(token, secret_config.jwtsecret);
//     if (check.sub !== "student") {
//       throw Error("No Student LogIn");
//     }
//     req.userId = check.userId;
//   } catch (e) {
//     res.status(401).json({ isAuth: false, message: "유효하지 않은 토큰" });
//     next(e);
//   } finally {
//     next();
//   }
// };

const { verifyToken } = require("../../config/jwt");

const studentAuth = (req, res, next) => {
  const token = req.cookies.access;
  const payload = verifyToken(token);
  console.log(payload);

  if (payload.sub !== "student") {
    next(Error());
  }
  next();
};
module.exports = { studentAuth };
