<<<<<<< HEAD
import { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import '../views.css';

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
      <div className="header">
        <h1>
            <a href="/">
              <div className="logo"></div>
            </a>
            <span className="page">회원가입</span>
        </h1>
      </div>
      <div className="container">
        <form className="login-form" onSubmit={onSubmitHandler}>
          <div>
            <span>이름</span>
            <input value={Name} onChange={onNameHandler} required/>
          </div>
          <div>    
            <span>학과</span>
            <input value={Major} onChange={onMajorHandler} required/>
          </div>
          <div id="id-form">    
            <span>아이디</span>
            <input value={LoginId} onChange={onLoginIdHandler} required/>
            <button type="button" onClick={onConfirmDuplicate}>중복확인</button>
          </div>
          <div>
            <span>비밀번호</span>
            <input type="password" value={Password} onChange={onPasswordHandler} required/>       
          </div>
          <div>
            <span>비밀번호 확인</span>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} required/>       
          </div>
          <div>    
            <span>이메일</span>
            <input value={Email} onChange={onEmailHandler} required/>
          </div>
          <div>    
            <span>핸드폰 번호</span>
            <input value={PhoneNumber} onChange={onPhoneNumberHandler} required/>
          </div>
          <button type="submit">가입하기</button>
        </form>
      </div>
    </div>
  );
=======
import { useEffect } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';

function RegisterPage() {

  return <div>RegisterPage</div>;
>>>>>>> 52ded8f6f785539dafa16c51431d72dd6ca4fe4d
}

export default withRouter(RegisterPage);
