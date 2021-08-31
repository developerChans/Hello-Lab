const secret_config = require("../../config/secret");
const jwt = require("jsonwebtoken");

const professorAuth = (req, res, next) => {
  const token = req.cookies.accessToken;
  try {
    const check = jwt.verify(token, secret_config.jwtsecret);
    if (check.sub !== "Professor") {
      throw Error("No Professor LogIn");
    }
    req.userId = check.userId;
  } catch (e) {
    res.status(401).json({ success: false, message: "유효하지 않은 토큰" });
    next(e);
  } finally {
    next();
  }
};

module.exports = { professorAuth };
