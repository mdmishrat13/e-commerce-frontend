import React from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css'

const Pagination = ({productPerPage,totalProducts,paginate}) => {
    const pageNumbers =[]
    for(let i = 1; i<=Math.ceil(totalProducts/productPerPage);i++){
        pageNumbers.push(i)
    }
    return (
        <div className='pagination__section'>
            <ul>
                {pageNumbers.map((_,number) => <li key={number}> <Link to='#' className='pagination__index' onClick={()=>paginate(number)} key={number}>{number}</Link></li>)}
            </ul>
        </div>
    );
};

export default Pagination;