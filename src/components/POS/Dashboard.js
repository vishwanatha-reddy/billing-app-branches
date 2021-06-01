import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link,Route, withRouter,Switch} from 'react-router-dom';

import BillsList from './dashboard-comps/BillsList';
import CustomersList from './dashboard-comps/CustomerList';
import MonthlyRevenue from './dashboard-comps/MonthlyRevenue';
import ProductsList from './dashboard-comps/ProductsList';
import TotalSales from './dashboard-comps/TotalSales'
import {startCustomerList} from '../../actions/customersAction';
import {startProductsList} from '../../actions/productsAction';
import {startBillsList} from '../../actions/billAction';


const Dashboard=(props)=> {
    const {userLoggedIn}=props;

    const dispatch=useDispatch();

    const {userInfo,customers,products,cartItems,bills}=useSelector((store)=>{
        return store;
    })

    console.log(customers, bills,'bills n customers from dashboard');

    useEffect(()=>{
        dispatch(startCustomerList());
        dispatch(startProductsList());
        dispatch(startBillsList());
    },[]);


    return (
        <div className="container">
          <div className="row">
              <div className="col-md-10 ">
                  <TotalSales bills={bills} className="col-md-4"/>
                  {/* <MonthlyRevenue bills={bills}className="col-md-4"/> */}
                  <CustomersList customers={customers} className="col-md-4"/>
                  <ProductsList products={products} className="col-md-4"/>
                  <BillsList bills={bills} className="col-md-4"/>
              </div>
          </div>
        </div>


    )
}

export default Dashboard
