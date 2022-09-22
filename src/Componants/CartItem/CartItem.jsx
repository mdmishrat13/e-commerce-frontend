import React from "react";
import "./cartitem.css";

const CartItem = ({product,increase,decrease,removeFromCart}) => {
  return (
    <div className="cart__page-item"> 
      <div className="cart__page-item-product">
        <div className="cart__page-item-product-image">
          <img src={`http://localhost:5000/${product.image}`} alt="" />
        </div>
        <div className="cart__page-item-texts">
          <h4> {product.name} </h4>
          <p>{product.brand}</p>
        </div>
      </div>
      <div className="view__product-quantities">
              <button onClick={()=>increase(product)} className="btn-quantity">+</button>
              <input value={product.quantity} className="input-quantity" type="number" />
              <button onClick={()=>decrease(product)} className="btn-quantity">-</button>
            </div>
      <div className="cart__page-item-price">
        <h4> {product.price*product.quantity} Tk </h4>
      </div>
      <div className="cart__page-item-remove">
        <button className="removeIcon" onClick={()=>removeFromCart(product)}>
          <i className="uil uil-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
