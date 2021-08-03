const users = {
  _id: Number,
  email: String,
  password: String,
};

exports.user = new Array();

exports.test = function (req, res) {
  res.send("분리");
};

exports.getAllUser = function (req, res) {
  res.send(user);
};

exports.register = function (req, res) {
  const userEntity = users;
  const userInfo = req.body;

  userEntity._id = user.length + 1;
  userEntity.email = userInfo.email;
  userEntity.password = userInfo.password;

  user.push(userEntity);
  res.json({ success: true, message: "성공적으로 회원가입 되었습니다." });
};

exports.login = function (req, res) {};
