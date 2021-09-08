const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("./userProvider");
const userService = require("./userService");
const regexEmail = require("regex-email");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const secret_config = require("../../../config/secret");
const jwt = require("jsonwebtoken");

exports.postUsers = async function (req, res) {
  const { email, password, name, userNum, major, phoneNumber, imageUrl, job } =
    req.body;
  if (!email)
    return res.status(400).send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

  // 이메일 중복 확인
  const emailRows = await userProvider.userEmailCheck(email);

  if (emailRows !== undefined)
    return res
      .status(204)
      .send(errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL));

  // 이메일 길이 체크
  if (email.length > 30)
    return res.status(400).send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

  // 형식 체크 (by 정규표현식)
  if (!regexEmail.test(email))
    return res.status(400).send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

  // 이름 빈 값 체크
  if (!name)
    return res.status(400).send(response(baseResponse.SIGNUP_NAME_EMPTY));

  // 이름 길이 체크
  if (name.length > 30)
    return res.status(400).send(response(baseResponse.SIGNUP_NAME_LENGTH));

  // 비밀번호 빈 값 체크
  if (!password)
    return res.status(400).send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));

  // 비밀번호 길이 체크
  if (password.length > 20 || password.length < 6)
    return res.status(400).send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));

  const signUpResponse = await userService.createUser(
    email,
    name,
    userNum,
    major,
    phoneNumber, //phoneNum validation 나중에..
    password,
    imageUrl,
    job
  );

  return res.status(201).send(signUpResponse);
};

exports.getUsers = async function (req, res) {
  const userList = await userProvider.retrieveUserList();
  return res.status(200).send(userList);
};
/*
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
*/
exports.login = async function (req, res) {
  const { email, password } = req.body;

  const signInResponse = await userService.postUserSignIn(email, password);
  return signInResponse.isSuccess
    ? res
        .status(200)
        .cookie("access", signInResponse.result.accessJwt)
        .cookie("refresh", signInResponse.result.refreshJwt)
        .send(signInResponse)
    : res.status(203).send(signInResponse);
};
/*
exports.professorLogin = async function (req, res) {
  const { email, password } = req.body;

  const signInResponse = await userService.postProfessorSignIn(email, password);
  return signInResponse.isSuccess
    ? res
        .cookie("access", signInResponse.result.accessJwt)
        .cookie("refresh", signInResponse.result.refreshJwt)
        .send(signInResponse)
    : res.send(signInResponse);
};
*/
exports.Withdraw = async function (req, res) {
  if (req.cookies.access === undefined)
    res.status(401).send(errResponse(baseResponse.TOKEN_ACCESS_EMPTY));
  const userId = req.userId;
  const accessToken = req.cookies.access;

  const refreshToken = await userProvider.getTokenFromUser(userId);
  if (!accessToken) {
    if (!refreshToken) {
      //둘 다 없을 때
      res.status(401).send(errResponse(baseResponse.TOKEN_EXPIRED_ALL));
    } else {
      //접근, 갱신 토큰 모두 만료
      const newAccessToken = jwt.sign(
        {
          id: userId,
        },
        secret_config.jwtsecret,
        {
          expiresIn: "1h",
          subject: "User",
        }
      );
      res.cookie("access", newAccessToken);
      req.cookies.access = newAccessToken;
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
          subject: "User",
        }
      );
      //여기에 리프레쉬 토큰 업데이트하는 거 넣어야

      res.cookie("refresh", newRefreshToken);
      req.cookies.refresh = newRefreshToken;
    }
  }

  if (!userId)
    return res.status(400).send(errResponse(baseResponse.USER_USERID_EMPTY));
  else {
    const withdrawUser = await userService.withdrawUser(userId);
    return res.status(200).send(response(withdrawUser));
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

//최승용 코드
exports.logout = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await userService.logout(userId);
    if (result === undefined) {
      throw Error("최상단 에러 확인");
    }
    return result
      ? res
          .status(200)
          .cookie("access", null)
          .cookie("refresh", null)
          .json({ success: true, message: "로그아웃 성공" })
      : res.status(400).json({ success: false, message: "로그아웃 실패" });
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
    return res.status(500).send("서버 에러 발생 ");
  }
};

// 최승용 코드
exports.userAuth = async (req, res) => {
  const userId = req.userId;
  try {
    const result = await userProvider.getUser(userId);
    if (result === undefined) {
      throw Error("최상위 에러 확인");
    }
    return result
      ? res.status(200).json({
          isAuth: true,
          id: result[0].id,
          userNum: result[0].userNum,
          name: result[0].name,
          email: result[0].email,
          major: result[0].major,
          phoneNum: result[0].phoneNum,
          imageUrl: result[0].imageUrl,
          job: result[0].job,
        })
      : res.status(400).json({ success: false });
  } catch (e) {
    console.log(`Routing error \n${e}`);
    return res.status(500).send("서버 오류 발생");
  }
};

exports.user = new Array();
