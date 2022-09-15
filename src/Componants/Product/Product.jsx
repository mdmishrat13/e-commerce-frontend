import React, { useEffect } from "react";
import "./product.css";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons'
import axios from "axios";



const Product = ({ product,addToCart }) => {
  const [comments,setComments] = useState([])

  let totalRating = 0
  let total = 0

  comments?.forEach(item=>{
    if(item.rating>0){
      totalRating= totalRating+item.rating
      total = total+1
    }
    else return
  })
  const avgRating = totalRating/total


  const fetchComment= async()=>{
    try{
      const comments= await axios(`https://e-commerce-server.vercel.app/comment/${product._id}`)
      setComments(comments.data)
    }
    catch(error){
      console.log(error)
    }

  }

  useEffect(()=>{
    fetchComment()
  },[])
  return (
    <article className="product">
      <img
        className="product__image"
        src={`https://e-commerce-server.vercel.app/${product.image}`}
         alt=""
      />
      <div className="product__texts">
        <div className="product__brand">
          <p> {product.brand} </p>
        </div>
        <div className="product__name">
          <h4>{product.name}</h4>
        </div>
        <div className="product__price">
          <h4>{product.price} Tk</h4>
        </div>
        <div className="product__emi">
          <p>Emi Starts At 599/ month</p>
        </div>
        <ul className="left__menu-checkbox-inputs rattings__filter">
        <Rating style={{zIndex:-1}} initialRating={avgRating} readonly emptySymbol={<FontAwesomeIcon className="color-golden" icon={farStar} />} fullSymbol={<FontAwesomeIcon className="color-golden" icon={faStar} />}></Rating>
          
        </ul>
        <div className="product__buttons mt-1">
          <button onClick={()=>addToCart(product)} className="btn-sm-primary"><i class="uil uil-shopping-cart-alt"></i>Add Cart</button>
          <Link className="btn-sm-primary"
            to={`/productdetails/${product._id}`}>
           Details <i class="uil uil-arrow-right"></i>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Product;
