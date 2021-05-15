import React,{useState,useEffect} from 'react';

import NavBar from './components/POS/NavBar';
import Dashboard from './components/POS/Dashboard';

const App=(props)=> {
  const [userLoggedIn,setUserLoggedIn]=useState(false);

  const handleAuth=()=>{
    setUserLoggedIn(!userLoggedIn);
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      handleAuth();
    }
  },[])
  return (
    <div >
      <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth}/>
      
    </div>
  );
}

export default App;
