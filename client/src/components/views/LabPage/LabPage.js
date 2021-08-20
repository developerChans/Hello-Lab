import { useEffect, useState } from "react";
import axios from "axios";
import { Route, useLocation, useHistory } from "react-router-dom";
import "../views.css";
import LabTemplate from 'components/views/LabPage/LabTemplate';
import LabMainPage from "components/views/LabPage/main/_LabMainPage";
import LabResearchPage from "components/views/LabPage/research/_LabResearchPage";
import { connect } from "react-redux";
import { actionCreators } from "components/LabStore";
import { useBeforeunload } from 'react-beforeunload';


function LabPage({currentLab, replacePage}) {


  // const history = useHistory();
  // useEffect(()=>{
  //   const { state: {id, category} } = location;
  //   history.push({
  //     pathname: `/lab/${id}/${category}`,
  //     state:{
  //       id,
  //       category
  //     }
  //   })
  // }, [])


  return (
    <div>
      <LabTemplate {...currentLab} />
      <Route path="/lab/:id/main" component={LabMainPage}/>
      <Route path="/lab/:id/research" component={LabResearchPage}/>
    </div>
  );
}

const mapStateToProps = (state)=>{
  return {currentLab: state};
}

export default connect(mapStateToProps)(LabPage);

