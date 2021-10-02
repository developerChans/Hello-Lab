module.exports = function(app) {
    const process = require('./processController');

    //1. 프로세스 조회 API 
    app.get('/app/processes/:labIdx', process.getProcessList);

    //2. 프로세스 컨텐트 및 참조 조회(완료기준) API
    app.get('/app/processes/completed/:processIdx', process.getCompletedProcess);

    //3. 프로세스 컨텐트 및 참조 조회(진행기준) API
    app.get('/app/processes/onGoing/:processIdx', process.getOnGoingdProcess);

    //4. 프로세스 컨텐트 및 참조 조회(미래기준) API
    app.get('/app/processes/expected/:processIdx', process.getExpectedProcess);

    //5. 프로세스 등록 API
    app.post('/app/processes', process.postProcess);


    
}