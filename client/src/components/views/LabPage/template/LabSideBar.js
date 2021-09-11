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
import {Route, useHistory} from 'react-router-dom';

import { connect } from 'react-redux';
import { actionCreators } from "_actions/lab_action";


const profile = {img: imgPath};

const LabSideBar = ({data, updateCategory, updateTab}) => {

  const dropdown = useRef();
  const [drop, setDrop] = useState(false);

  
  const onMainClick = async() =>{
    updateCategory("main");
    updateTab("info");
  }

  const onResearchClick = () =>{
    updateCategory("research");
    updateTab("outline");
  }

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
          <li type="button" className="main-link nav-item sidebar-item" onClick={onMainClick}>
            <div className="main-link nav-link">
              <IoIosApps className="main-link labs-icon"/>
            </div>
          </li>          
          <li type="button" name="research" className="research-link nav-item sidebar-item" onClick={onResearchClick}>
            <div className="research-link nav-link">
              <HiOutlineDocumentSearch className="research-link labs-icon"/>
            </div>
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
          <a className="dropdown-item" href="/">Sign out</a>
        </div>
      </nav>
    </div>
  );
}


const mapStateToProps = (state)=>{
  return { data: state }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    updateCategory: category=> dispatch(actionCreators.updateCategory(category)),
    updateTab: tab => dispatch(actionCreators.updateTab(tab))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabSideBar);

