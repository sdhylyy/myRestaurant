import React, { useState, useEffect } from "react";
import {Routes, Route} from 'react-router-dom'
import OwnerMenu from './pages/Menu/OwnerMenu'
import OwnerAccount from './pages/Account/OwnerAccount'
import UseCheckMsg from "./hooks/UseCheckMsg";
import { useNavigate } from "react-router-dom";

import OwnerNavbar from './components/Navbar/OwnerNavbar';
import Footer from './components/Footer/Footer'

function App() {
  const logoutURL = '/api/ownerLogout';
  const checkOwnerURL='/api/checkOwner';
  const navigate = useNavigate();
  UseCheckMsg();
  const [userName, setUserName] = useState();
  const checkOwnerFunc = () => {
    fetch(checkOwnerURL).then(
      (response) => {
        // console.log(response);
        if (response.redirected) {
          window.location.href = response.url;
        } else if (!response.ok) {
          throw new Error();
        } 
      }
    ).catch((error) => {
      console.error(error);
    })
  }
  useEffect(() => {
    checkOwnerFunc();
  }, []);

  const logout = () => {
    fetch(logoutURL).then(
      (res) => {
        if (res.ok) {
          navigate("/login");
        }
      }
    )
  }

  

  return (
    <div>
      <OwnerNavbar userName={userName} logout={logout}/>
      <Routes>
        <Route path="/menu" element={<OwnerMenu />} />
        <Route path="/" element={<OwnerAccount />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;