import logo from './logo.ico';
import imgPath from './default.png';
import {useRef, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './LabSideBar.css';
import { FaUserCircle } from "react-icons/fa";
import {IoIosApps, IoIosCalendar} from "react-icons/io";
const profile = {img: imgPath};

const LabSideBar = () => {

  
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

  return (
    <div>
      <nav id="sidebar" className="navbar navbar-expand bg-white flex-column navbar-light">
        <a className="navbar-brand" href="/">
          <img src={logo} id="sidebar-logo"/>
        </a>

        <ul id="sidebar-ul" className="navbar-nav nav-pills nav-flush flex-column mb-auto text-center">
          <li className="nav-item sidebar-item">
            <a className="nav-link" href="#">
            <IoIosApps className="labs-icon"/>
            </a>
          </li>
          <li className="nav-item sidebar-item">
            <a className="nav-link" href="#">
              <IoIosCalendar className="labs-icon"/>
            </a>
          </li>
        </ul>
        <FaUserCircle type="button" id="profile_icon" onClick={profileClick}/>
        <div id="side-dropdown" ref={dropdown} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="/mypage">Dashboard</a>
          <a className="dropdown-item" href="#">Something else</a>
          <a className="dropdown-item" href="/home">Sign out</a>
        </div>
      </nav>

    </div>
  );
}

export default LabSideBar;
