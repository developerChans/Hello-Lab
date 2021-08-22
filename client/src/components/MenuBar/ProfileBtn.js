import {useRef, useState} from 'react';
import imgPath from '../views/default.png';

import './MenuBar.css';
import 'bootstrap/dist/css/bootstrap.css';

const profile = {img: imgPath};

const ProfileBtn = () =>{
    
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
    );
}
export default ProfileBtn;