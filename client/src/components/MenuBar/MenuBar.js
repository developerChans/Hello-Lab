import logo from '../../components/views/hellolab.png';
import imgPath from '../../components/views/default.png';
import './MenuBar.css';
import {useRef, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const profile = {img: imgPath};

const MenuBar = () => {

  useEffect(()=>{
    
    if(!document.location.href.includes('lab')){
      const menu = document.querySelector("#menu");
      menu.classList.remove("hidden");
    }
  }, []);
  
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
    <div id="menu" className="hidden">
      <nav className="navbar navbar-expand bg-white navbar-light">
        <a className="navbar-brand" href="/">
          <img src={logo} id="logo"/>
        </a>

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">Open Lab</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">메뉴2</a>
          </li>
        </ul>
        <button id="profile_button" className="border border-white rounded-circle"
        onClick={profileClick}>
          <img id="profile_img" src={profile.img}/>
        </button>
        <div ref={dropdown} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="/mypage">Dashboard</a>
          <a className="dropdown-item" href="/home">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </nav>

    </div>
  );
}

export default MenuBar;
