import React, {useState, useEffect} from "react";
import AppRouter from 'AppRouter';
import {useLocation} from 'react-router-dom';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLabPage, setIsLabPage] = useState(false);

  useEffect(()=>{
    if(isLoggedIn && document.location.href.includes('lab')){
      setIsLabPage(true);
    }else{
      setIsLabPage(false);
    } 
  }, [])

  return (
    <AppRouter isLoggedIn={isLoggedIn} isLabPage={isLabPage}/>
  );
}

export default App;
