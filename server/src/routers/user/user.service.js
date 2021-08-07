const users = new Array();
const db = require("../../config/db");

exports.test = function (req, res) {
  res.send("분리");
};

exports.getAllUser = function (req, res) {
  const users = db.query("SELECT * FROM users", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  });
  res.send(users.RowDataPacket);
};

exports.register = function (req, res) {
  const newUser = {
    id: req.body.id,
    password: req.body.password,
  };
  users.push(newUser);
  res.send("회원가입 성공");
  //유저 정보를 입력받아 회원가입을 진행함
  // json 형태로 받을 예정
};

exports.login = function (req, res) {
  res.send("test");
};

exports.user = new Array();
