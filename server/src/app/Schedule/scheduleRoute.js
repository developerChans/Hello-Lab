module.exports = function(app) {
    const schedule = require('./scheduleController');

    //1. 유저 스케줄 조회 API
    app.get('/app/schedules/lab/:labIdx', schedule.getSchedulesEachProfessor);

    //2. 교수 스케줄 조회 API
    app.get('/app/schedules/user/:userIdx', schedule.getSchedulesEachUser);

    //3. 교수 스케줄 등록 API
    app.post('/app/schedules/lab', schedule.createScheduleByProfessor);

    //4. 유저 스케줄 등록 API
    app.post('/app/schedules/user', schedule.createScheduleByUser);
    
    //5. 유저 일정 삭제 API
    app.patch('/app/schedules/delete/user/:userIdx', schedule.updateScheduleByProfessor);

    //6. 교수 일정 삭제 API
    app.patch('/app/schedules/delete/lab/:labIdx', schedule.updateScheduleByUser);

    //7. 교수 일정 수정 API 
    app.patch('/app/schedules/patch/lab/:labIdx', schedule.changeScheduleByProfessor);

    //8. 유저 일정 수정 API
    app.patch('/app/schedules/patch/user/:userIdx', schedule.changeScheduleByUser);
}

