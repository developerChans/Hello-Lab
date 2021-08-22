import { useEffect, useState } from "react";
import axios from "axios";
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
    </div>
  );
}

const mapStateToProps = (state)=>{
  return {data: state};
}

export default connect(mapStateToProps)(LabPage);

