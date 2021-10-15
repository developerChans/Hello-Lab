const researchService = require("./researchService");
const researchProvider = require("./researchProvider");

exports.getOutline = async (req, res) => {
  const labId = req.params.labId;
  const researchId = req.params.researchId

  try {
    const result = await researchProvider.getOutline(labId, researchId);
    return res.send(result);
  } catch (e) {
    console.log(`Routing Error\n ${e}`);
  }
};

// 개요 생성/수정
exports.postOutline = async (req, res) => {
  const labId = req.params.labId;
  const researchId = req.params.researchId;
  const professorId = req.userId;
  const {content} = req.body

  if(!content) {
    return res.status(400).json({
      success: false,
      message: "개요 내용(content)를 입력해주세요.",
    });
  }

  try {
    const result = await researchService.postIntroduction(professorId, labId, researchId, content)
    return result
        ? res
            .status(201)
            .json({ success: true, message: "정상적으로 생성/수정되었습니다." })
        : res.status(400).json({ success: false, message: "생성/수정 실패" });
  }catch (e) {
    console.log(`Routing Error\n ${e}`);
  }
}

exports.deleteOutline = async (req, res) => {
  const labId = req.params.labId;
  const researchId = req.params.researchId;
  const professorId = req.userId;

  try {
    const result = await researchService.deleteOutline(professorId, labId, researchId);
    return result
        ? res
            .status(201)
            .json({ success: true, message: "정상적으로 삭제되었습니다." })
        : res.status(400).json({ success: false, message: "삭제 실패" });
  }catch (e) {
    console.log(`Routing Error\n ${e}`);
  }
}

//연구 멤버 조회
exports.getResearchMembers = async (req, res) => {
  const labId = req.params.labId;
  const researchId = req.params.researchId;

  try {
    const result = await researchProvider.getResearchMembers(labId, researchId);
    return res.send(result);
  } catch (e) {
    console.log(`Routing Error\n ${e}`);
  }
};
