import React from 'react'

import './dash-comps.css'

const ProductsList=(props)=> {
    const {products}=props;
    return (
        <div className="card mt-5 h-50 w-25 d-inline-block text-center cardPosition">
            <div className="card-header">
                Total Products
            </div>
            <div className="card-body">
                 <blockquote className="blockquote mb-0">
                     <h3>{products.length}</h3> 
                </blockquote>
            </div>
        </div>
    )
}

export default ProductsList 