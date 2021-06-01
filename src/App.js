import React,{useState,useEffect} from 'react';

import NavBar from './components/POS/NavBar';
import SideBar from './components/POS/SideBar/components/SideBar';

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

  console.log(userLoggedIn);
  return (
    <div >
      
      {userLoggedIn ? <SideBar handleAuth={handleAuth} userLoggedIn={userLoggedIn} />:<NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth}/>}
    </div>
  );
}

export default App;
