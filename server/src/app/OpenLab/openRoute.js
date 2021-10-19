const { studentAuth } = require("../../middleware/studentAuth");
const { professorAuth } = require("../../middleware/professorAuth");

module.exports = function (app) {
  const controller = require("./openController");

  // openLab 조회 API
  app.get("/app/open-lab", controller.getOpenLabs);

};
