import { useEffect, useState } from "react";
import axios from "axios";
import { Route, useLocation, useHistory } from "react-router-dom";
import "../views.css";
import LabTemplate from 'pages/LabPage/LabTemplate';
import LabMainPage from "pages/LabPage/main/_LabMainPage";
import LabResearchPage from "pages/LabPage/research/_LabResearchPage";
import LabCalendar from "pages/LabPage/LabCalendar";
import { connect } from "react-redux";



function LabPage({data}) {
  const history = useHistory();
  const [job, setJob] = useState();

  const {lab: {
    id, category, tab
  }} = data;
  
  useEffect(()=>{
    axios.get('/app/users/auth')
    .then(response=>{
      const {data:{job}} = response
      setJob(job)
    })
  }, [])

  useEffect(()=>{
    history.push({
      pathname: `/lab/${id}/${category}/${tab}`
    })
  }, [data])

  return (
    <div>
      <LabTemplate data={data}/>
      <Route path="/lab/:id/main"><LabMainPage data={data} job={job}/></Route>
      <Route path="/lab/:id/research"><LabResearchPage data={data} job={job}/></Route>
      <Route path="/lab/:id/calendar"><LabCalendar data={data} job={job}/></Route>
    </div>
  );
}

const mapStateToProps = (state)=>{
  return {data: state};
}

export default connect(mapStateToProps)(LabPage);

