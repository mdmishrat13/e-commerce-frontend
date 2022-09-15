import React from 'react';
import './orderitem.css'

const OrderItem = ({item}) => {
    const {product} = item
    return (
        <div className='orderItem__container'>
            <div className="ordered__item-image">
                <img src={`https://e-commerce-server.vercel.app/${product?.image}`} alt="" />
            </div>
            <div className="ordered__item-title">
                <h4>{product?.name}</h4>
                <p>Price :{product?.price} Tk</p>
                <p>Quantity :{item.quantity}</p>
            </div>
        </div>
    );
};

export default OrderItem;