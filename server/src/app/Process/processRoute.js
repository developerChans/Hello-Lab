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

    //6. process content 등록 API
    app.post('/app/processes/contents', process.postProcessContent);

    //7. process Tag 등록 API
    app.post('/app/processes/tags', process.postProcessTag);

    //8. process 수정 API
    app.patch('/app/processes/patch/:processIdx', process.patchProcess);

    //9. process content 수정 API
    app.patch('/app/processes/contents/:processContentIdx', process.patchProcessContent);

    //10. process Tag 삭제 API
    app.delete('/app/processes/delete/tags/:processContentIdx', process.deleteProcessTag);

    //11. process 삭제 API
    app.patch('/app/processes/delete/process/:processIdx', process.deleteProcess);

    //12. process content 삭제 API
    app.patch('/app/processes/delete/content/:processContentIdx', process.deleteProcessContent);


    
}