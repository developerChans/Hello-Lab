import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'screen/RegisterPage/styles/RegisterPage.css'


const RegisterForm = ()=>{


  const [Name, setName] = useState("");
  const [UserNum, setUserNum] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Major, setMajor] = useState("");
  const [PhoneNum, setPhoneNum] = useState("");
  const [Job, setJob] = useState();

  const onUserNumHandler = (event) => {
    setUserNum(event.currentTarget.value);
  }
  
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }
  const onMajorHandler = (event) => {
    setMajor(event.currentTarget.value);
  }
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }
  const onPhoneNumHandler = (event) => {
    setPhoneNum(event.currentTarget.value);
  }

  const onUserHandler = (event) =>{
    setJob(parseInt(event.target.value));
  }
  
  const onSubmitHandler = (event) =>{
    event.preventDefault();

    let userBody = {
      email: Email,
      name: Name,
      userNum: UserNum,
      major: Major,
      phoneNumber:PhoneNum,
      password: Password,
      job: Job
    }
    // server 연결 시 userBody fetch. 현재는 state 확인 용으로 console log

    if(Password !== ConfirmPassword){
      return alert("비밀번호를 확인해주세요.");
    }
    
    axios.post('/app/users', {...userBody})
    .then(response=>{ 
    console.log(response)
    if(!response.data.isSuccess) {
        alert(response.data.message) 
    }else{
        window.location.replace("/")
    }})
    .catch(error=>{
    console.log(error)})
    }

  
    return (
        <div id="register-form-box">

        <form id="register-form" onSubmit={onSubmitHandler}>
          <div className="form-group">    
            <label for="job">사용자</label>
            <div class="form-check">
              <label class="form-check-label">
                <input type="radio" className="form-check-input" onChange={onUserHandler} value={0} name="optradio"/>학생
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input type="radio" className="form-check-input" onChange={onUserHandler} value={1} name="optradio"/>교수
              </label>
            </div>
          </div>
          <div className="form-group">
            <label for="name">이름</label>
            <input className="form-control" name="name" type="text" value={Name} onChange={onNameHandler} required/>
          </div>
          <div className="form-group">    
            <label for="email">이메일</label>
            <input className="form-control" name="email" type="email" value={Email} onChange={onEmailHandler} required/>
          </div>
          <div className="form-group">
            <label for="pwd">비밀번호</label>
            <input className="form-control" name="pwd" type="password" 
            value={Password} onChange={onPasswordHandler} required/>       
          </div>
          <div className="form-group">
            <label for="pconfirm">비밀번호 확인</label>
            <input className="form-control" name="pconfirm" type="password" 
            value={ConfirmPassword} onChange={onConfirmPasswordHandler} required/>       
          </div>
          <div className="form-group">    
            <label for="major">학과</label>
            <input className="form-control" name="major" type="text" value={Major} onChange={onMajorHandler} required/>
          </div>
          <div className="form-group" id="id-form">    
            <label for="uid">학번</label>
            <input className="form-control" name="uid" type="text" 
            value={UserNum} onChange={onUserNumHandler} required/>
          </div>
          <div className="form-group">    
            <label for="pnum">핸드폰 번호</label>
            <input className="form-control" name="pnum" maxlength='11' value={PhoneNum} onChange={onPhoneNumHandler} required/>
            <span>'-' 없이 입력</span>
          </div>

          <div>
          </div>
          <button id="join-btn" type="submit" className="btn btn-primary">Join</button>
        </form>
        </div>
    );
}
export default RegisterForm;