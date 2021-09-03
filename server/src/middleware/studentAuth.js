const secret_config = require("../../config/secret");
const jwt = require("jsonwebtoken");

const studentAuth = (req, res, next) => {
  const token = req.cookies.access;
  try {
    const check = jwt.verify(token, secret_config.jwtsecret);
    if (check.sub !== "Student") {
      throw Error("No Student LogIn");
    }
    req.userId = check.userId;
  } catch (e) {
    res.status(401).json({ success: false, message: "유효하지 않은 토큰" });
    next(e);
  } finally {
    next();
  }
};

module.exports = { studentAuth };
