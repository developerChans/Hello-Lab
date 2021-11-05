
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LabCalendarPage from "screen/LabCalendarPage/LabCalendarPage";
import LabInfo from "screen/LabInfoPage/LabInfo";
import LabQnaPage from "screen/LabQnaPage/LabQnaPage";
import ResearchTemplate from "screen/ResearchTemplate/ResearchTemplate";

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
          <Route path="/lab/:id/calendar">
            <LabCalendarPage lab={lab}/>
          </Route>
          <Route path="/lab/:id/research/:rid">
            <ResearchTemplate lab={lab}/>
          </Route>
        </Switch>
      </Router>
    );
  };
  
  export default LabRouter;
  