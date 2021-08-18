import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from 'components/views/LandingPage/LandingPage';
import LoginPage from 'components/views/LoginPage/LoginPage';
import RegisterPage from 'components/views/RegisterPage/RegisterPage';
import RecruitmentPage from 'components/views/RecruitmentPage/RecruitmentPage';
import MyPage from "components/views/MyPage/MyPage";
import LabPage from "components/views/LabPage/LabPage";
import LabAsk from "components/views/LabPage/tabs/LabAsk";
import LabCal from "components/views/LabPage/tabs/LabCal";
import LabInfo from "components/views/LabPage/tabs/LabInfo";
import LabNotice from "components/views/LabPage/tabs/LabNotice";
import LabProject from "components/views/LabPage/tabs/LabProject";
import LabSession from "components/views/LabPage/tabs/LabSession";
import OpenlabPage from "components/views/OpenlabPage/OpenlabPage";

import MenuBar from "components/MenuBar/MenuBar";

const AppRouter = ({isLoggedIn, isLabPage}) =>{
    
    return(
    <Router>
        {isLabPage ? <></>:<MenuBar isLoggedIn={isLoggedIn}/>}
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/open" component={OpenlabPage} />
          <Route exact path="/login">{isLoggedIn ? <LandingPage/>:<LoginPage/>}</Route>
          <Route exact path="/register">{isLoggedIn ? <LandingPage/>:<RegisterPage/>}</Route>
          <Route exact path="/recruitment" component={RecruitmentPage} />
          <Route exact path="/mypage">{isLoggedIn ? <MyPage/>:<LoginPage/>}</Route>
          <Route exact path="/lab/:id" component={LabPage} />
          <Route exact path="/lab/:id/info" component={LabInfo} />
          <Route exact path="/lab/:id/notice" component={LabNotice} />
          <Route exact path="/lab/:id/calendar" component={LabCal} />
          <Route exact path="/lab/:id/project" component={LabProject} />
          <Route exact path="/lab/:id/session" component={LabSession} />
          <Route exact path="/lab/:id/ask" component={LabAsk} />
        </Switch>
    </Router>
    );
}

export default AppRouter;