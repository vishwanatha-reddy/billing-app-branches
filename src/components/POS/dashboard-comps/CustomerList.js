import React from 'react'

import './dash-comps.css'

const CustomersList=(props)=> {
    const{customers}=props;
    return (
          <div className="card mt-5 h-50 w-25 d-inline-block mx-3 text-center cardPosition">
            <div className="card-header">
                Total Customers
            </div>
            <div className="card-body">
                 <blockquote className="blockquote mb-0">
                     <h3>{customers.length}</h3> 
                </blockquote>
            </div>
        </div>
    )
}

export default CustomersList 