import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/restaurant-logo.png";

import "./Navbar.css";

import Clock from "../Clock/Clock";

const OwnerNavbar = (props) => {
    const [click, setClick] = useState(false);
    const [color, setColor] = useState(false);

    const changeColor = () => {
        if (window.scrollY >= 100) {
            setColor(true);
        } else {
            setColor(false);
        }
    };

    window.addEventListener("scroll", changeColor);

    const handleClick = () => {
        setClick(!click);
    };

    const logout=()=>{
        props.logout();
    }

    return (
        <div className={color ? "header header-bg" : "header"}>
            <div className="container">
                <div className="nav-bar">
                    <Link to="/">
                        <img src={logo} alt="logo" width={50} />
                    </Link>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li>
                            <Clock />
                        </li>
                        <li onClick={handleClick}>
                            <NavLink className="nav-link" to="/owner/menu">
                                Menu
                            </NavLink>
                        </li>
                        <li onClick={handleClick} >
                            <NavLink className="nav-link" to="/owner/">
                                Orders
                            </NavLink>
                        </li>
                        <li onClick={logout}>
                            <button className="nav-link transpanrent">
                                logout
                            </button>
                        </li>

                    </ul>
                    <div className="hamburger" onClick={handleClick}>
                        {click ? (
                            <FaTimes size={20} style={{ color: "#fff" }} />
                        ) : (
                            <FaBars size={20} style={{ color: "#fff" }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerNavbar;
