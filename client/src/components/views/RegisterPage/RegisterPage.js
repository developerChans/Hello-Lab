import { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import '../views.css';
import MenuBar from '../../MenuBar/MenuBar';
import 'bootstrap/dist/css/bootstrap.css';
import './RegisterPage.css'

function RegisterPage(props) {

  const [Name, setName] = useState("");
  const [LoginId, setLoginId] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Major, setMajor] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");


  const onLoginIdHandler = (event) => {
    setLoginId(event.currentTarget.value);
  }
  
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmDuplicate = (event) => {
    const isDuplicate = true;
    // 중복 확인 조건 맞췄을 때 (서버 연결)
    if(isDuplicate){
      const confirmDup = document.createElement("span");
      confirmDup.id="confirm-dup";
      confirmDup.innerText = "Good!";
      event.currentTarget.classList.add("hidden");
      const loginForm = document.querySelector("#id-form");
      loginForm.appendChild(confirmDup);
    } else{
      return alert("중복된 아이디입니다.");
    }
  };

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
  const onPhoneNumberHandler = (event) => {
    setPhoneNumber(event.currentTarget.value);
  }
  
  const onSubmitHandler = (event) =>{
    event.preventDefault();

    let userBody = {
      LoginId: {LoginId},
      Password: {Password},
      ConfirmPassword: {ConfirmPassword}
    }
    // server 연결 시 userBody fetch. 현재는 state 확인 용으로 console log
    console.log(userBody);

    if(Password !== ConfirmPassword){
      return alert("비밀번호를 확인해주세요.");
    }

    props.history.push('/');
  }

  return (
    <div className="wrap">
      <MenuBar/>
      <div id="register-content">
        <h1 id="ment">Join</h1>
        <div id="register-form-box">

        <form id="register-form" onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label for="name">이름</label>
            <input className="form-control" name="name" type="text" value={Name} onChange={onNameHandler} required/>
          </div>
          <div className="form-group">    
            <label for="major">학교</label>
            <input className="form-control" name="major" type="text" value={Major} onChange={onMajorHandler} required/>
          </div>
          <div className="form-group">    
            <label for="major">학과</label>
            <input className="form-control" name="major" type="text" value={Major} onChange={onMajorHandler} required/>
          </div>
          <div className="form-group" id="id-form">    
            <label for="uid">아이디</label>
            <input className="form-control" name="uid" type="text" 
            value={LoginId} onChange={onLoginIdHandler} required/>
            <button id="confirmBtn" className="btn" type="button" onClick={onConfirmDuplicate}>중복확인</button>
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
            <label for="email">이메일</label>
            <input className="form-control" name="email" type="text" value={Email} onChange={onEmailHandler} required/>
            <select id="email-select" name="email">
              <option value="naver">@naver.com</option>
              <option value="daum">@daum.net</option>
              <option value="gmail">@gmail.com</option>
              <option value="self">직접입력</option>
            </select>
          </div>
          <div className="form-group">    
            <label for="pnum">핸드폰 번호</label>
            <input className="form-control" name="pnum" maxlength='11' value={PhoneNumber} onChange={onPhoneNumberHandler} required/>
            <span>'-' 없이 입력</span>
          </div>
          <button id="join-btn" type="submit" className="btn btn-primary">Join</button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(RegisterPage);
