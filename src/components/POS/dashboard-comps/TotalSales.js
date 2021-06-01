import React from 'react'

import './dash-comps.css'

const TotalSales=(props)=> {
    const {bills}=props;
    let salesVolume=0;

    //calculating total of all bills
    bills.forEach((bill)=>salesVolume+=bill.total);

    return (
        <div className="card mt-3 h-50 w-25 d-inline-block text-center cardPosition">
            <div className="card-header">
                Total Sales
            </div>
            <div className="card-body">
                 <blockquote className="blockquote mb-0">
                     <h3>{salesVolume}</h3> 
                </blockquote>
            </div>
        </div>
        )
}

export default TotalSales 
