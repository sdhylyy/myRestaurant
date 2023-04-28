import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import QRcode from "../../assets/qrcode.png";

const Footer = () => {
    return (
        <div className="section footer">
            <div className="container">
                <div className="grid-container">
                    <div>
                        <img className="footer-qrcode" src={QRcode}/>
                    </div>
                    <div className="footer-grid-item footer-address">
                        <h3>Charlie Huang</h3>
                        <p>123 Main Street</p>
                        <p>San Francisco, CA 94102</p>
                        <p> (415) 555-1234</p>
                        <Link to="#" className="text-white">
                            charliehuang@gmail.com
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
