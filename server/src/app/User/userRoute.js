module.exports = function(app){
const user = require("./userController");
const LoginAuth = require("../../../config/logintAuth");

//app.post('/app/users/students', user.postStudents);
app.get('/app/users/students', user.getStudents);

app.get("/test", user.test);

};