import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReportPage from "screen/ReportPage/ReportPage";
import ProcessPage from "screen/ProcessPage/ProcessPage";
const ResearchRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/lab/:id/research/:rid/process">
          <ProcessPage />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/lab/:id/research/:rid/report">
          <ReportPage />
        </Route>
      </Switch>
    </Router>
  );
};
export default ResearchRouter;
