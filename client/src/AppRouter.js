import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from 'components/views/LandingPage/LandingPage';
import LoginPage from 'pages/Users/LoginPage/LoginPage';
import RegisterPage from 'pages/Users/RegisterPage/RegisterPage';
import RecruitmentPage from 'components/views/RecruitmentPage/RecruitmentPage';
import MyPage from "pages/Users/MyPage/MyPage";
import LabPage from "pages/LabPage/LabPage";
import OpenlabPage from "pages/OpenlabPage/OpenlabPage";

import MenuBar from "pages/Bars/MenuBar/MenuBar";
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
          <Route path="/lab"><LabPage/></Route>
          <Route exact path="/example"><ExamplePage/></Route>
        </Switch>
    </Router>
    );
}

export default AppRouter;