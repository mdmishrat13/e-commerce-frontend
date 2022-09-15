import React from "react";
import {NavLink, Outlet } from "react-router-dom";
import './dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard__page">
      <div className="dashboard__container">
        <div className="dashboard__left">
          <div className="dashboard__left-items">
            <ul>
              <li> <NavLink to=''>Pay-Requiests</NavLink> </li>
              <li> <NavLink to='unpaid-orders'> Unpaid Orders </NavLink></li>
              <li> <NavLink to='paid-orders'> Paid Orders </NavLink></li>
              <li> <NavLink to='all-products'>All Products</NavLink> </li>
              <li> <NavLink to='add-product'>Add Product</NavLink> </li>
              <li><NavLink to='all-admins'>All Admins</NavLink></li>
            </ul>
          </div>
        </div>
        <div className="dashboard__right">
          <div className="dashboard__right-pages">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
