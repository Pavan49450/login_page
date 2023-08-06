import React from "react"
import {useState , useEffect } from "react"

const AuthContext = React.createContext({
    isLoggedIn : false,
    onLogout:()=>{},
    onLogin:()=>{}
    });

export const AuthContextProvider = (props) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(()=>{
    const storageValue = localStorage.getItem('isLoggedIn');
    if(storageValue === '1'){
        setIsLoggedIn(true);
    }
},[])
  const loginHandler = (email, password) => {
    // We should of course check email and password
    console.log("email->",email,"password->",password)
    localStorage.setItem('isLoggedIn','1');
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider value={{
    isLoggedIn:isLoggedIn,
    onLogin:loginHandler,
    onLogout:logoutHandler
  }}>{props.children}
  </AuthContext.Provider>
}
export default AuthContext;