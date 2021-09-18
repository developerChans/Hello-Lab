const labProvider = require("./labProvider");
const labService = require("./labService");
const userProvider = require("../User/userProvider");
const labJoi = require("../../joi/LabJoi");

exports.createLab = async (req, res) => {
  try {
    const bodyData = req.body;
    await labJoi.createLabJoi.validateAsync(bodyData);
    const createLabEntity = [
      bodyData.name,
      req.userId,
      bodyData.associateProfessorId,
    ];
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

exports.joinLab = async (req, res) => {
  const userId = req.userId;
  const labId = req.params.labId;

  const joinLabInfo = [userId, labId];
  try {
    const validateData = { userId, labId };
    await labJoi.joinLabJoi.validateAsync(validateData);
    const result = await labService.joinLab(joinLabInfo);
    result
      ? res
          .status(201)
          .json({ success: true, message: "성공적으로 요청을 보냈습니다." })
      : res.status(400).json({ success: false });
  } catch (e) {
    console.log(`Controller error \n ${e}`);
    return res
      .status(500)
      .send("서버 에러 발생\n userId or labId가 올바르지 않습니다.");
  }
};

exports.updateJoinLab = async (req, res) => {
  const requestId = req.params.requestId;
  const allow = req.body.allow;

  try {
    await labJoi.updateJoinLabJoi.validateAsync(allow);
    const result = await labService.updateJoinLab(requestId, allow);
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

exports.test = async (req, res) => {
  res.json({ success: true });
};
