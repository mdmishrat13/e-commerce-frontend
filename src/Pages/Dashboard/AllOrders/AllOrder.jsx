import axios from "axios";
import React from "react";
import OrderItem from "../../../Componants/OrderItem/OrderItem";
import "./AllOrders.css";

const Order = ({ order }) => {
    
    const { _id,paymentMethod, paymentStatus, shippingStatus, orderItem,displayName,email,phone,district,location,senderNumber ,trxId} = order;

    let total = 0
      orderItem.forEach(item=> total= total+(item?.product?.price*item?.quantity))


      const updateOrder = async (e,status) => {
        e.preventDefault()
        const orderUpdate = {paymentStatus:status};
        const { data } = await axios.patch(`https://e-commerce-server.vercel.app/order/${_id}`, orderUpdate);
        if(data){
          console.log(data)
          alert('updated successfully!')
        }
        return data;
       }

       const deleteOrder = async()=>{
        const sure = window.confirm('Are You Sure?')
        if(sure){
          await axios.delete(`https://e-commerce-server.vercel.app/order/${_id}`)
        .then(res=>{
          if(res.status===200){
            alert('Deleted Successfully!')
          }
        })
        }
       }
    
   
  return (
    <div>
      <div className="orders__container">
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
          <p className="mt-1 mb-1">Paid By : {paymentMethod}</p>
          <p className="mt-1 mb-1">Sender Number : <b>{senderNumber}</b></p>
          <p className="mt-1 mb-1">TRX Id : <b>{trxId}</b></p>
    </div>
        </div>
        <div className="payment__status">
        <h4>Total amount: {total} Tk</h4>
          {paymentStatus === "PROCESSING" && <div className="payment-admin-buttons"><button onClick={(e)=>updateOrder(e,'PAID')} className="btn-primary">Confirm</button>
          <button onClick={()=>deleteOrder()} className="btn-primary">Delete</button>
            </div>
          }
          {paymentStatus === "PAID" && <div className="payment-admin-buttons"><button disabled className="btn-disabled">Confirmed</button>
          <button onClick={()=>deleteOrder()} className="btn-primary">Delete</button>
            </div>
          }
          {paymentStatus === "UNPAID" && <div className="payment-admin-buttons"><button disabled className="btn-disabled">Unpaid</button>
          <button onClick={()=>deleteOrder()} className="btn-primary">Delete</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Order;
