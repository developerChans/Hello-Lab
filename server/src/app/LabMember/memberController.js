const memberService = require("./memberService");
const memberProvider = require("./memberProvider");

exports.getAllMember = async (req, res) => {
  const labId = req.params.labId;
  try {
    const result = await memberProvider.getAllMember(labId);
    return res.send(result);
  } catch (e) {
    console.log(`Routing Error\n ${e}`);
  }
};