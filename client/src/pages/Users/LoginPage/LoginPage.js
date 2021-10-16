import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action'
import '../../views.css';
import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.css';


import LoginForm from './LoginForm'

function LoginPage(props) {
  
  return (
    <div id="wrap">
      <div id="login-content">
        <h1 id="ment">Sign in</h1>
        <LoginForm/>
      </div>
    </div>
  );
}

export default withRouter(LoginPage);
