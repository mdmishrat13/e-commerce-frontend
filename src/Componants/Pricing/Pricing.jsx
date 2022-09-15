import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import "./pricing.css";

const Pricing = ({page}) => {
    const {cartItems} = useAuth()

    let totalAmount =0
    cartItems.forEach((value)=>{ totalAmount += value.price*value.quantity; });


  return (
    <div className="cart__page-pricing">
      <h4 className="text-center">Total</h4>
      <div className="cart__page-pricing-container">
        <div className="cart__page-subtotal">
          <p>Subtotal </p>
          <p> {totalAmount} Tk</p>
        </div>
        <div className="cart__page-subtotal">
          <p>Delivery</p>
          <p> 0 Tk</p>
        </div>
        <div className="cart__page-subtotal">
          <p>Discount</p>
          <p> 0 Tk</p>
        </div>
        <div className="cart__page-subtotal cart__total">
          <p>Total</p>
          <p> {totalAmount} Tk </p>
        </div>
      </div>
     {page==='CARTPAGE'&& <div className="cart__page-checkout-btn">
   {totalAmount>0&&<Link to='/checkout'><button className="btn-white text-center">Continue Checkout</button></Link>}
      </div>}
    </div>
  );
};

export default Pricing;
