const noticeService = require("./noticeService");
const noticeProvider = require("./noticeProvider");

exports.createNotice = async (req, res) => {
  const { title, content } = req.body;
  const labId = req.params.labId;
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "제목(title)과 내용(content)는 필수 값 입니다.",
    });
  }

  const createNoticeEntity = [title, content, labId];

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
