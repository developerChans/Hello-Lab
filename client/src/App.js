import React, {useState, useEffect} from "react";
import AppRouter from 'AppRouter';
import axios from 'axios'
import 'screen/app.css'
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [needMenubar, setNeedMenubar] = useState(false);

  useEffect(()=>{
    axios.get('/app/users/auth')
    .then(response=>{
      const {data:{isAuth}} = response
      if(isAuth) {
        setIsLoggedIn(true)
      } else{
        setIsLoggedIn(false)
      }
    })
  }, [])

  useEffect(()=>{
    if(!document.location.href.includes('/lab/')){
      setNeedMenubar(true);
    }else{
      setNeedMenubar(false);
    }
  }, [document.location])

  return (
    <AppRouter isLoggedIn={isLoggedIn} needMenubar={needMenubar}/>
  );
}

export default App;
