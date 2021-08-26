import React, { useState } from 'react';
import axios from 'axios'

import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.css';

const LoginForm = ({auth}) =>{
    
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }
  
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) =>{
    event.preventDefault();

    let userBody = {
      email: Email,
      password: Password
    }
    // server 연결 시 userBody fetch. 현재는 state 확인 용으로 console log
    console.log(userBody);
  
    if(auth==="student"){
        axios.post('/app/login/students', userBody)
        .then(response=>{
        if(response.data.isSuccess){
            window.location.replace('/');
        }else{
            alert(response.data.message);
        }
        })
        .catch(err=>console.log(err))
    }else if(auth==="professor"){
        axios.post('/app/login/professors', userBody)
        .then(response=>{
        if(response.data.isSuccess){
            window.location.replace('/');
        }else{
            alert(response.data.message);
        }
        })
        .catch(err=>console.log(err))
    }
  }
    return (
    
        <div id="form-box">
        <form id="login-form" onSubmit={onSubmitHandler}>
            <div id="id-group" className="form-group">
            <label for="uid">이메일</label>
            <input type="email" className="form-control" id="uid" name="uid" value={Email} onChange={onEmailHandler} required/>
            </div>
            <div className="form-group">
            <label for="pwd">Password</label>
            <input id="pwd" className="form-control" name="pwd" type="password" value={Password} onChange={onPasswordHandler} required/>
            </div>
            <button type="submit" id="login-btn" className="btn btn-primary">Sign in</button>
        </form>
        </div>
    );
}

export default LoginForm;