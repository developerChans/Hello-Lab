import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from 'components/views/LandingPage/LandingPage';
import LoginPage from 'components/views/LoginPage/LoginPage';
import RegisterPage from 'components/views/RegisterPage/RegisterPage';
import RecruitmentPage from 'components/views/RecruitmentPage/RecruitmentPage';
import MyPage from "components/views/MyPage/MyPage";
import LabPage from "components/views/LabPage/LabPage";
<<<<<<< HEAD
import LabMainPage from "components/views/LabPage/main/_LabMainPage";
import LabResearchPage from "components/views/LabPage/research/_LabResearchPage";
=======
>>>>>>> 8d7c647e1275af5aeae5aef7b4ea3fb3139a4819
import OpenlabPage from "components/views/OpenlabPage/OpenlabPage";

import MenuBar from "components/MenuBar/MenuBar";

const AppRouter = ({isLoggedIn, needMenubar}) =>{

    return(
    <Router>
<<<<<<< HEAD
        {needMenubar?<MenuBar isLoggedIn={isLoggedIn}/>:<></>}
=======
        {needMenubar ? <MenuBar isLoggedIn={isLoggedIn}/>:<></>}
>>>>>>> 8d7c647e1275af5aeae5aef7b4ea3fb3139a4819
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/open" component={OpenlabPage} />
          <Route exact path="/recruitment" component={RecruitmentPage} />
          <Route exact path="/login">{isLoggedIn ? <LandingPage/>:<LoginPage/>}</Route>
          <Route exact path="/register">{isLoggedIn ? <LandingPage/>:<RegisterPage/>}</Route>
          <Route exact path="/mypage">{isLoggedIn ? <MyPage/>:<LoginPage/>}</Route>
          <Route path="/lab/:id" component={LabPage} />
        </Switch>
    </Router>
    );
}

export default AppRouter;