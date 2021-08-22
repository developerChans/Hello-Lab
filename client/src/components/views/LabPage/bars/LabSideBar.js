import logo from './logo.ico';
import imgPath from './default.png';
import {useRef, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './LabSideBar.css';
import { FaUserCircle } from "react-icons/fa";
import {IoIosApps, IoIosCalendar} from "react-icons/io";
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import LabMainPage from 'components/views/LabPage/main/_LabMainPage';
import LabResearchPage from 'components/views/LabPage/research/_LabResearchPage';
import {Route} from 'react-router-dom';

const profile = {img: imgPath};

const LabSideBar = (lab) => {

  console.log(lab);
  const dropdown = useRef();
  const [drop, setDrop] = useState(false);

  const mainLink =`/lab/${lab.id}/main`
  const researchLink =`/lab/${lab.id}/research`;

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
            <a className="nav-link" href={mainLink}>
            <IoIosApps className="labs-icon"/>
            </a>
          </li>          
          <li className="nav-item sidebar-item">
            <a className="nav-link" href={researchLink}>
              <HiOutlineDocumentSearch className="labs-icon"/>
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


      <Route path="/lab/:id/main" component={LabMainPage}/>
      <Route path="/lab/:id/research" component={LabResearchPage}/>

    </div>
  );
}

export default LabSideBar;
