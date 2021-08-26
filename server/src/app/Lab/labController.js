const labProvider = require("./labProvider");
const labService = require("./labService");

exports.createLab = async (req, res) => {
  const { name, professorId, associateProfessorId } = req.body;
  if (!name || !professorId) {
    return res.status(400).json({
      success: false,
      message: "연구실이름(name)과 교수 id(professorId)는 필수 값 입니다.",
    });
  }
  const createLabEntity = [name, professorId, associateProfessorId];

  try {
    const result = await labService.createLab(createLabEntity);
    return result
      ? res
          .status(201)
          .json({ success: true, message: "정상적으로 생성되었습니다." })
      : res.status(400).json({ success: false, message: "생성 실패" });
  } catch (e) {
    console.log(`Routing error \n ${e}`);
  }
};

exports.getOneLab = async (req, res) => {
  const labId = req.params.labId;
  try {
    const result = await labProvider.getOneLab(labId);

    return result[0]
      ? res.status(200).send(result)
      : res
          .status(404)
          .json({ success: "fail", message: "해당 id에 Lab이 없습니다." });
  } catch (e) {}
  res.send(labId);
};

exports.updateLab = async (req, res) => {
  const labId = req.params.labId;
  const forCheck = await labProvider.getOneLab(labId);
  if (!forCheck[0]) {
    return res
      .status(400)
      .send("요청하신 id에 해당하는 Lab이 존재하지 않습니다.");
  }
  const { name, professorId, associateProfessorId } = req.body;
  const updateInfo = [name, professorId, associateProfessorId, labId];
  try {
    const result = await labService.updateLab(updateInfo);
    result
      ? res
          .status(200)
          .json({ success: true, message: "정상적으로 변경 되었습니다." })
      : res.send(400).send("입력 값이 잘못 되었습니다.");
  } catch (e) {
    console.log(e);
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

exports.test = async (req, res) => {
  const userId = req.userId;
  res.status(200).json({ userId: userId });
};

exports.test2 = () => {
  return 123;
};
