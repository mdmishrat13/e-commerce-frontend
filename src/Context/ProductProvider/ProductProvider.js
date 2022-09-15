import React, { createContext } from 'react';
import useProducts from '../../Componants/Hooks/useProducts';

export const ProductContext = createContext(null)

const ProductProvider = ({children}) => {
    const allContext = useProducts();
    return (
        <ProductContext.Provider value={allContext}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;