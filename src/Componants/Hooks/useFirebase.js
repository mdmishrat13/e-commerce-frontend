import { useEffect,useState } from "react";
import initializeFirebase from "../../Firebase/firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import axios from "axios"


initializeFirebase();
const auth = getAuth();
const provider = new GoogleAuthProvider()


const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState('')
  const [cartItems, setCartItems] = useState([])


  const [myOrders,setMyOrders] = useState([])
  //   email and password register

  const emailRegister = (email, password,displayName) => {
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.displayName = displayName;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        setAuthError(error.message);
        // ..
      })
      .finally(()=>{
        setIsLoading(false)
      });
  };

  //   login with email and password
  const emailLogin = (email, password) => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        setAuthError(error.message);
      })
      .finally(()=>{
        setIsLoading(false)
      });
  };

  //   login with google

  const googleLogin = () => {
    setIsLoading(true)
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        setAuthError(error.message);
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      })
      .finally(()=>{
        setIsLoading(false)
      });
  };
  //   chack user state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false)
    });
    return () => unsubscribe;
  }, []);

  //   logout

  const logout = () => {
    setIsLoading(true)
    signOut(auth)
      .then(() => {})
      .catch((err) => {
        setAuthError(err)
      })
      .finally(()=>{
        setIsLoading(false)
      });
  };



  useEffect(()=>{
    const exist = localStorage.getItem("cartItem")
    if (exist){
      localStorage.setItem('cartItem',exist)
      setCartItems(JSON.parse(exist))
    }

  },[])
  // add to cart a items 
  const addToCart = product=>{
    const exist = cartItems.find(item=>item._id === product._id)
    if(exist){
      const newCartItem=cartItems.map(item=> item._id===product._id?{...exist, quantity:exist.quantity+1}:item)
      setCartItems(newCartItem)
        localStorage.setItem('cartItem',JSON.stringify(newCartItem))
        alert('Added Successfully!')
    }
    else{
      const newCartItem = [...cartItems,{...product,quantity:1}]
      setCartItems(newCartItem)
        localStorage.setItem('cartItem',JSON.stringify(newCartItem))
        alert('Added Successfully!')
    }
    
  }


// remove item from cart 

  const removeFromCart = product=>{
    const sure = window.confirm('Are you sure?')
    if(sure){
      const newCartItems = cartItems.filter(x=>x._id!==product._id)
    localStorage.setItem('cartItem',JSON.stringify(newCartItems))
    setCartItems(newCartItems)
    }
  }

  // increase cart quantity 

  const increase =( product)=>{
    const exist = cartItems.find(item=>item._id === product._id)
    if(exist&&exist.quantity>=1){
      const newCartItem=cartItems.map(item=> item._id===product._id?{...exist, quantity:exist.quantity+1}:item)
      setCartItems(newCartItem)
        localStorage.setItem('cartItem',JSON.stringify(newCartItem))
    }
  }

  // decrease cart quantity 

  const decrease = product =>{
    const exist = cartItems.find(item=>item._id === product._id)
    if(exist&&exist.quantity>1){
      const newCartItem=cartItems.map(item=> item._id===product._id?{...exist, quantity:exist.quantity-1}:item)
      setCartItems(newCartItem)
        localStorage.setItem('cartItem',JSON.stringify(newCartItem))
    }
  }



  // fetch order from database 
    const myOrder = async()=>{
      if(user?.email)
      {
        try {
          const data = await axios(`https://e-commerce-server.vercel.app/order/${user.email}`)
          setMyOrders(data.data)
          setIsLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
    }
    useEffect(()=>{
      myOrder()
  },[user])

  
  return {
    user,
    authError,
    isLoading,
    emailRegister,
    logout,
    emailLogin,
    googleLogin,
    addToCart,
    removeFromCart,
    cartItems,
    increase,
    decrease,
    myOrders,
  };
};

export default useFirebase;
