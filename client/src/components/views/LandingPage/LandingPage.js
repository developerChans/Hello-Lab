import { useEffect } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import '../views.css';
import './LandingPage.css';
import MenuBar from "../../MenuBar/MenuBar";

function LandingPage(props) {

  return (
    <div className="wrap">
      <MenuBar/>
   
    </div>
  );
}

export default withRouter(LandingPage);
