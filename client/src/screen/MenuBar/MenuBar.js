import logo from 'screen/hellolab.png';
import {BiLinkExternal} from 'react-icons/bi';

import './MenuBar.css';
import 'bootstrap/dist/css/bootstrap.css';
import ProfileBtn from 'screen/MenuBar/ProfileBtn'
import SignBtn from 'screen/MenuBar/SignBtn';
// auth에 따라 보이기 안보이기 구현
import {useEffect} from 'react'
import axios from 'axios'

import {connect} from 'react-redux'

const user_univ = "https://www.dankook.ac.kr/web/kor";

const MenuBar = ({isLoggedIn, lab}) => {
  console.log(lab)
  const RISS_URL = "http://www.riss.kr/index.do";
  const lab_link = `/lab/${lab.id}/info`

  return (
    <div id="menu">
      <nav id="menubar" className="navbar navbar-expand bg-white navbar-light">
        <a className="navbar-brand" href="/">
          <img src={logo} id="logo"/>
        </a>

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/open">Open Lab</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={lab_link}>My Lab</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" target='_blank' href={user_univ}>
              Univ.
            <BiLinkExternal className="link-icon"/>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" target='_blank' href={RISS_URL}>
              RISS
            <BiLinkExternal className="link-icon" />
            </a>
          </li>
        </ul>

        {isLoggedIn ? <ProfileBtn/>:<SignBtn/>}

      </nav>
    </div>
      
  );
}

const mapStateToProps = (state)=>{
  return {data: state};
}
export default connect(mapStateToProps)(MenuBar);