import { useRef, useState } from "react";
import imgPath from "screen/MenuBar/user.png";

import "./MenuBar.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Cookies } from "react-cookie";

const profile = { img: imgPath };

const cookies = new Cookies();
const ProfileBtn = () => {
  const dropdown = useRef();
  const [drop, setDrop] = useState(false);

  const profileClick = () => {
    if (dropdown.current) {
      if (!drop) {
        dropdown.current.classList.add("show");
        setDrop(true);
      } else {
        dropdown.current.classList.remove("show");
        setDrop(false);
      }
    }
  };

  const onSignoutClick = () => {
    cookies.set("access", "", { maxAge: 0, secure: true });
    cookies.set("userId", "", { maxAge: 0, secure: true });
  };

  return (
    <div id="dropdown-profile">
      <button
        id="profile_button"
        className="border border-white rounded-circle"
        onClick={profileClick}
      >
        <img id="profile_img" src={profile.img} />
      </button>
      <div
        ref={dropdown}
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton"
      >
        <a className="dropdown-item" href="/mypage">
          Dashboard
        </a>
        <a className="dropdown-item" href="/home">
          Another action
        </a>
        <a className="dropdown-item" href="/" onClick={onSignoutClick}>
          Sign out
        </a>
      </div>
    </div>
  );
};
export default ProfileBtn;
