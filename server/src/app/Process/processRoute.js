module.exports = function(app) {
    const process = require('./processController');

    //1. 프로세스 조회 API 
    app.get('/app/processes/:labIdx', process.getProcessList);
}