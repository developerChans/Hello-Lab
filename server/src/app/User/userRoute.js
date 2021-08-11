module.exports = function(app){
const user = require("./userController");
const LoginAuth = require("../../../config/logintAuth");

//학생 회원가입
app.post('/app/users/students', user.postStudents);
//학생 정보 get
app.get('/app/users/students', user.getStudents);

app.get("/test", user.test);

};