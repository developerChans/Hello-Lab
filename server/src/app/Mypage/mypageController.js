const myPageProvider = require("./mypageProvider");

exports.getStudentLab = async (req, res) => {
  const userId = req.userId;
  try {
    const result = await myPageProvider.getStudentLab(userId);
    if (result === undefined) {
      throw Error("최상단 에러를 확인하세요");
    }
    return res.status(200).send(result);
  } catch (e) {
    console.log(`Routing Error \n ${e}`);
    return res.status(500).json({ success: false, message: "서버 에러 발생" });
  }
};
