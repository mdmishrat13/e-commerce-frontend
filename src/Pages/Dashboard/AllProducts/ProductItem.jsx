import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({deleteProduct,product}) => {
  return (
    <div>
      <div className="cart__page-item">
        <div className="cart__page-item-product">
          <div className="cart__page-item-product-image">
            <img src={`https://e-commerce-server.vercel.app/${product.image}`} alt="" />
          </div>
          <div className="cart__page-item-texts">
            <h4> {product.name} </h4>
            <p>{product.brand}</p>
            <p>{product.price} Tk</p>
          </div>
        </div>
        <div className="product__edit">
            <Link to={`/dashboard/update/${product._id}`} className="removeIcon">
            <FontAwesomeIcon className="color-primary" icon={faPenToSquare} />
            </Link>
        </div>
        
        <div className="cart__page-item-remove">
          <button 
          onClick={()=>deleteProduct(product._id)}
            className="removeIcon"
          >
            <i className="uil uil-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
