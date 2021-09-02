import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from 'components/views/LandingPage/LandingPage';
import LoginPage from 'components/views/LoginPage/LoginPage';
import RegisterPage from 'components/views/RegisterPage/RegisterPage';
import RecruitmentPage from 'components/views/RecruitmentPage/RecruitmentPage';
import MyPage from "components/views/MyPage/MyPage";
import LabPage from "components/views/LabPage/LabPage";
import OpenlabPage from "components/views/OpenlabPage/OpenlabPage";

import MenuBar from "components/MenuBar/MenuBar";
import ExamplePage from "components/views/ExamplePage/ExamplePage";

const AppRouter = ({isLoggedIn, needMenubar}) =>{

    return(
    <Router>
        {needMenubar ? <MenuBar isLoggedIn={isLoggedIn}/>:<></>}
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/open" component={OpenlabPage} />
          <Route exact path="/recruitment" component={RecruitmentPage} />
          <Route exact path="/login">{isLoggedIn ? <LandingPage/>:<LoginPage/>}</Route>
          <Route exact path="/register">{isLoggedIn ? <LandingPage/>:<RegisterPage/>}</Route>
          <Route exact path="/mypage">{isLoggedIn ? <MyPage/>:<LoginPage/>}</Route>
          <Route path="/lab" component={LabPage} />
          <Route exact path="/example"><ExamplePage/></Route>
        </Switch>
    </Router>
    );
}

export default AppRouter;