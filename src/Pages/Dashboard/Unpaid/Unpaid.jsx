import React from 'react';
import useProductContext from '../../../Componants/Hooks/useProductContext';
import AllOrder from '../AllOrders/AllOrder';
import './unpaid.css'

const Unpaid = () => {
    const {allOrders}= useProductContext()
    const unpaid =allOrders?.filter(order=>order.paymentStatus.includes('UNPAID'))

    return (
        <div>
            <div className='my__orders'>
            <div className="container my__order-container">
                <div className="my__order-header">
                    <div className="my__order-header-left">
                        <h4>All Orders</h4>
                        <p className='mt-1'>Total Unpaid Order: {unpaid?.length}</p>
                    </div>
                </div>
                <div className="my__order-items">
                    {unpaid?.map(order=><AllOrder key={order._id} order={order}></AllOrder>)}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Unpaid;