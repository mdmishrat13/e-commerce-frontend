import React from 'react';
import './cart.css'
import useAuth from '../../Componants/Hooks/useAuth';
import CartItem from '../../Componants/CartItem/CartItem';
import Pricing from '../../Componants/Pricing/Pricing';

const Cart = () => {
    const {removeFromCart,increase,decrease,cartItems} = useAuth()

    return (
        <div>
            <div className="cart__page-container">
               <div className="cart__page-left">
               <div className="cart__page-title">
                    <h3 className='text-center'> Your Cart: {cartItems.length}</h3>
                </div>
                <div className="cart__page-items">
                    {cartItems.map(item => <CartItem key={item._id} product={item} increase={increase} decrease={decrease} removeFromCart={removeFromCart}> </CartItem>)}
                </div>
               </div>
               <Pricing key={1} page={'CARTPAGE'}></Pricing>
            </div>
        </div>
    );
};

export default Cart;