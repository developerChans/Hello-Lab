import React, {useState, useEffect} from "react";
import AppRouter from 'AppRouter';
import axios from 'axios'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [needMenubar, setNeedMenubar] = useState(false);

  useEffect(()=>{
    axios
    .get(`/app/users/students`)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
}, [])

  useEffect(()=>{
    if(!document.location.href.includes('lab')){
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
