import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LabInfo from "screen/LabInfoPage/LabInfo";

const LabRouter = ({lab}) => {
    return (
      <Router>
        <Switch>
          <Route exact path="/lab/info">
              <LabInfo lab={lab}/>
          </Route>
        </Switch>
      </Router>
    );
  };
  
  export default LabRouter;
  