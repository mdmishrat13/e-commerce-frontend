import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./updateproduct.css";

const UpdateProduct = () => {
    const [dataLoading,setDataLoading]= useState(false)
    const [product,setProduct]= useState({})

    const nameRef = useRef()
    const priceRef = useRef()
    const brandRef = useRef()
    const descriptionRef = useRef()
    const skuRef = useRef()
    const vendorRef = useRef()
    const colorRef = useRef()



    const id = useParams()
    const getData = async()=>{
        const data = await axios(`https://e-commerce-server.vercel.app/product/${id.id}`)
        setProduct(data.data)
    }

    useEffect(()=>{
        getData()
    },[])



  const handleSubmit = (e)=>{
    setDataLoading(true)
    e.preventDefault()
    const datas ={name:nameRef.current.value,price:priceRef.current.value,brand:brandRef.current.value,description:descriptionRef.current.value,sku:skuRef.current.value,vendor:vendorRef.current.value,color:colorRef.current.value}
    
    console.log('consoling updating product info:',datas)

    axios.patch(`https://e-commerce-server.vercel.app/product/${id.id}`,datas)
    .then(res=>{
      if (res.status===200){
        alert('Product updated SuccessFully!')
      }
      else{
        alert('Something Wrong!')
      }})
    .catch(err=>console.log(err))
    .finally(()=>{
        setDataLoading(false)
    })
    setDataLoading(false)
  }
  return (
    <div className="upload">
      <h3 className="mt-2 mb-1 text-center">Add a Product</h3>
      <div className="container upload__container">
        <form onSubmit={handleSubmit} className="product-upload-form">
          <div className="input-wrapper">
            <label htmlFor="name">Product Name :</label>
            <input ref={nameRef} defaultValue={product?.name} id="name" type="text" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="price">Product Price :</label>
            <input ref={priceRef} id="price" defaultValue={product?.price} type="number" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="brand">Brand Name :</label>
            <input ref={brandRef} id="brand" defaultValue={product?.brand} type="text" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="sku">SKU :</label>
            <input ref={skuRef} id="sku" defaultValue={product?.sku} type="text" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="color">Color :</label>
            <input ref={colorRef} id="color" defaultValue={product?.color} type="text" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="vendor">Vendor :</label>
            <input ref={vendorRef} id="vendor" type="number" defaultValue={product?.vendor} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="description">Description :</label>
            <textarea ref={descriptionRef} rows={3} id="description" type="text" defaultValue={product?.description} />
          </div>
          <button type="submit" className="btn-primary mt-1 mb-2">submit</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
