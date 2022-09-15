import React from 'react';
import useAuth from '../../Componants/Hooks/useAuth';
import Orders from '../../Componants/Orders/Orders';
import './myorders.css'

const MyOrders = () => {
    const {user,myOrders,isLoading} = useAuth()
    return (
        <div className='my__orders'>
            <div className="container my__order-container">
                <div className="my__order-header">
                    <div className="my__order-header-left"> 
                        <h4>My Orders</h4>
                        <p className='mt-1'>Your Total Order: {myOrders?.length}</p>
                    </div>
                    <div className="my__order-header-right">
                        <input type="text" />
                        <button className='btn-primary'>Submit</button>
                    </div>
                </div>
                {isLoading?<h4>Your Data is Loading.....</h4>:<div className="my__order-items">
                    {myOrders?.map(order=><Orders key={order._id} order={order}></Orders>)}
                </div>}
            </div>
        </div>
    );
};

export default MyOrders;