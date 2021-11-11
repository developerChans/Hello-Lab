import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "screen/LoginPage/LoginPage";
import RegisterPage from "screen/RegisterPage/RegisterPage";
import MyPage from "screen/MyPage/MyPage";
import OpenlabPage from "screen/OpenlabPage/OpenlabPage";
import LabTemplate from 'screen/LabTemplate/LabTemplate'

import OpenlabDetailPage from "screen/OpenlabDetailPage/OpenlabDetailPage";
import MenuBar from "screen/MenuBar/MenuBar";
import ApplyPage from "screen/ApplyPage/ApplyPage";

import {useState, useEffect} from 'react'
import axios from 'axios'
const AppRouter = ({ isLoggedIn, needMenubar }) => {
  const [lab, setLab] = useState()
  useEffect(()=>{
    axios.get('/app/mypage')
    .then(response=>{
        console.log(response)
        if(response.data[0]){
            const {id, name, pname} = response.data[0];
            setLab({
                id, name, pname
            })
        }
    })
}, [])
  return (
    <Router>
      {needMenubar && lab ? <MenuBar lab={lab} isLoggedIn={isLoggedIn} /> : <></>}
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
          <LabTemplate lab={lab}/>
        </Route>
        <Route path="/open/detail">
          <OpenlabDetailPage />
        </Route>
        <Route path="/apply">
          {lab && <ApplyPage lab={lab}/>}
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
