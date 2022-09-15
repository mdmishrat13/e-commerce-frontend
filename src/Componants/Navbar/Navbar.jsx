import React, { useState } from "react";
import "./navbar.css";
import logo from "./../../Images/logo.jpeg";
import { Link } from "react-router-dom";
import useAuth from "./../Hooks/useAuth";
import useProductContext from "../Hooks/useProductContext";

const Navbar = () => {
  const {admin} = useProductContext()
  const { user, logout,cartItems} = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {handleSearchChange} = useProductContext(null)

  return (
    <nav>
      <div className="nav__main">
        <div className="container nav__main-container">
          <div className="nav__main-logo">
            <Link to='/'><img src={logo} alt="" /></Link>
          </div>
          {!admin&&<div className="nav__main-search">
            <input onChange={e=>handleSearchChange(e.target.value)} type="text" />
            <button>
              <i className="uil uil-search"></i>
            </button>
          </div>}
          <ul className="nav__main-menu-items">
            {!admin&&<li className="nav-phone"><i className="uil uil-phone-volume nav-phone-icon"></i><p> +8801770777671</p></li>}
            <li className={!isMenuOpen?"account__items":"account__items nav__item-selected"}>
              <i onClick={()=>setIsMenuOpen(!isMenuOpen)} className="uil uil-user-circle"></i>
              {isMenuOpen&&<ul className="account__item">
                {user?.email&& (
                  <li className='nav__name'> <h4> hey! <br/> {user.displayName}</h4> </li>
                ) }
                <li> <Link to='/myorders'>Your Orders</Link> </li>
                {admin&& <li><Link to='/dashboard'>Dashboard</Link></li>}
                <li> <Link to='/cart'>Your Cart</Link>  </li>
                <li> <Link to='#'>Payment Status</Link> </li>
                <li> <Link to='#'>Track Delevery</Link> </li>
                {user?.email?<li> <button onClick={logout} className='btn-nav'> Logout </button> </li>:( <div className="account__login-register">
                    <Link className='btn-nav' to="/login">Login </Link>
                    <Link className='btn-nav' to="/register">Register</Link>
                  </div>)}
              </ul>}
            </li>
            <li className="cart__options">
              <Link to='/cart'>
              <span className="cart__index">{cartItems?.length||0}</span>
                <i className="uil uil-shopping-cart-alt" >  </i></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
