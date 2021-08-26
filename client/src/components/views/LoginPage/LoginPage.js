import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action'
import '../views.css';
import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.css';


import LoginForm from './LoginForm'

function LoginPage(props) {
  
  const [auth, setAuth] = useState(null)

  useEffect(()=>{
    setAuth(null)
  }, [])
  const onStudentClick = ()=>{
    setAuth('student');
  }

  const onProfessorClick = () =>{
    setAuth('professor');
  }

  return (
    <div id="wrap">
      <div id="login-content">
        <h1 id="ment">Sign in</h1>
      {!auth && <>
      <button id="auth-btn" onClick={onStudentClick}>학생 로그인</button>
      <button id="auth-btn" onClick={onProfessorClick}>교수 로그인</button>
      </>}
      {auth && <LoginForm auth={auth}/>}
    </div>
    </div>
  );
}

export default withRouter(LoginPage);
