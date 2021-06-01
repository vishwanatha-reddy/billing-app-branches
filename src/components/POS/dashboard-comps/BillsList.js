import React from 'react'

import './dash-comps.css'

const BillsList=(props)=> {
    const {bills}=props;
    return (
        <div className="card mt-3 h-50 w-25 d-inline-block text-center mx-3 ">
            <div className="card-header">
                Total Bills generated
            </div>
            <div className="card-body">
                 <blockquote className="blockquote mb-0">
                     <h3>{bills.length}</h3> 
                </blockquote>
            </div>
        </div>
    )
}

export default BillsList 