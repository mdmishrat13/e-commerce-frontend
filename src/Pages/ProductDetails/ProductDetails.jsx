import React, { useEffect, useState } from "react";
import "./productdetails.css";
import user1 from "./../../Images/user.png";
import ReactImageMagnify from "react-image-magnify";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import useAuth from "../../Componants/Hooks/useAuth";
import Rating from 'react-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons'
import useProductContext from "../../Componants/Hooks/useProductContext";

const ProductDetails = () => {
  const {admin} = useProductContext()
  const [fetchError, setFetchError] = useState(null)
  const productId = useParams()
  const [product,setProduct] = useState({})

  const {addToCart,user,increase,decrease,cartItems,isAdmin} = useAuth()

  const [comments,setComments]= useState([])
  const [comment,setComment] = useState()
  const [commentSuccess,setCommentSuccess]= useState(false)
  const [mainImage,setMainImage] = useState('')
  const [rating,setRating] = useState()


  const exist = cartItems.find(cartItem => cartItem._id=== product._id)

  const imgUrl = `https://e-commerce-server.vercel.app/${product?.image}`
  useEffect(()=>{
    setMainImage(imgUrl)
  },[product])

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
      const comments= await axios(`https://e-commerce-server.vercel.app/comment/${productId.id}`)
      setComments(comments.data)
    }
    catch(error){
      console.log(error)
    }

  }

  useEffect(()=>{
    fetchComment()
  },[])

  const deleteComment = async(id)=>{
    const sure = window.confirm('Are You Sure?') 
    if(sure){
      await axios.delete(`https://e-commerce-server.vercel.app/comment/${id}`)
      .then(res=>{
        if(res.status===200){
          alert('Comment Deleted Successfully!')
        }
      })
    }
  }

 const fetchData = async()=>{
  try {
    const data = await axios(`https://e-commerce-server.vercel.app/product/${productId.id}`)
    setProduct(data.data)
  } catch (error) {
    setFetchError('Something went Wrong')
  }
 }
useEffect(()=>{
  fetchData()
},[])

const postComment= async(e)=>{
  e.preventDefault()
  const commentDatas = {comment:comment,productId:productId?.id,name:user?.displayName,rating:rating}
  await axios.post('https://e-commerce-server.vercel.app/comment',commentDatas)
  .then(res=>{
    setComments([...comments,res.data])
    if(res.data){
      setComment('')
      setCommentSuccess(true)
    }
  })
  .catch(err=>{
    console.log(err)
  })
  await axios.patch(`https://e-commerce-server.vercel.app/product/${productId.id}`,{rating:avgRating})
  
}


if(fetchError){
  return <h3>{fetchError}</h3>
}
  return (
    <div className="view__products">
      <div className="view__products-container">
        <div className="view__product-main">
          <div className="view__product-left">
            <div className="view__product-images">
              {product?.images?.map((item) => (
                <div className="view__product-image">
                  <img onClick={()=>setMainImage(`https://e-commerce-server.vercel.app/${item}`)} src={`https://e-commerce-server.vercel.app/${item}`} alt="" />
                </div>
              ))}
            </div>
            <div className="main__image">
            <ReactImageMagnify
            style={{margin:'2rem',zIndex:12}}
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: mainImage,
                },
                largeImage: {
                  src: mainImage,
                  width: 1200,
                  height: 1800,
                },
              }}
            />
            </div>
          </div>
          <div className="view__product-right">
            <h3>{product.name}</h3>
            <p className="color-light">
              Brand: <span className="color-primary">{product.brand}</span>
            </p>
            <p className="">SKU:{product.sku}</p>
            <p className="color-light">
              Seller: <span className="color-primary">Tel Distribution </span>
            </p>
            <p className="color-primary">EMI Available</p>
            <Rating style={{zIndex:-1}} initialRating={avgRating} readonly emptySymbol={<FontAwesomeIcon className="color-golden" icon={farStar} />} fullSymbol={<FontAwesomeIcon className="color-golden" icon={faStar} />}></Rating>
            <p className="display-flex"> Price: <h3 className="ml-1"> {product.price} Tk</h3></p>
            <div className="view__product-quantities mt-1">
              <button onClick={()=>increase(product)} className="btn-quantity">+</button>
              <button className="input-quantity"> {exist?.quantity||1} </button>
              <button onClick={()=>decrease(product)} className="btn-quantity">-</button>
            </div>
            <button onClick={()=>addToCart(product)} className="btn-primary mt-1 d-block">Add To Cart</button>
            <button className="btn-white mt-1">
              Call Now: 01770-777671
            </button>
          </div>
        </div>

        <div className="view__product-description mt-2">
          <h3>Description</h3>
          <p className="mt-2">
            {product.description}
          </p>
        </div>
        <div className="view__product-comment">
          <h3 className="mt-2">Comments</h3>
          <div className="add-review-container">
            <p className="mt-1">Add A Comment</p>
            {user.email?<form onSubmit={postComment}>
              <textarea
              required
              onChange={e=>setComment(e.target.value)}
                className="mt-1"
                name="comment"
                id=""
                cols="30"
                rows="3"
              />
              <p className="mt-1">
              <Rating onChange={(name)=>setRating(name)} initialRating={rating} emptySymbol={<FontAwesomeIcon className="color-golden" icon={farStar} />} fullSymbol={<FontAwesomeIcon className="color-golden" icon={faStar} />}></Rating>
              </p>

                {commentSuccess&&<p className="color-primary">Comment Posted Successfully!</p>}

              <button className="btn-primary mt-1">Post</button>
            </form>:<p className="mt-1"><Link className="color-primary" to='/login'>Login to leave a comment</Link></p>}

            <div className="commnts mt-2">
              <p className="mt-1">{comments.length} Comment Loaded</p>

             {comments.map(comment=> <div className="comment mt-2 border-light-1 p-2">
                <div className="comment__avater">
                  <img src={user1} alt="" />
                  <div className="comment__name">
                    <p>
                      <b>{comment?.name||'Unknown User'}</b>
                    </p>
                    <div className="comment__texts">
                      <p className="mt-1">
                       {comment.comment}
                      </p>
                    </div>
                  </div>
                </div>
                {admin&&<button onClick={()=>deleteComment(comment._id)} className="btn-delete">Delete Comment</button>}
                <div className="rattings">
                  <Rating initialRating={comment.rating} readonly emptySymbol={<FontAwesomeIcon className="color-golden" icon={farStar} />} fullSymbol={<FontAwesomeIcon className="color-golden" icon={faStar} />}></Rating>
                </div>
              </div>)}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
