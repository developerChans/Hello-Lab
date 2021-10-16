import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from 'pages/Users/LoginPage/LoginPage';
import RegisterPage from 'pages/Users/RegisterPage/RegisterPage';
import MyPage from "pages/Users/MyPage/MyPage";
import LabPage from "pages/LabPage/LabPage";
import OpenlabPage from "pages/OpenlabPage/OpenlabPage";

import MenuBar from "pages/Bars/MenuBar/MenuBar";

const AppRouter = ({isLoggedIn, needMenubar}) =>{

    return(
    <Router>
        {needMenubar ? <MenuBar isLoggedIn={isLoggedIn}/>:<></>}
        <Switch>
          <Route exact path="/" component={OpenlabPage} />
          <Route exact path="/open" component={OpenlabPage} />
          <Route exact path="/login">{isLoggedIn ? <OpenlabPage/>:<LoginPage/>}</Route>
          <Route exact path="/register">{isLoggedIn ? <OpenlabPage/>:<RegisterPage/>}</Route>
          <Route exact path="/mypage">{isLoggedIn ? <MyPage/>:<LoginPage/>}</Route>
          <Route path="/lab"><LabPage/></Route>
        </Switch>
    </Router>
    );
}

export default AppRouter;