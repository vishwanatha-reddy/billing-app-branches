import React from 'react'
import {Link,Route, withRouter,Switch} from 'react-router-dom';
import BillsList from './dashboard-comps/BillsList';
import CustomersList from './dashboard-comps/CustomerList';
import MonthlyRevenue from './dashboard-comps/MonthlyRevenue';
import ProductsList from './dashboard-comps/ProductsList';

import TotalSales from './dashboard-comps/TotalSales'


const Dashboard=(props)=> {
    const {userLoggedIn}=props;
    return (
        <div className="container">
          <div className="row">
              <div className="col-md-10">
                  <TotalSales className="col-lg-4"/>
                  <MonthlyRevenue className="col-lg-4"/>
                  <CustomersList className="col-lg-4"/>
                  <ProductsList className="col-lg-4"/>
                  <BillsList className="col-lg-4"/>
              </div>
          </div>
        </div>


    )
}

export default Dashboard
