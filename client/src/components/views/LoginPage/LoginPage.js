import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import '../views.css';
import './LoginPage.css';
import MenuBar from '../../MenuBar/MenuBar';

function LoginPage(props) {

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
      LoginId: {LoginId},
      password: {Password}
    }
    // server 연결 시 userBody fetch. 현재는 state 확인 용으로 console log
    console.log(userBody);
    props.history.push('/');
  }

  return (
    <div id="wrap">
      <MenuBar/>
      <div id="content">
        <h1 id="ment">Sign in</h1>
        <div id="form-box">
          <form id="login-form" onSubmit={onSubmitHandler}>
            <div class="form-group">
              <label for="uid">ID</label>
              <input type="text" class="form-control" id="uid" name="uid" value={LoginId} onChange={onLoginIdHandler} required/>
            </div>
            <div class="form-group">
              <label for="pwd">Password</label>
              <input id="pwd" class="form-control" name="pwd" type="password" value={Password} onChange={onPasswordHandler} required/>
            </div>
            <button type="submit" id="login-btn" class="btn btn-primary">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginPage);
