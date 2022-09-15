import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import "./payment.css";
import useAuth from "./../../Componants/Hooks/useAuth";
import axios from "axios";
import OrderItem from "../../Componants/OrderItem/OrderItem";
import Bkash from './../../Images/bkash.png'
import Nagad from './../../Images/nagad.png'
import Surecash from './../../Images/surecash.png'
import Roket from './../../Images/rocket.jpg'

const Payment = () => {
  const [order,setOrder] = useState({})
  const [paymentMethod,setPaymentMethod] = useState('')
  const [error,setError] = useState('')

  
  const {_id,paymentStatus,shippingStatus,phone,email,location,district,orderItem,displayName}= order;

  let total = 0
    orderItem?.forEach(item=>{
      total= total+(item.product?.price*item.quantity)
    })
 
  const {isLoading} = useAuth();
  const [paymentData, setPaymentData] = useState({});
  const orderId = useParams();


  const fetchData = async()=>{
    const {data}= await axios(`https://e-commerce-server.vercel.app/order/pay/${orderId.id}`)
    setOrder(...data)
  }

  useEffect(() => {
    fetchData()
  }, []);


  const updateOrder = async (e) => {
    e.preventDefault()
    const orderUpdate = {...paymentData,paymentStatus:'PROCESSING',paymentMethod:paymentMethod};
    const { data } = await axios.patch(`https://e-commerce-server.vercel.app/order/${orderId.id}`, orderUpdate)
    .then(res=>{
      if(res.status===200){
        console.log(data)
        alert('updated successfully!')
      }
    })
    .catch(err=>{
      setError(err)
    })
    
    return data;
   }

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const allPaymentData = { ...paymentData };
    allPaymentData[field] = value;
    setPaymentData(allPaymentData);
  };
  return (
    <section className="payment__container">
      <div className="payment__page-ordered-data">
      <div className="orders__container">
        <div className="order__page-product-info">
        <h3>Order Id :{_id} </h3>
        <p className="mt-1">
            Payment Status:
            <span className="color-primary">{paymentStatus}</span>
          </p>
        
        <p>
          Shipping Status:
          <span className="color-primary">{shippingStatus} </span>
        </p>

        <div className="order__information-container">
          <div className="orders__items">
            {orderItem?.map((item) => (
              <OrderItem key={item._id} item={item}></OrderItem>
            ))}
          </div>
          <div className="payment__page-payer-info">
          <h4 className="mt-1">Name :{displayName}</h4>
          <p className="mt-1">Email : {email}</p>
          <p className="mt-1">Phone : {phone}</p>
          <p className="mt-1">District : {district}</p>
          <p className="mt-1 mb-1">Location : {location}</p>
    </div>
        </div>
        <div className="payment__status">
        <h4 className="mt-1 mb-1">Total amount: <span className="color-primary">{total} Tk</span></h4>
          
        </div>
        </div>
    </div>
    </div>
    <div className="payment__page-form">
        <form onSubmit={updateOrder} className="payment__form" >
          <div className="payment__form-input-container">
          <div className="form__right">
            <p className="color-primary mt-1 mb-1">Select A Payment Method</p>
            <ul className="payment__page-method">
              <li><input value='Bkash' onChange={e=>setPaymentMethod(e.target.value)} type="radio" name="payment-method" id="bkash"></input><label htmlFor="bkash"><img src={Bkash} alt="" /></label></li>
              <li><input value='Nagad' onChange={e=>setPaymentMethod(e.target.value)} type="radio" name="payment-method" id="nagad"></input><label htmlFor="nagad"><img src={Nagad} alt="" /></label></li>
              <li><input value='Sure Cash' onChange={e=>setPaymentMethod(e.target.value)} type="radio" name="payment-method" id="surecash"></input><label htmlFor="surecash"><img src={Surecash} alt="" /></label></li>
              <li><input value='Rocket' onChange={e=>setPaymentMethod(e.target.value)} type="radio" name="payment-method" id="rocket"></input><label htmlFor="rocket"><img src={Roket} alt="" /></label></li>
            </ul>
            <p className="mt-1 mb-1">Send Money to this Number: <b className="color-primary">01770-777671</b> </p>
            <p>And Fill the form to confirm the payment</p>
          </div>
          <div className="form__left">
          <div className="register__input-group">
            <label htmlFor="senderNumber">Enter Sender Number</label>
            <input
              name="senderNumber"
              onChange={handleOnChange}
              id="senderNumber"
              type="text"
              required
            />
          </div>
          <div className="register__input-group">
            <label htmlFor="trxId">Enter Transaction Id</label>
            <input
            required
              name="trxId"
              onChange={handleOnChange}
              id="trxId"
              type="text"
            />
          </div>
          </div>
          
          </div>
          <div className="buttons">
            <button type="submit" className="btn-primary">
              {" "}
              {isLoading ? " Wait..." : "Confirm Purchase"}{" "}
            </button>
            {error&&<p className="mt-1 mb-1 color-danger">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Payment;
