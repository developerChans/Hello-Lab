module.exports = function(app){
const user = require("./userController");
const LoginAuth = require("../../../config/logintAuth");

//학생 회원가입
app.post('/app/users/students', user.postStudents);
//학생 정보 get
app.get('/app/users/students', user.getStudents);

//교수 회원가입
app.post('/app/users/professors', user.postProfessors);

//교수 정보 get
app.get('/app/users/professors', user.getProfessors);
};