const labProvider = require("./labProvider");
const labService = require("./labService");
const userProvider = require("../User/userProvider");
const labJoi = require("./labJoi");
const openProvider = require("../OpenLab/openProvider");

exports.createLab = async (req, res) => {
  try {
    const bodyData = req.body;
    await labJoi.createLabJoi.validateAsync(bodyData);
    const createLabEntity = [
      bodyData.name,
      req.userId,
      bodyData.associateProfessorId,
    ];
    const professorId = req.userId;
    const result = await labService.createLab(createLabEntity, professorId);
    return result
      ? res
          .status(201)
          .json({ success: true, message: "정상적으로 생성되었습니다." })
      : res.status(400).json({ success: false, message: "생성 실패" });
  } catch (e) {
    console.log(`Controller error \n ${e}`);
    return res.status(400).json({
      success: false,
      message: "연구실이름(name)은 필수 값 입니다.",
    });
  }
};

exports.getOneLab = async (req, res) => {
  const labId = req.params.labId;
  try {
    await labJoi.getOneLabJoi.validateAsync(labId);
    const result = await labProvider.getOneLab(labId);

    return result[0]
      ? res.status(200).send(result)
      : res
          .status(404)
          .json({ success: "fail", message: "해당 id에 Lab이 없습니다." });
  } catch (e) {
    console.log(`Controller Error \n ${e}`);
    return res
      .status(400)
      .json({ success: false, message: "labId는 1이상의 number입니다." });
  }
};

exports.updateLab = async (req, res) => {
  const labId = req.params.labId;
  const forCheck = await labProvider.getOneLab(labId);
  if (!forCheck[0]) {
    return res
      .status(400)
      .send("요청하신 id에 해당하는 Lab이 존재하지 않습니다.");
  }
  const { name, associateProfessorId } = req.body;
  const updateInfo = [name, associateProfessorId, labId];
  try {
    await labJoi.createLabJoi.validateAsync(req.body);
    const result = await labService.updateLab(updateInfo);
    result
      ? res
          .status(200)
          .json({ success: true, message: "정상적으로 변경 되었습니다." })
      : res.send(400).send("입력 값이 잘못 되었습니다.");
  } catch (e) {
    console.log(`Controller error\n ${e}`);
    return res
      .status(400)
      .json({ success: false, message: "연구실 이름(name)은 필수 값 입니다." });
  }
};

exports.deleteLab = async (req, res) => {
  const labId = req.params.labId;
  const forCheck = await labProvider.getOneLab(labId);
  if (!forCheck[0]) {
    return res.status(400).json({
      success: false,
      message: "요청하신 id에 해당하는 Lab이 존재하지 않습니다.",
    });
  }
  try {
    const result = await labService.deleteLab(labId);
    result
      ? res
          .status(200)
          .json({ success: true, message: "성공적으로 삭제 되었습니다." })
      : res.status(400).json({ success: false, message: "삭제 실패" });
  } catch (e) {
    console.log(e);
  }
};

exports.applyLab = async (req, res) => {
  const userId = req.userId;
  const labId = req.params.labId;
  const content = req.body.content;

  const applyLabInfo = [userId, labId, content];
  try {
    const validateData = { userId, labId, content };
    await labJoi.applyLabJoi.validateAsync(validateData);
    const result = await labService.applyLab(applyLabInfo);
    result
      ? res
          .status(201)
          .json({ success: true, message: "성공적으로 요청을 보냈습니다." })
      : res.status(400).json({ success: false });
  } catch (e) {
    console.log(`Controller error \n ${e}`);
    return res.status(400).send(e.message);
  }
};

exports.treatApply = async (req, res) => {
  const requestId = req.params.requestId;
  const allow = req.body.allow;

  try {
    await labJoi.updateJoinLabJoi.validateAsync(allow);
    const result = await labService.treatApply(requestId, allow);
    if (result === undefined) {
      throw Error("최상단 에러를 확인하세요");
    }
    return result
      ? res.status(201).json({
          success: true,
          message: "성공적으로 처리 되었습니다.",
        })
      : res.status(400).json({ success: false });
  } catch (e) {
    console.log(`Controller error \n ${e}`);
    return res
      .status(400)
      .json({ success: false, message: "허가 여부(allow)는 필수 값 입니다." });
  }
};

exports.applyLabInfo = async (req, res) => {
  const labId = req.params.labId;
  const userId = req.userId;

  try {
    const labInfo = await openProvider.getOpenLabs(labId);
    const userInfo = await userProvider.getUser(userId);

    const totalInfo = {
      labName: labInfo[0].labName,
      professorName: labInfo[0].professorName,
      labMajor: labInfo[0].major,
      field: labInfo[0].field,
      userName: userInfo[0].name,
      userMajor: userInfo[0].major,
      userNum: userInfo[0].userNum,
      userPhoneNum: userInfo[0].phoneNum,
    };

    return res.status(200).send(totalInfo);
  } catch (e) {
    console.log(`Cotroller Error \n ${e}`);
    return res.status(500).send("서버 에러");
  }
};

exports.getAllApply = async (req, res) => {
  const professorId = req.userId;

  try {
    const result = await labProvider.getAllApplyByProfessorId(professorId);
    return res.status(200).send(result);
  } catch (e) {
    console.log(`Controller error \n ${e}`);
    return res.status(500).send("server error");
  }
};

exports.test = async (req, res) => {
  res.json({ success: true });
};
