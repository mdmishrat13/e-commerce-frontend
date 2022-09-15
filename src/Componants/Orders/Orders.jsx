import React from "react";
import { Link } from "react-router-dom";
import OrderItem from "../OrderItem/OrderItem";
import "./orders.css";

const Orders = ({ order }) => {
     
    const { _id, paymentStatus, shippingStatus, orderItem } = order;

    let total = 0
      orderItem?.forEach(item=> total= total+(item?.product?.price*item.quantity))
   
  return (
    <div className="orders__page">
      <div className="orders__container">
        <h3>Order Id : {_id} </h3>
        <p className="mt-1">
            Payment Status:
            <span className="color-primary"> {paymentStatus}</span>
          </p>
        
        <p>
          Shipping Status:
          <span className="color-primary"> {shippingStatus} </span>
        </p>

        <div className="order__information-container">
          <div className="orders__items">
            {orderItem?.map((item) => (
              <OrderItem key={item._id} item={item}></OrderItem>
            ))}
          </div>
        </div>
        <div className="payment__status">
        <h4>Total amount: {total} Tk</h4>
          {paymentStatus === "UNPAID" && (
            <Link to={`/payment/${_id}`}>
            <button className="btn-primary">Pay Now</button>
            </Link>
          )}
          {paymentStatus === "PROCESSING" && (
            <h4 className="paid-text">Payment Processing</h4>
          )}
          {paymentStatus === "PAID" && (
            <h4 className="paid-text">Payment Succeed</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
