import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LabInfo from "screen/LabInfoPage/LabInfo";
import LabQnaPage from "screen/LabQnaPage/LabQnaPage";

const LabRouter = ({lab}) => {
    return (
      <Router>
        <Switch>
          <Route exact path="/lab/:id">
            <LabInfo lab={lab}/>
          </Route>
          <Route exact path="/lab/:id/info">
            <LabInfo lab={lab}/>
          </Route>
          <Route exact path="/lab/:id/ask">
            <LabQnaPage lab={lab}/>
          </Route>
        </Switch>
      </Router>
    );
  };
  
  export default LabRouter;
  