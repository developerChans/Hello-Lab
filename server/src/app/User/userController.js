const userProvider = require("./userProvider");
const userService = require("./userService");
const regexEmail = require("regex-email");
exports.test = function (req, res) {
  return res.json({
    success: 성공,
    message:
      "test성공",
  });
};

exports.postStudents = async function (req, res) {
  const {email,password,name,studentNum,major,phoneNumber,imageUrl} =req.body;
  if (!email)
      return res.json({
          result:성공,
          message: "회원가입 성공"
      });

    // 이메일 길이 체크
  if (email.length > 30)
      return res.json({
        result:실패,
          message: "이메일 길이를 확인해주세요(30자 이하)"
      })
    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
    return res.json({
      result:실패,
      message: "이메일 형식을 확인해주세요."
  });
    // 이름 빈 값 체크
    if (!name)
    return res.json({
      result:실패,
      message: "이름을 입력해주세요."
  });

    // 이름 길이 체크
    if (name.length > 30)
    return res.json({
      result:실패,
      message: "이름 길이를 확인해주세요.(30자이하)"
  });

    
    // 비밀번호 빈 값 체크 
    if(!password)
    return res.json({
      result:실패,
      message: "비밀번호를 입력해주세요."
  });  
    // 비밀번호 길이 체크
    if(password.length>20||password.length<6)
    return res.json({
      result:실패,
      message: "비밀번호 길이를 확인해주세요.(6자 이상 20자 이하)"
  });
   
    const signUpResponse = await userService.createStudent(
        email,
        name,
        studentNum,
        major,
        phoneNumber,
        password,
        imageUrl
    );

    return res.send(signUpResponse);
};

exports.getStudents = async function (req, res) {
  const studentList = await userProvider.retrieveStudentList();
  return res.send(studentList);
};

exports.postProfessors = async function (req, res) {
  const {email,password,name,professorNum,major,phoneNumber,imageUrl} =req.body;
  if (!email)
      return res.json({
          result:성공,
          message: "회원가입 성공"
      });

    // 이메일 길이 체크
  if (email.length > 30)
      return res.json({
        result:실패,
          message: "이메일 길이를 확인해주세요(30자 이하)"
      })
    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
    return res.json({
      result:실패,
      message: "이메일 형식을 확인해주세요."
  });
    // 이름 빈 값 체크
    if (!name)
    return res.json({
      result:실패,
      message: "이름을 입력해주세요."
  });

    // 이름 길이 체크
    if (name.length > 30)
    return res.json({
      result:실패,
      message: "이름 길이를 확인해주세요.(30자이하)"
  });

    
    // 비밀번호 빈 값 체크 
    if(!password)
    return res.json({
      result:실패,
      message: "비밀번호를 입력해주세요."
  });  
    // 비밀번호 길이 체크
    if(password.length>20||password.length<6)
    return res.json({
      result:실패,
      message: "비밀번호 길이를 확인해주세요.(6자 이상 20자 이하)"
  });
   
    const signUpResponse = await userService.createProfessor(
        email,
        name,
        professorNum,
        major,
        phoneNumber,
        password,
        imageUrl
    );

    return res.send(signUpResponse);
};

exports.getProfessors = async function (req, res) {
  const professorList = await userProvider.retrieveProfessorList();
  return res.send(professorList);
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
