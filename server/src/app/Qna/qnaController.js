const service = require("./qnaService");
const provider = require("./qnaProvider");

exports.createQna = async (req, res) => {
  const labId = req.params.labId;
  const userId = req.userId;
  const content = req.body.content;

  if (!content) {
    return res.status(400).json({
      success: false,
      message: "본문 내용(content)는 필수 값 입니다.",
    });
  }
  const createQnaInfo = [content, userId, labId];
  try {
    const result = await service.createQna(createQnaInfo);
    errorCheck(result);
    return result
      ? res.status(201).json({ success: true })
      : res.status(400).json({ success: false });
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
    return res.status(500).send("서버 에러 발생");
  }
};

exports.getQna = async (req, res) => {
  const labId = req.params.labId;

  try {
    const result = await provider.getQna(labId);
    errorCheck(result);
    return res.status(200).send(result);
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
    return res.status(500).send("서버 에러 발생");
  }
};

exports.updateQna = async (req, res) => {
  const labId = req.params.labId;
  const qnaId = req.params.qnaId;
  const content = req.body.content;
  if (!content) {
    return res
      .status(400)
      .json({ message: "본문 내용(content)은 필수 값 입니다." });
  }
  const updateQnaInfo = [content, qnaId, labId];
  try {
    const result = await service.updateQna(updateQnaInfo);
    errorCheck(result);
    return result
      ? res.status(201).json({ success: true })
      : res.status(400).json({
          success: false,
          message: "labId or qnaId를 다시 한번 확인하세요",
        });
  } catch (e) {
    console.log(`Rotuing Error \n ${e}`);
    return res.status(500).send("서버 오류 발셍");
  }
};

// 삭제 권한 생각
// 작성자만 삭제 -> userAuth 건후 req.userId로 확인으로 구현 가능
exports.deleteQna = async (req, res) => {
  const labId = req.params.labId;
  const qnaId = req.params.qnaId;
  const deleteInfo = [qnaId, labId];

  try {
    const result = await service.deleteQna(deleteInfo);
    errorCheck(result);
    return result
      ? res.status(200).json({ success: true })
      : res.status(400).json({
          success: false,
          message: "labId or qnaId를 다시 한번 확인하세요",
        });
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
    return res.status(500).send("서버 에러 발생");
  }
};

// 없는 qnaId 요청시 처리 수정 필요
exports.createQnaReply = async (req, res) => {
  const userId = req.userId;
  const labId = req.params.labId;
  const qnaId = req.params.qnaId;
  const content = req.body.content;

  if (!content) {
    return res.status(400).json({
      success: false,
      message: "본문 내용(content)는 필수 값 입니다.",
    });
  }

  const createQnaReplyInfo = [content, userId, qnaId, labId];
  try {
    const result = await service.createQnaReply(createQnaReplyInfo);
    errorCheck(result);
    return result
      ? res.status(201).json({ success: true, message: "대댓글 생성 성공" })
      : res.status(400).json({ success: false });
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
    res.status(500).send("서버 에러 발생");
  }
};

// 없는 qnaId 요청시 처리 방법 생각
exports.getQnaReply = async (req, res) => {
  const labId = req.params.labId;
  const qnaId = req.params.qnaId;
  const getQnaReplyInfo = [qnaId, labId];
  console.log(getQnaReplyInfo);
  try {
    const result = await provider.getQnaReply(getQnaReplyInfo);
    errorCheck(result);
    return result
      ? res.status(200).send(result)
      : res.status(400).json({ success: false });
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
    return res.status(500).send("서버 에러 발생");
  }
};

const errorCheck = (result) => {
  if (result === undefined) {
    throw Error("최상단 에러 확인");
  }
};
