import React, { useState } from "react";

import { Link, NavLink } from "react-router-dom";

import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/restaurant-logo.png";

import "./Navbar.css";

import Clock from "../Clock/Clock";

const Navbar = (props) => {
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
                            <NavLink className="nav-link" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li onClick={handleClick}>
                            <NavLink className="nav-link" to="/menu">
                                Menu
                            </NavLink>
                        </li>
                        {props.userName ? (
                            <li onClick={handleClick}>
                                <NavLink className="nav-link" to="/account">
                                    {props.userName}
                                </NavLink>
                            </li>
                        ) : (
                            <li onClick={handleClick}>
                                <NavLink className="nav-link" to="/login">
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Navbar;
