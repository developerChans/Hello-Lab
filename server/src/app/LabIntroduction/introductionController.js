const introductionService = require("./introductionService");
const introductionProvider = require("./introductionProvider");

exports.getIntroduction = async (req, res) => {
  const labId = req.params.labId;
  try {
    const result = await introductionProvider.getIntroduction(labId);
    return res.send(result);
  } catch (e) {
    console.log(`Routing Error\n ${e}`);
  }
};

exports.postIntroduction = async (req, res) => {
  const labId = req.params.labId;
  const {content} = req.body
  const professorId = req.userId

  if(!content) {
    return res.status(400).json({
      success: false,
      message: "소개 내용(content)를 입력해주세요.",
    });
  }

  try {
    const result = await introductionService.postIntroduction(labId, content, professorId)
    return result
        ? res
            .status(201)
            .json({ success: true, message: "정상적으로 생성/수정되었습니다." })
        : res.status(400).json({ success: false, message: "생성/수정 실패" });
  }catch (e) {
    console.log(`Routing Error\n ${e}`);
  }
}

exports.deleteIntroduction = async (req, res) => {
  const labId = req.params.labId;
  const professorId = req.userId

  try {
    const result = await introductionService.deleteIntroduction(labId, professorId)
    return result
        ? res
            .status(201)
            .json({ success: true, message: "정상적으로 삭제되었습니다." })
        : res.status(400).json({ success: false, message: "삭제 실패" });
  }catch (e) {
    console.log(`Routing Error\n ${e}`);
  }
}