import axios from 'axios';
import React from 'react';
import { BeatLoader } from "react-spinners";
import { useState } from 'react';
import { useEffect } from 'react';
import useAuth from '../Componants/Hooks/useAuth';

const AdminRoute = ({children}) => {
  const {user}= useAuth()
  const[admin, setAdmin]= useState(false)
  const [isLoading,setIsLoading] = useState(false)

  const checkAdmin = async()=>{
    if(!user){
      setIsLoading(true)
    }
    if(user){
      setIsLoading(true)
      try {
      const data = await axios(`https://e-commerce-server.vercel.app/user/${user.email}`)
      setAdmin(data.data.isAdmin)
      setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
    
  }
  useEffect(()=>{
    checkAdmin()
  },[user])

  if(isLoading){
    return <div className="loader"><BeatLoader color="#36d7b7" size={50} /></div>
  }
  if(admin){
    return children
  }
  return <h3 className='loader'> page Not Found</h3>
};

export default AdminRoute;