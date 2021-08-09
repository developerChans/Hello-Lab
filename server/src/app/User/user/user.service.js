const users = new Array();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const db = require("../../../config/db");

exports.test = function (req, res) {
  res.send("분리");
};

exports.getAllUser = function (req, res) {
  db.query("SELECT * FROM users", (err, data) => {
    if (err) {
      console.log(err);
    }
    const users = data;
    console.log(data);
    res.send(users);
  });
  res.send(users.RowDataPacket);
};

exports.register = async function (req, res) {
  // todo 비밀번호 암호화후 저장

  const { email, pwd, name } = req.body;

  // todo  DTO 관련 부분 수정 필요
  if (!email || !pwd || !name) {
    return res.json({
      success: false,
      message:
        "필수 정보(이름name 이메일email 비밀번호pwd)를 입력하였는지 확인하세요",
    });
  }

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      throw err;
    }
    bcrypt.hash(pwd, salt, (err, hashedPwd) => {
      if (err) {
        throw err;
      }
      console.log(hashedPwd);
      const registerSql = `INSERT INTO users (name, email, pwd) VALUES ('${name}', '${email}', '${hashedPwd}');`;
      db.query(registerSql, (err) => {
        if (err) {
          throw err;
        }
        return res.json({ success: true, message: "회원가입 성공" });
      });
    });
  });
};

exports.login = function (req, res) {
  //
  // console.log(req.userId);
  res.send("여기까지 오면 로그인 인증 성공");
};

// const encriptPwd = function (plainPwd) {
//   bcrypt.genSalt(saltRounds, (err, salt) => {
//     if (err) {
//       throw err;
//     }
//     bcrypt.hash(plainPwd, salt, (err, hash) => {
//       if (err) {
//         throw err;
//       }
//       plainPwd = hash;
//       return hash;
//     });
//   });
// };
exports.user = new Array();
