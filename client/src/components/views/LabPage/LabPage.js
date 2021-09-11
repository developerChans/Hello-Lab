import { useEffect, useState } from "react";
import axios from "axios";
import { Route, useLocation, useHistory } from "react-router-dom";
import "../views.css";
import LabTemplate from 'components/views/LabPage/LabTemplate';
import LabMainPage from "components/views/LabPage/main/_LabMainPage";
import LabResearchPage from "components/views/LabPage/research/_LabResearchPage";
import { connect } from "react-redux";


function LabPage({data}) {
  const history = useHistory();
  const [isProfessor, setIsProfessor] = useState();

  const {lab: {
    id, category, tab
  }} = data;
  
  useEffect(()=>{
    axios.get('/app/users/auth')
    .then(response=>{
      const {data:{job}} = response
      if(job){
        setIsProfessor(true)
      }else{
        setIsProfessor(false)
      }
    })
  }, [])

  useEffect(()=>{
    history.push({
      pathname: `/lab/${id}/${category}/${tab}`
    })
  }, [data])

  return (
    <div>
      <LabTemplate />
      <Route path="/lab/:id/main"><LabMainPage data={data} isProfessor={isProfessor}/></Route>
      <Route path="/lab/:id/research"><LabResearchPage data={data} isProfessor={isProfessor}/></Route>
    </div>
  );
}

const mapStateToProps = (state)=>{
  return {data: state};
}

export default connect(mapStateToProps)(LabPage);

