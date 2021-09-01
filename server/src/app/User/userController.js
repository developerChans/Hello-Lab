const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("./userProvider");
const userService = require("./userService");
const regexEmail = require("regex-email");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const secret_config = require("../../../config/secret");
const jwt = require("jsonwebtoken");

exports.postStudents = async function (req, res) {
  const { email, password, name, studentNum, major, phoneNumber, imageUrl } =
    req.body;
  if (!email) return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

  // 이메일 중복 확인
  const emailRows1 = await userProvider.studentEmailCheck(email);
  const emailRows2 = await userProvider.professorEmailCheck(email);
  if (emailRows1.length > 0)
    return res.send(errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL));
  if (emailRows2.length > 0)
    return res.send(errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL));

  // 이메일 길이 체크
  if (email.length > 30)
    return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

  // 형식 체크 (by 정규표현식)
  if (!regexEmail.test(email))
    return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

  // 이름 빈 값 체크
  if (!name) return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));

  // 이름 길이 체크
  if (name.length > 30)
    return res.send(response(baseResponse.SIGNUP_NAME_LENGTH));

  // 비밀번호 빈 값 체크
  if (!password) return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));

  // 비밀번호 길이 체크
  if (password.length > 20 || password.length < 6)
    return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));

  const signUpResponse = await userService.createStudent(
    email,
    name,
    studentNum,
    major,
    phoneNumber, //phoneNum validation 나중에..
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
  const { email, password, name, professorNum, major, phoneNumber, imageUrl } =
    req.body;
  if (!email) return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

  // 이메일 중복 확인
  const emailRows1 = await userProvider.studentEmailCheck(email);
  const emailRows2 = await userProvider.professorEmailCheck(email);
  if (emailRows1.length > 0)
    return res.send(errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL));
  if (emailRows2.length > 0)
    return res.send(errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL));

  // 이메일 길이 체크
  if (email.length > 30)
    return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

  // 형식 체크 (by 정규표현식)
  if (!regexEmail.test(email))
    return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

  // 이름 빈 값 체크
  if (!name) return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));

  // 이름 길이 체크
  if (name.length > 30)
    return res.send(response(baseResponse.SIGNUP_NAME_LENGTH));

  // 비밀번호 빈 값 체크
  if (!password) return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));

  // 비밀번호 길이 체크
  if (password.length > 20 || password.length < 6)
    return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));

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

exports.studentLogin = async function (req, res) {
  const { email, password } = req.body;

  const signInResponse = await userService.postStudentSignIn(email, password);
  return signInResponse.isSuccess
    ? res
        .cookie("accessStudent", signInResponse.result.accessJwt)
        .cookie("refreshStudent", signInResponse.result.refreshJwt)
        .send(signInResponse)
    : res.send(signInResponse);
};

exports.professorLogin = async function (req, res) {
  const { email, password } = req.body;

  const signInResponse = await userService.postProfessorSignIn(email, password);
  return signInResponse.isSuccess
    ? res
        .cookie("accessProfessor", signInResponse.result.accessJwt)
        .cookie("refreshProfessor", signInResponse.result.refreshJwt)
        .send(signInResponse)
    : res.send(signInResponse);
};

exports.studentWithdraw = async function (req, res) {
  const userIdFromJWT = req.verifiedToken.userId;
  const userId = req.params.studentId;
  if (req.cookies.accessStudent === undefined)
    res.send(errResponse(baseResponse.TOKEN_ACCESS_EMPTY));
  if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
  if (userIdFromJWT != userId) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    const accessToken = req.cookies.accessStudent;
    const refreshToken = await userProvider.getTokenFromStudent(userId);

    if (!accessToken) {
      if (!refreshToken) {
        //둘 다 없을 때
        res.send(errResponse(baseResponse.TOKEN_EXPIRED_ALL));
      } else {
        //접근, 갱신 토큰 모두 만료
        const newAccessToken = jwt.sign(
          {
            id: userId,
          },
          secret_config.jwtsecret,
          {
            expiresIn: "1h",
            subject: "Student",
          }
        );
        res.cookie("accessStudent", newAccessToken);
        req.cookies.accessStudent = newAccessToken;
      }
    } else {
      if (refreshToken === undefined) {
        //access token 존재, refresh token 만료
        const newRefreshToken = jwt.sign(
          {
            id: userId,
          },
          secret_config.jwtsecret,
          {
            expiresIn: "14d",
            subject: "Student",
          }
        );
        const updateRefrshToken = await userService.updateTokenStudent(
          newRefreshToken,
          userId
        );
        res.cookie("refreshStudent", newRefreshToken);
        req.cookies.refreshStudent = newRefreshToken;
      }
      const withdrawStudent = await userService.withdrawStudent(userId);
      return res.send(response(baseResponse.SUCCESS, withdrawStudent));
    }
  }
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
