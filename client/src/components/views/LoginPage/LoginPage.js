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
    <div className="wrap">
      <MenuBar/>
      <div className="header">
        <h1>
            <a href="/">
              <div className="logo"></div>
            </a>
            <span className="page">Login</span>
        </h1>
      </div>
      <div className="container">
        <form className="login-form" onSubmit={onSubmitHandler}>
          <span>아이디</span>
          <input placeholder="아이디" value={LoginId} onChange={onLoginIdHandler} required/>
          <br />
          <span>비밀번호</span>
          <input type="password" placeholder="비밀번호" value={Password} onChange={onPasswordHandler} required/>
          <br />
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(LoginPage);