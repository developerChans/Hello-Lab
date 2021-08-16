import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import MenuBar from '../../MenuBar/MenuBar';
import {loginUser} from '../../../_actions/user_action'
import '../views.css';
import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.css';


function LoginPage(props) {

  const dispatch = useDispatch();

  const [LoginId, setLoginId] = useState("");
  const [Password, setPassword] = useState("");
  
  const onLoginIdHandler = (event) => {
    setLoginId(event.currentTarget.value);
  }
  
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) =>{
    event.preventDefault();

    let userBody = {
      id: LoginId,
      password: Password
    }
    // server 연결 시 userBody fetch. 현재는 state 확인 용으로 console log
    console.log(userBody);
    
    // dispatch(loginUser(userBody))
    // .then(response=>{
    //   if(response.payload.loginSuccess){
    //     props.history.push('/');
    //   }else{
    //     alert('login dispatch error');
    //   }
    // })

  }

  return (
    <div id="wrap">
      <MenuBar/>
      <div id="login-content">
        <h1 id="ment">Sign in</h1>
        <div id="form-box">
          <form id="login-form" onSubmit={onSubmitHandler}>
            <div id="id-group" className="form-group">
              <label for="uid">ID</label>
              <input type="text" className="form-control" id="uid" name="uid" value={LoginId} onChange={onLoginIdHandler} required/>
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
