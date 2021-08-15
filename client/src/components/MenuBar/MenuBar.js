import logo from '../../components/views/hellolab.png';
import imgPath from '../../components/views/default.png';
import './MenuBar.css';
import {useRef, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { withRouter } from 'react-router-dom';
import {BiLinkExternal} from 'react-icons/bi';

// auth에 따라 보이기 안보이기 구현

const profile = {img: imgPath};
const user_univ = "https://www.dankook.ac.kr/web/kor";

const MenuBar = (props) => {

  const RISS_URL = "http://www.riss.kr/index.do";
  
  const dropdown = useRef();
  const [drop, setDrop] = useState(false);

  const profileClick = () =>{
    if(dropdown.current){
      if(!drop){
        dropdown.current.classList.add("show");
        setDrop(true);
      }else{
        dropdown.current.classList.remove("show");
        setDrop(false);
      }
    }
  }

  const onSigninBtnClick = ()=>{
    props.history.push('/login');
  }
  const onJoinBtnClick = () =>{
    props.history.push('/register');
  }
  return (
    <div id="menu">
      <nav id="menubar" className="navbar navbar-expand bg-white navbar-light">
        <a className="navbar-brand" href="/">
          <img src={logo} id="logo"/>
        </a>

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/openlab">Open Lab</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/recruitment">Connect</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={user_univ}>
              Univ.
            <BiLinkExternal className="link-icon"/>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={RISS_URL}>
              RISS
            <BiLinkExternal  className="link-icon" />
            </a>
          </li>
        </ul>

        <div id="dropdown-profile">
          <button id="profile_button" className="border border-white rounded-circle"
          onClick={profileClick}>
            <img id="profile_img" src={profile.img}/>
          </button>
          <div ref={dropdown} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="/mypage">Dashboard</a>
            <a className="dropdown-item" href="/home">Another action</a>
            <a className="dropdown-item" href="/">Sign out</a>
          </div>
        </div>

        <span id="other-page">
          <span id="sign-in" onClick={onSigninBtnClick} type="button">
            Sign in
          </span>
          <span id="join" onClick={onJoinBtnClick} type="button">
            Join
          </span>
        </span>

      </nav>
    </div>
      
  );
}

export default withRouter(MenuBar);
