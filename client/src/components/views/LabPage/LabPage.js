import { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { withRouter, useLocation } from "react-router-dom";
import "../views.css";
import LabTemplate from 'components/views/LabPage/LabTemplate';


function LabPage() {

  const location = useLocation();
  if(location.id){
    localStorage.setItem('labId', location.id);
  }

  const [lab, setLab] = useState({
    name: "",
    prof: "",
    id: null
  })

  useEffect(() => {
    const storedId = window.localStorage.getItem('labId');
    axios
      .get(`/app/lab/${storedId}`)
      .then((response) => {
        const {name, professorId} = response.data[0]
        setLab({name: name, prof: professorId, id:professorId});
      });
    
  }, []);
  

  return (
    <div>
      <LabTemplate {...lab} />
=======
import { Route, useLocation, useHistory } from "react-router-dom";
import "../views.css";
import LabTemplate from 'components/views/LabPage/LabTemplate';
import LabMainPage from "components/views/LabPage/main/_LabMainPage";
import LabResearchPage from "components/views/LabPage/research/_LabResearchPage";
import { connect } from "react-redux";
function LabPage({data}) {

  return (
    <div>
      <LabTemplate {...data.lab} />
      <Route path="/lab/:id/main" component={LabMainPage}/>
      <Route path="/lab/:id/research" component={LabResearchPage}/>
>>>>>>> 8d7c647e1275af5aeae5aef7b4ea3fb3139a4819
    </div>
  );
}

const mapStateToProps = (state)=>{
  return {data: state};
}

export default connect(mapStateToProps)(LabPage);

