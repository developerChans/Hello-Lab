const users = new Array();

exports.test = function (req, res) {
  res.send("분리");
};

exports.getAllUser = function (req, res) {
  res.send(users);
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
  const id = req.body.id;
  const password = req.body.password;

  const user = users.filter({ id: id });
  if (user) {
    console.log(user);
    // if (user.password === password) {
    //   return res.send("로그인 성공");
    // }
  }

  res.send("로그인 실패");
};

exports.user = new Array();
