import axios from "axios";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import "./upload.css";

const Upload = () => {
  const [DataLoading,setDataLoading] = useState(false)
  const [error,setError] = useState('')

  const [images, setImages] = useState(null);
  const [image, setImage] = useState(null);
  const [name,setName] = useState('')
  const [price,setPrice]= useState(0)
  const [brand,setBrand] = useState('')
  const [description,setDescription] = useState('')
  const [sku, setSku] = useState('')
  const [vendor,setVendor] = useState(0)
  const [color,setColor]= useState('')


  const handleSubmit = (e)=>{
    e.preventDefault()
    setDataLoading(true)
    if(!images){
      return alert('please select image')
    }
    const datas = new FormData()
    datas.append('name',name)
    datas.append('sku',sku)
    datas.append('price',price)
    datas.append('brand',brand)
    datas.append('description',description) 
    datas.append('image',image) 
    datas.append('vendor',vendor) 
    datas.append('color',color)
    Array.from(images).forEach(item=>{
      datas.append('images',item)
    })

    axios.post('https://e-commerce-server.vercel.app/product/upload',datas)
    .then(res=>{
      if (res.status===201){
        alert('Product Added SuccessFully!')
      }
      else{
        alert('Something Wrong!')
      }})
    .catch(err=>setError(err.message))
    setDataLoading(false)
  }
  return (
    <div className="upload">
      <h3 className="mt-2 mb-1 text-center">Add a Product</h3>
      <div className="container upload__container">
        <form onSubmit={handleSubmit} className="product-upload-form" action="#">
          <div className="input-wrapper">
            <label htmlFor="name">Product Name :</label>
            <input onChange={e=>setName(e.target.value)} id="name" type="text" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="images">Upload Images :</label>
            <input
              id="images"
              type="file"
              multiple
              onChange={e=>setImages(e.target.files)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="image">Upload main Image :</label>
            <input
              id="image"
              type="file"
              onChange={e=>setImage(e.target.files[0])}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="price">Product Price :</label>
            <input onChange={e=>setPrice(e.target.value)} id="price" type="number" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="brand">Brand Name :</label>
            <input onChange={e=>setBrand(e.target.value)} id="brand" type="text" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="sku">SKU :</label>
            <input onChange={e=>setSku(e.target.value)} id="sku" type="text" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="color">Color :</label>
            <input onChange={e=>setColor(e.target.value)} id="color" type="text" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="vendor">Vendor :</label>
            <input onChange={e=>setVendor(e.target.value)} id="vendor" type="number" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="description">Description :</label>
            <textarea onChange={e=>setDescription(e.target.value)} rows={3} id="description" type="text" />
          </div>
          <button className="btn-primary mt-1 mb-2"> Add Product</button>
          {error&&<p className="mb-1 color-danger">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Upload;
