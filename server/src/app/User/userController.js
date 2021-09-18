const jwtMiddleware = require("../../../config/jwt");
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
exports.login = async function (req, res) {
  const { email, password } = req.body;

  const signInResponse = await userService.postUserSignIn(email, password);
  console.log(signInResponse);
  return signInResponse.isSuccess
    ? res
        .status(200)
        .cookie("access", signInResponse.result.accessJwt)
        .cookie("userId", signInResponse.result.userId)
        .send(signInResponse)
    : res.status(203).send(signInResponse);
};
exports.withdraw = async function (req, res) {
  const userId = req.userId;
  if (!userId)
    return res.status(400).send(errResponse(baseResponse.USER_USERID_EMPTY));
  else {
    const withdrawUser = await userService.withdrawUser(userId);
    return res.status(200).send(response(withdrawUser));
  }
};

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
          .cookie("userId", null)
          .json({ success: true, message: "로그아웃 성공" })
      : res.status(400).json({ success: false, message: "로그아웃 실패" });
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
    return res.status(500).send("서버 에러 발생 ");
  }
};

// 최승용 코드
exports.userAuth = async (req, res) => {
  const userId = req.cookies.userId;
  try {
    const result = await userProvider.getUser(userId);
    // console.log(result);
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
          imageUrl: result[0].imageURL,
          job: result[0].job,
        })
      : res.status(400).json({ success: false });
  } catch (e) {
    console.log(`Routing error \n${e}`);
    return res.status(500).send("서버 오류 발생");
  }
};

exports.check = (req, res) => {
  res.send("hi");
};

exports.user = new Array();
