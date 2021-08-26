import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action'
import '../views.css';
import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios'


function LoginPage(props) {

  const dispatch = useDispatch();

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
  
    axios.post('/app/login/students', userBody)
    .then(response=>{
      console.log(response)
    })
    .catch(err=>console.log(err))
  }

  return (
    <div id="wrap">
      <div id="login-content">
        <h1 id="ment">Sign in</h1>
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
      </div>
    </div>
  );
}

export default withRouter(LoginPage);
