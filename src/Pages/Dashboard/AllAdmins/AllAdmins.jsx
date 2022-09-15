import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import AllAdmin from './AllAdmin';
import './alladmins.css'

const AllAdmins = () => {
    const [allAdmins,setAllAdmins]= useState([])
    const [emailInput,setEmailInput] = useState('')
    

    const fetchAdmins = async()=>{
        const data = await axios(`https://e-commerce-server.vercel.app/user`)
        setAllAdmins(data.data)
    }
   

    const removeAdmin = email=>{
        const newAdmins = allAdmins.filter(x=>x._email!==email)
        axios.patch(`https://e-commerce-server.vercel.app/user/${email}`,{isAdmin:false})
       
        .then(res=>res.data&&setAllAdmins(newAdmins))
      }
    

    const handleMakeAdmin = (e)=>{
        e.preventDefault()
        axios.patch(`https://e-commerce-server.vercel.app/user/${emailInput}`,{isAdmin:true})
        .then(res=> setAllAdmins([...allAdmins,res.data]))
    }

    useEffect(()=>{
        fetchAdmins()
    },[])

    console.log(allAdmins)
    return (
        <div>
            <div className='my__orders'>
            <div className="container my__order-container">
                <div className="my__order-header">
                    <div className="my__order-header-left">
                        <h4>All Admins</h4>
                        <p className='mt-1'>Total Admins: {allAdmins?.length}</p>
                    </div>
                </div>
                <div className="makeAdmin__section text-center mt-2 mb-2">
                    <h4>Make An User Admin</h4>
                    <form onSubmit={handleMakeAdmin}>
                        <input className='admin__email-input' onChange={e=>setEmailInput(e.target.value)} type="email" placeholder='Search By Email.....' />
                        <input className='btn-primary' type="submit" value='Make Admin' />
                    </form>
                </div>
                <div className="my__order-items">
                    {allAdmins?.map(admin=><AllAdmin removeAdmin={removeAdmin} admin={admin} key={admin._id}></AllAdmin>)}
                </div>
            </div>
        </div>
        </div>
    );
};

export default AllAdmins;