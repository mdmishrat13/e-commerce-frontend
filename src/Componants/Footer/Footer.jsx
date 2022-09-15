import React from 'react';
import './footer.css'
import{ Link }from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div className="container footer__container">
            <ul className="footer-items1 d-none">
                <li> <h4>CUSTOMER SERVICE</h4> </li>
                <li> <Link to="#">How To Shop On Grambangla</Link> </li>
                <li> <Link to="#">Cancellation, Return and Refund Policy</Link> </li>
                <li> <Link to="#">EMI Policy</Link> </li>
                <li> <Link to="#">Contact Us</Link> </li>
            </ul>
            <ul className="footer-items1">
                <li> <h4>ABOUT US</h4> </li>
                <li> <Link to="#">About Grambangla</Link> </li>
                <li> <Link to="#">Terms and Condition</Link> </li>
                <li> <Link to="#">Privacy Policy</Link> </li>
                <li> <Link to="#">Careers</Link> </li>
                <li> <Link to="#">Same Day Delivery TC</Link> </li>
            </ul>
            <ul className="footer-items1 d-none">
                <li> <h4>MY ACCOUN</h4> </li>
                <li> <Link to="#">My Account</Link> </li>
                <li> <Link to="#">Orders</Link> </li>
                <li> <Link to="#">Addresses</Link> </li>
                <li> <Link to="#">Grambangla Certified</Link> </li>
                <li> <Link to="#">Featured Recommendation</Link> </li>
            </ul>
            <ul className="footer-items1">
                <li> <h4>Call Now</h4> </li>
                <li> <Link to="#"><i className="uil uil-phone-volume"></i>+8801770777671</Link></li>
            </ul>
            </div>
        </footer>
    );
};

export default Footer;