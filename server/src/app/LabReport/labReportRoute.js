module.exports = function(app) {
    const labReport = require('./labReportController');

    //1. 과제 목록 조회 API (교수)
    app.get('/app/lab/:labIdx/reports/:labNoticeIdx', labReport.calllabReportsLists);

    //2. 제출 상세 조회 API (교수 및 해당 학생)
    app.get('/app/lab/:labIdx/report/:labReportIdx', labReport.calllabReportContents);

    //3. 과제 제출 API
    app.post('/app/lab/report', labReport.createlabReport);

    //4. 과제 제출 수정 API
    app.patch('/app/lab/report/:labReportIdx', labReport.updatelabReport);

    //5. 과제 제출 삭제 API
    app.patch('/app/lab/report/delete/:labReportIdx', labReport.deletelabReport);

}