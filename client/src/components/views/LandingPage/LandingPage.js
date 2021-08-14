import { useEffect } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import '../views.css';
import './LandingPage.css';
import MenuBar from "../../MenuBar/MenuBar";

function LandingPage(props) {

  const onLoginHandler = () => {
    props.history.push('/login')
  }

  const onRegisterHandler = () => {
    props.history.push('/register')
  }
 
  const onMypageHandler = () => {
    props.history.push('/mypage')
  }
 
  const onNoticeHandler = () =>{
    props.history.push('/notice')
  }

  const onRecruitmentHandler = () =>{
    props.history.push('/recruitment')
  }
  
  const onSearchHandler = (event) =>{
    event.preventDefault();
    props.history.push('/search')
  }

  return (
    <div className="wrap">
      <MenuBar/>
      <div className="header">
        <h1>
            <a href="/">
              <div className="logo"></div>
            </a>
            <span className="page"></span>
        </h1>
        <button onClick={onLoginHandler}>로그인</button>
        <button onClick={onRegisterHandler}>회원가입</button>
        <button onClick={onMypageHandler}>마이페이지</button>
        <div>
          <h3>공지사항</h3>
          <button onClick={onNoticeHandler}>+</button>
        </div>
        <div>
          <h3>연구생 모집</h3>
          <button onClick={onRecruitmentHandler}>+</button>
        </div>
        <form onSubmit={onSearchHandler}>
          <label>통합검색</label>
          <input type="text" />
          <button type="submit">검색</button>
        </form>
      </div>
      <div>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);
