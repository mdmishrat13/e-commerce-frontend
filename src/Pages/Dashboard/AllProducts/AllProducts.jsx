import React from "react";
import ProductItem from "./ProductItem";
import "./allproducts.css";
import axios from "axios";
import useProductContext from "../../../Componants/Hooks/useProductContext";

const AllProducts = () => {
   
  const deleteProduct = async(id) => {
    const permision = window.confirm("Are You Sure?")
    console.log('product clicked',id)
    if (permision) {
        await axios.delete(`https://e-commerce-server.vercel.app/product/${id}`)
    .then(res=>{
        if(res.status===200){
            alert('Deleted Successfully!')
        }
    })
    }
  };
  const { products } = useProductContext();
  return (
    <div>
      <div className="allproduct__page-container">
        <div className="allproduct__page-left">
          <div className="allproduct__page-title mb-1">
            <h3 className="mt-2 text-center">
              {" "}
              Total Products : {products?.length}
            </h3>
          </div>
          <div className="cart__page-items">
            {products?.map((item) => (
              <ProductItem deleteProduct={deleteProduct} key={item._id} product={item}></ProductItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
