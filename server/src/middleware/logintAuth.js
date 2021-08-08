const db = require("../config/db");
const bcrypt = require("bcrypt");

const LoginAuth = function (req, res, next) {
  const { email, pwd } = req.body;

  if (!email || !pwd) {
    console.log(email, pwd);
    return res.json({
      success: false,
      message: "email 과 pwd 값은 필수 입력 값 입니다.",
    });
  }

  const sql = `SELECT * FROM users WHERE email = '${email}';`;
  db.query(sql, (err, users) => {
    if (err) {
      throw err;
    }

    if (users.length === 0) {
      return res.json({
        success: false,
        message: "해당 email을 가진 유저가 존재하지 않습니다.",
      });
    }
    const hashedPwd = users[0].pwd;

    bcrypt.compare(pwd, hashedPwd, (err, result) => {
      if (err) {
        throw next(err);
      }
      result
        ? next()
        : res.json({ success: false, message: "비밀번호가 틀렸습니다." });
    });
    // DB에 비밀번호는 암호화 되어 저장될 예정이므로
    // 비교하는 로직 수정 필요
    // return users[0].pwd === pwd
    //   ? next()
    //   : res.json({ success: false, message: "비밀번호가 틀렷습니다." });
  });
};

module.exports = LoginAuth;
