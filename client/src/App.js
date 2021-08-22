import React, {useState, useEffect} from "react";
import AppRouter from 'AppRouter';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [needMenubar, setNeedMenubar] = useState(false);

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
