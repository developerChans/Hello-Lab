const userProvider = require("./userProvider");
const userService = require("./userService");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.test = function (req, res) {
  return res.json({
    success: 성공,
    message:
      "test성공",
  });
};
/*
exports.postStudents = async function (req, res) {
  const {email,password,name,studentNum,major,phoneNumber} =req.body;
  if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // 이메일 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));
    
    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
    
    // 이름 빈 값 체크
    if (!name)
        return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));

    // 이름 길이 체크
    if (name.length > 30)
        return res.send(response(baseResponse.SIGNUP_NAME_LENGTH));

    if(!nickname)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
    
    if(nickname.length>20)
    return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));
    // 비밀번호 빈 값 체크 
    if(!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
        
    // 비밀번호 길이 체크
    if(password.length>20||password.length<6)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));

   
    const signUpResponse = await userService.createUser(
        email,
        name,
        studentNum,
        major,
        phoneNumber,
        password
    );

    return res.send(signUpResponse);
  const studentList = await userProvider.retrieveStudentList();
  return res.send(response(studentList));
};
*/

exports.getStudents = async function (req, res) {
  const studentList = await userProvider.retrieveStudentList();
  return res.send(studentList);
};

exports.register = async function (req, res) {
  // todo 비밀번호 암호화 후 저장

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
