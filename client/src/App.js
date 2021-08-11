<<<<<<< HEAD
import React from "react";

=======
<<<<<<< HEAD
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandigPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import ExamplePage from './components/views/ExamplePage/ExamplePage';

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
        <Route exact path="/" component={LandingPage} />

        <Route exact path="/login" component={LoginPage} />

        <Route exact path="/example" component={ExamplePage} />

      </Switch>
    </div>
  </Router>
);
=======
import React from "react";

import './App.css';
>>>>>>> 52ded8f6f785539dafa16c51431d72dd6ca4fe4d
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ExamplePage from './components/views/ExamplePage/ExamplePage';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import RecruitmentPage from './components/views/RecruitmentPage/RecruitmentPage';
import NoticePage from "./components/views/NoticePage/NoticePage";
import SearchPage from "./components/views/SearchPage/SearchPage";
import MyPage from "./components/views/MyPage/MyPage";
<<<<<<< HEAD
import LabPage from "./components/views/LabPage/LabPage";
import MenuBar from "./components/views/MenuBar/MenuBar";

function App() {

=======

function App() {
>>>>>>> 52ded8f6f785539dafa16c51431d72dd6ca4fe4d
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
<<<<<<< HEAD
        <MenuBar/>
=======
>>>>>>> 52ded8f6f785539dafa16c51431d72dd6ca4fe4d
        <Switch>
          <Route exact path="/test" component={ExamplePage} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/recruitment" component={RecruitmentPage} />
          <Route exact path="/notice" component={NoticePage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/mypage" component={MyPage} />
<<<<<<< HEAD
          <Route exact path="/lab" component={LabPage} />
=======
>>>>>>> 52ded8f6f785539dafa16c51431d72dd6ca4fe4d
        </Switch>
      </div>
    </Router>
  );
<<<<<<< HEAD
=======
>>>>>>> b25a0c3dc5a583bdfc707ffa32689896e94be7fa
>>>>>>> 52ded8f6f785539dafa16c51431d72dd6ca4fe4d
}

export default App;
