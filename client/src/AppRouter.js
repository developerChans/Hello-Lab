import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "screen/LoginPage/LoginPage";
import RegisterPage from "screen/RegisterPage/RegisterPage";
import MyPage from "screen/MyPage/MyPage";
import OpenlabPage from "screen/OpenlabPage/OpenlabPage";
import LabTemplate from 'screen/LabTemplate/LabTemplate'

import OpenlabDetailPage from "screen/OpenlabDetailPage/OpenlabDetailPage";
import MenuBar from "pages/Bars/MenuBar/MenuBar";
import ApplyPage from "screen/ApplyPage/ApplyPage";

const AppRouter = ({ isLoggedIn, needMenubar }) => {
  return (
    <Router>
      {needMenubar ? <MenuBar isLoggedIn={isLoggedIn} /> : <></>}
      <Switch>
        <Route exact path="/apply" component={ApplyPage} />
        <Route exact path="/" component={OpenlabPage} />
        <Route exact path="/open" component={OpenlabPage} />
        <Route exact path="/login">
          {isLoggedIn ? <OpenlabPage /> : <LoginPage />}
        </Route>
        <Route exact path="/register">
          {isLoggedIn ? <OpenlabPage /> : <RegisterPage />}
        </Route>
        <Route exact path="/mypage">
          {isLoggedIn ? <MyPage /> : <LoginPage />}
        </Route>
        <Route path="/lab">
          <LabTemplate />
        </Route>
        <Route exact path="/openlabdetail">
          <OpenlabDetailPage />{" "}
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
