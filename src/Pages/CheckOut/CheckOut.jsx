import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./checkout.css";
import useAuth from "./../../Componants/Hooks/useAuth";
import Pricing from "../../Componants/Pricing/Pricing";
import axios from "axios";
import { useRef } from "react";

const CheckOut = () => {
  const [orderId,setOrderId] = useState('')
  const { user, isLoading, cartItems } = useAuth();
  const [checkOutDAta, setCheckOutData] = useState({});
  const [placed,setPlaced]= useState(false)
  const nameRef = useRef()

  const handleOnChange = (e) => {
    const field = e.target.name; 
    const value = e.target.value;
    const allCheckOutData = { ...checkOutDAta };
    allCheckOutData[field] = value;
    setCheckOutData(allCheckOutData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let orderItem =[];
    cartItems.forEach((item) =>{
      let itm = {product:item._id,quantity:item.quantity,}
        orderItem.push(itm)
  });
    const datas = { ...checkOutDAta,orderItem, email: user.email,dispalyName:nameRef.current.value};
    setCheckOutData(datas);

    console.log('checking checkout data',datas)

    axios
      .post("https://e-commerce-server.vercel.app/order", checkOutDAta)
      .then((res) => {
        if (res.status === 201) {
          alert("Product Added SuccessFully!");
          setPlaced(true)
          setOrderId(res.data._id)
          localStorage.clear()
        } else {
          alert("Something Wrong!");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="checkout__container">
      <div className="form__wrapper">
        <form onSubmit={handleSubmit} className="checkout__form" action="#">
          <h3 className="text-center"> Getting Your Orders </h3>
          <div className="checkout__input-group">
            <label htmlFor="displayName">Your Name</label>
            <input
              required
              name="displayName"
              ref={nameRef}
              id="displayName"
              type="text"
              defaultValue={user?.dispalyName}
            />
          </div>
          <div className="checkout__input-group">
            <label htmlFor="email">Your Email</label>
            <input
            disabled
              value={user?.email}
              name="email"
              onChange={handleOnChange}
              id="email"
              type="email"
            />
          </div>
          <div className="checkout__input-group">
            <label htmlFor="phone">Enter Phone Number</label>
            <input
              required
              name="phone"
              onChange={handleOnChange}
              id="phone"
              type="text"
            />
          </div>
          <div className="checkout__input-group">
            <label htmlFor="district">Enter District</label>
            <input
              required
              name="district"
              onChange={handleOnChange}
              id="district"
              type="text"
            />
          </div>

          <div className="checkout__input-group">
            <label htmlFor="location">Enter Location</label>
            <input
              required
              name="location"
              onChange={handleOnChange}
              id="location"
            />
          </div>
          {placed&& <h4 className="mt-1 color-success text-center mb-1">Your Order has been placed!</h4>}

          <div className="buttons">
           {!placed&& <button type="submit" className="btn-primary">
              {isLoading ? " Wait..." : "Place Order"}
            </button>}
            {placed&&<Link to={`/payment/${orderId}`}><button type="submit" className="btn-primary">
              {isLoading ? " Wait..." : "Make Payment"}
            </button></Link>}
          </div>
        </form>
      </div>
      <div className="pricing__wrapper">
        <Pricing></Pricing>
      </div>
    </section>
  );
};

export default CheckOut;
