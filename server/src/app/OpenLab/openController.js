const openProvider = require("./openProvider");
const openService = require("./openService");

exports.getOpenLabs = async (req, res) => {
  try {
    const search = req.query.search;
    const isRecruit = req.query.isRecruit;  // null:필터x, 1:모집 중
    const major = req.query.major;

    const result = await openProvider.getOpenLabs(search, isRecruit, major);
    return result
      ? res
          .status(201)
          .json({ success: true, result : {result}})
      : res.status(400).json({ success: false, message: "생성 실패" });
  } catch (e) {
    console.log(`Controller error \n ${e}`);
  }
};
