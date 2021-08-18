import { useEffect, useState } from "react";
import axios from "axios";
import { withRouter, useLocation } from "react-router-dom";
import "../views.css";
import LabTemplate from "./LabTemplate";

function LabPage() {

  const location = useLocation();
  if(location.id){
    localStorage.setItem('labId', location.id);
  }

  const [lab, setLab] = useState({
    name: "",
    prof: ""
  })

  useEffect(() => {
    const storedId = window.localStorage.getItem('labId');
    axios
      .get(`/app/lab/${storedId}`)
      .then((response) => {
        const {name, professorId} = response.data[0]
        setLab({name: name, prof: professorId});
      });
    
  }, []);
  

  return (
    <div>
      <LabTemplate {...lab} />
    </div>
  );
}

export default withRouter(LabPage);
