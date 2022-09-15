import React from 'react';
import './alladmins.css';

const AllAdmin = ({removeAdmin,admin}) => {
    return (
        <div className='admin__page mb-1'>
            <div className="admin__container">
                <div className="admin__information">
                    <h4>{admin?.displayName}</h4> 
                    <p>{admin?.email}</p>
                </div>
                <div className="admin__information">
                    <p>{admin?.isAdmin?'Admin':'Not Admin'}</p>
                </div>

                <div className="admin__information">
                    <button className='removeIcon' onClick={()=>removeAdmin(admin?.email)}><i className="uil uil-trash-alt"></i></button>
                </div>
            </div>
        </div>
    );
};

export default AllAdmin;