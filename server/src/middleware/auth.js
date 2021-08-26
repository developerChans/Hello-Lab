const secret_config = require("../../config/secret");
const jwt = require("jsonwebtoken");

const labController = require("../app/Lab/labController");

const auth = (req, res, next) => {
  const token = req.cookies.access_token;
  try {
    const check = jwt.verify(token, secret_config.jwtsecret);
    req.userId = check.userId;
  } catch (e) {
    const result = labController.test2();
    console.log(result);
    if (result) {
      console.log("hi");
      this.auth;
    }
    res.status(401).json({ success: false, message: "유효하지 않은 토큰" });
    next(e);
  } finally {
    next();
  }
  //   console.log(req.cookies.access_token);
  //   const token = req.cookies.access_token;
  //   const check = jwt.verify(token, secret_config.jwtsecret);
  //   //   const wrongcheck = jwt.verify(token, "wrong");
  //   console.log(check);
  //   //   console.log(wrongcheck);
  //   req.test = "hi im yong";
  //   next();
};

module.exports = { auth };
