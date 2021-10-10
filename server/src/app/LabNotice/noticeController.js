const noticeService = require("./noticeService");
const noticeProvider = require("./noticeProvider");

exports.createNotice = async (req, res) => {
  const { title, content } = req.body;
  const labId = req.params.labId;
  const userId = req.userId;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "제목(title)과 내용(content)는 필수 값 입니다.",
    });
  }

  const createNoticeEntity = [title, content, labId, userId];

  try {
    const result = await noticeService.createNotice(createNoticeEntity);
    return result
      ? res.json({ success: true, message: "생성 성공" })
      : res.json({ success: false, message: "생성 실패" });
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
  }
};

exports.getAllNotice = async (req, res) => {
  const labId = req.params.labId;
  try {
    const result = await noticeProvider.getAllNotice(labId);
    return res.send(result);
  } catch (e) {
    console.log(`Routing Error\n ${e}`);
  }
};

exports.getOneNotice = async (req, res) => {
  const labId = req.params.labId;
  const noticeId = req.params.noticeId;
  try {
    const result = await noticeProvider.getOneNotice(labId, noticeId);
    return result[0]
      ? res.status(200).send(result[0])
      : res.status(400).json({
          success: false,
          message: "해당 noticeId를 가진 공지가 존재하지 않습니다.",
        });
  } catch (e) {
    console.log(`Routing Error\n ${e}`);
    res.send("error");
  }
};

exports.updateNotice = async (req, res) => {
  const labId = req.params.labId;
  const noticeId = req.params.noticeId;
  const existCheck = await noticeProvider.getOneNotice(labId, noticeId);
  if (!existCheck[0]) {
    return res.status(400).json({
      success: false,
      message: "해당 noticeId를 가진 공지가 존재하지 않습니다.",
    });
  }

  const { title, content } = req.body;
  const updateNoticeEntity = [title, content];
  try {
    const result = await noticeService.updateNotice(
      updateNoticeEntity,
      noticeId
    );
    return result
      ? res
          .status(201)
          .json({ success: true, message: "성공적으로 변경 되었습니다." })
      : res.send(400).status("변경 실패");
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
  }
};

exports.deleteNotice = async (req, res) => {
  const labId = req.params.labId;
  const noticeId = req.params.noticeId;

  const deleteNoticeInfo = [labId, noticeId];

  try {
    const result = await noticeService.deleteNotice(deleteNoticeInfo);
    return result
      ? res
          .status(200)
          .json({ success: true, message: "성공적으로 삭제 되었습니다." })
      : res.status(400).json({
          success: false,
          message:
            "삭제에 실패하였습니다. 요청하신 noticeId에 해당하는 공지가 없습니다.",
        });
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
    res.status(500).json({ success: false, message: "서버오류" });
  }
};

exports.createComment = async (req, res) => {
  const noticeId = req.params.noticeId;
  const content = req.body.content;
  const userId = req.userId;

  if (!content) {
    res.status(400).json({
      success: false,
      message: "댓글 내용(content)는 필수 값 입니다. ",
    });
  }

  const createCommentInfo = [noticeId, content, userId];
  try {
    const result = await noticeService.createComment(createCommentInfo);
    result
      ? res.status(201).json({ success: true, message: "댓글 생성 성공" })
      : res.status(400).json({
          success: false,
          message: "noticeId에 해당하는 공지가 없습니다.",
        });
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
    return res.status(500);
  }
};

exports.getComment = async (req, res) => {
  const noticeId = req.params.noticeId;

  try {
    const result = await noticeProvider.getComment(noticeId);
    console.log(result);
    return res.status(200).send(result);
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
    return res.status(500).json(`${JSON.stringify(e)}`);
  }
};

exports.updateComment = async (req, res) => {
  const noticeId = req.params.noticeId;
  const commentId = req.params.commentId;
  const content = req.body.content;
  const userId = req.userId;
  if (!content) {
    res.status(400).json({
      success: false,
      message: "댓글 내용(content)는 필수 값 입니다.",
    });
  }

  const updateCommentInfo = [content, noticeId, commentId];
  try {
    const result = await noticeService.updateComment(updateCommentInfo, userId);
    if (result === "No User") {
      return res
        .status(404)
        .json({ success: false, message: "작성자만 수정 가능합니다." });
    }
    return result
      ? res
          .status(201)
          .json({ success: true, message: "성공적으로 변경 되었습니다." })
      : res.status(400).json({
          success: false,
          message: "commentId에 해당하는 댓글이 없습니다.",
        });
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
    res.status(500);
  }
};

exports.deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.userId;
  try {
    const result = await noticeService.deleteComment(commentId, userId);
    if (result === "No User") {
      return res
        .status(404)
        .json({ success: false, message: "작성자만 삭제 가능합니다." });
    }
    return result
      ? res
          .status(200)
          .json({ success: true, message: "성공적으로 삭제 되었습니다." })
      : res.status(400).json({
          success: false,
          message: "commentId에 해당하는 댓글이 없습니다.",
        });
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
    res.status(500).json("서버 에러 발생");
  }
};

exports.createReply = async (req, res) => {
  const noticeId = req.params.noticeId;
  const commentId = req.params.commentId;
  const content = req.body.content;
  const userId = req.userId;

  if (!content) {
    res.status(400).json({
      success: false,
      message: "대댓글 내용 (content)는 필수 값 입니다.",
    });
  }

  const createReplyInfo = [content, commentId, noticeId, userId];
  try {
    const result = await noticeService.createReply(createReplyInfo);
    if (result === undefined) {
      throw Error("최상단 오류를 확인하세요");
    }
    return result
      ? res.status(201).json({ success: true, message: "대댓글 생성 성공" })
      : res.status(400).json({ success: false, message: "대댓글 생성 실패" });
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
    res.status(500).json("서버 에러 발생");
  }
};

exports.getReply = async (req, res) => {
  const commentId = req.params.commentId;

  try {
    const result = await noticeProvider.getReply(commentId);
    if (result === undefined) {
      throw Error("최상단 오류를 확인하세요");
    }
    return result[0]
      ? res.status(200).send(result)
      : res.status(400).json({
          success: false,
          message: "해당 댓글에는 대댓글이 존재하지 않습니다.",
        });
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
    res.status(500).json({ success: false, message: "서버 에러 발생" });
  }
};
