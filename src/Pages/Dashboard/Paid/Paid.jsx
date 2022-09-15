import React from 'react';
import useProductContext from '../../../Componants/Hooks/useProductContext';
import AllOrder from '../AllOrders/AllOrder';
import './paid.css'

const Paid = () => {
    const {allOrders}= useProductContext()
    const paid=allOrders?.filter(order=>order.paymentStatus.includes('PAID'))

    return (
        <div>
            <div className='my__orders'>
            <div className="container my__order-container">
                <div className="my__order-header">
                    <div className="my__order-header-left">
                        <h4>All Orders</h4>
                        <p className='mt-1'>Total Paid Order: {paid?.length}</p>
                    </div>
                </div>
                <div className="my__order-items">
                    {paid?.map(order=><AllOrder key={order._id} order={order}></AllOrder>)}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Paid;