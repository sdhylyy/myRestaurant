import React, { useState, useEffect } from "react";
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Menu from './pages/Menu/Menu'
import Login from './pages/Login/Login'
import Account from './pages/Account/Account';
import RegisterPage from './pages/Register/RegisterPage' 
// import { Outlet  } from "react-router-dom";
import UseCheckMsg from "./hooks/UseCheckMsg";
import { useNavigate } from "react-router-dom";

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  const logoutURL = '/api/logout';
  const navigate = useNavigate();
  UseCheckMsg();
  const [userName, setUserName] = useState();
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const setUserNameFunc = (name) => {
    document.cookie = `username=${name}`;
    setUserName(name);
    return;
  }

  useEffect(() => {
    setUserName(getCookie("username"));
  }, []);

  const deleteCookie = (name) => {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  const logout = () => {
    fetch(logoutURL).then(
      (res) => {
          if (res.ok) {
            // console.log(res);
            deleteCookie("username");
            setUserName(null);
            navigate("/login");
          }
      }
  )

    return;
  }

  

  return (
    <div>
      <Navbar userName={userName} />
      {/* <Outlet logout={logout}/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu logout={logout}/>} />
        <Route path="/login" element={<Login setUserName={setUserNameFunc}/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<Account logout={logout}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
