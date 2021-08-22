module.exports = function (app) {
  const controller = require("./noticeController");

  //해당 연구실 공지사항 생성 api
  app.post("/app/lab/:labId/notices", controller.createNotice);

  //해당 연구실 공지사항 가져오는 api
  app.get("/app/lab/:labId/notices", controller.getAllNotice);

  //공지사항중 하나 가져오는 api
  app.get("/app/lab/:labId/notices/:noticeId", controller.getOneNotice);

  //공지사항 수정 api
  app.patch("/app/lab/:labId/notices/:noticeId", controller.updateNotice);

  //공지사항 삭제 api
  app.delete("/app/lab/:labId/notices/:noticeId", controller.deleteNotice);
};
