import { useEffect } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';


function LandingPage(props) {

  const onLoginHandler = () => {
    props.history.push('/login')
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
    <div>
      <h1>DK. Lab</h1>
      <div>
        <button onClick={onLoginHandler}>로그인</button>
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
    </div>
  );
}

export default withRouter(LandingPage);
