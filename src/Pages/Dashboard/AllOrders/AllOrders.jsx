import React from 'react';
import useProductContext from '../../../Componants/Hooks/useProductContext';
import AllOrder from './AllOrder'
import './AllOrders.css'

const AllOrders = () => {
    const {allOrders}= useProductContext()
    const processing =allOrders?.filter(order=>order.paymentStatus.includes('PROCESSING'))

    return (
        <div>
            <div className='my__orders'>
            <div className="container my__order-container">
                <div className="my__order-header">
                    <div className="my__order-header-left">
                        <h4>All Orders</h4>
                        <p className='mt-1'>Total Order: {allOrders?.length}</p>
                    </div>
                </div>
                <div className="my__order-items">
                    {processing?.map(order=><AllOrder key={order._id} order={order}></AllOrder>)}
                </div>
            </div>
        </div>
        </div>
    );
};

export default AllOrders;