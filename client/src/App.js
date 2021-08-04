import React from "react";

import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ExamplePage from './components/views/ExamplePage/ExamplePage';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import RecruitmentPage from './components/views/RecruitmentPage/RecruitmentPage';
import NoticePage from "./components/views/NoticePage/NoticePage";
import SearchPage from "./components/views/SearchPage/SearchPage";
import MyPage from "./components/views/MyPage/MyPage";
import LabPage from "./components/views/LabPage/LabPage";

function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/test" component={ExamplePage} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/recruitment" component={RecruitmentPage} />
          <Route exact path="/notice" component={NoticePage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/lab" component={LabPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
