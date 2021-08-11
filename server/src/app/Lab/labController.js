const labProvider = require("./labProvider");
const labService = require("./labService");

exports.postLabs = async function (req, res){
    const {name, associateProfessor} = req.body;

    if (!name) {
        return res.json({
          success: false,
          message:
            "이름을 입력하였는지 확인하세요.",
        });
    }

    if (!name.length > 20) {
        return res.json({
          success: false,
          message:
            "이름 길이를 확인하세요.(20자 이하)",
        });
    }

    
}