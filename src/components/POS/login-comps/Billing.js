import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import Select from 'react-select'
import moment from 'moment';

import '../dashboard-comps/dash-comps.css'
import BillItem from '../../../edit-form/BillItem'
import {setLineItems} from '../../../actions/lineItemsAction';
import {setClearLineItems} from '../../../actions/lineItemsAction';
import {startBillsList} from '../../../actions/billAction';
import  {startGenerateBill} from '../../../actions/billAction';
import {asyncBillDelete} from '../../../actions/billAction';


const Billing = (props) => {
    const [date,setDate]=useState('');
    const [product,setProduct]=useState('');
    const [customer,setCustomer]=useState('');
    const [quantity,setQuantity]=useState('');
    // const [cartItems,setCartItems]=useState([]);

    const dispatch=useDispatch();   
    
    useEffect(()=>{
        dispatch(startBillsList())
    },[])

    const productsData=useSelector((store)=>{
        return store.products
    })

    const customersData=useSelector((store)=>{
        return store.customers
    })

    const cartData=useSelector((store)=>{
        return store.cartItems
    })

    const billsData=useSelector((store)=>{
        return store.bills
    })
    

    const customersOptions=customersData.map((customer)=>{
        return {
            value:customer._id,
            label:customer.name
        }
    })

    const productsOptions=productsData.map((product)=>{
        return {
            value:product._id,
            label:product.name
        }
    })

    const quantityOptions=[1,2,3,4,5,6,7,8,9,10].map((num,i)=>{
        return {
            value:num,
            label:i+1
        }
    });


    const handleChange=(e)=>{
        if(e.target.name==='date'){
            setDate(e.target.value)
        }
    }

    const handleCustomerChange=(value)=>{
        setCustomer(value.value);
    }
    const handleProductChange=(value)=>{
        setProduct(value.value);
    }

    const handleQuantityChange=(value)=>{
        console.log(value);
        setQuantity(value.value)
    }
    const clearFields=()=>{
        setDate('');
        setCustomer('');
        setProduct('');
        setQuantity('');
    }

    let billData={
            date:'',
            customer:'',
            lineItems:[]
        };

    const handleDateCustomerSubmit=(e)=>{
        e.preventDefault();

        console.log(billData,'from Date Customer submit');

        // clearFields();
        
    }

   

    const handleProductSubmit=(e)=>{
        e.preventDefault();

        dispatch(setLineItems({product,quantity}))

        console.log(billData,'from prod submit');
    }

    //handle bill delete
    const handleDelete=(id)=>{
        dispatch(asyncBillDelete(id))
    }
    
    const clearStoreItems=()=>{
        billData.date=date;

        billData.customer=customer;

         billData.lineItems=cartData;

        console.log(billData,'clear store');

        dispatch(startGenerateBill(billData));

        dispatch(setClearLineItems());
    }

    const findCustomer=(id)=>{
        let customerName='';
         customersData.forEach((customer)=>{
             if(customer._id===id){
                  customerName=customer.name;
             }
        })
        return customerName;
    }

    return (
        <div className="container">
            {/* select customer and date*/}
            <div className="row ">
                <div className="col-md-10 ">
                    
                    <form onSubmit={handleDateCustomerSubmit} className="border border-dark">
                        <h3>Add customer details</h3>
                            <div className="mb-3 mx-2 my-4 d-inline-block" >
                                <label className=".date-label d-block">Date</label>
                                <input type="date"  name="date" 
                                    value={date}
                                    className=".date-input"
                                    min="2018-01-01" max="2050-12-31"
                                     onChange={handleChange}></input>
                            </div>
                             <div className="mb-3 mx-2 my-4 d-inline-block" style={{width:'20%'}}>
                                <label className=".date-label" >customer</label>
                                <Select  options={customersOptions} onChange={handleCustomerChange}/>
                            </div>
                    </form>

                    <hr/>
    
                </div>
            </div>
            {/* select products and quantity*/}
            <div className="row">
                <div className="col-md-10">
                    <form onSubmit={handleProductSubmit} className="border border-dark">
                        <h3>Add product details</h3>
                            <div className="mb-3 mx-2 my-4 d-inline-block" style={{width:'20%'}}>
                                <label className=".date-label" >products</label>
                                <Select  options={productsOptions} onChange={handleProductChange}/>
                            </div>

                            <div className="mb-3 mx-2 my-4 d-inline-block" style={{width:'10%'}}>
                                <label className=".date-label" >quantity</label>
                                <Select  options={quantityOptions}  onChange={handleQuantityChange}/>
                            </div>
                        <input type="submit" value="Add to cart" className="btn btn-success mx-2"/> 
                        <input type="button" value="gen bill" onClick={()=>{clearStoreItems()}} />
                        {/* <h1>{cartData.length>0 && cartData.length}</h1> */}
                    </form>

                    <hr />

                </div>
            </div>

            { billData.lineItems.length>0 && <div className="row">
                <div className="col-md-10">
                    <h1>cart details</h1>
                        
                </div>
            </div>}

            <hr />
            {/*bills listing*/}
            <div className="row">
                <div className="col-md-10">
                    { billsData.length>0 ?(
                       
                            <table className="table table-success table-striped table-hover" >
                                <thead>
                                    <tr>
                                        <th scope="col">Bill Date</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Bill Total</th>
                                        <th scope="col">Bill Details</th>
                                        <th scope="col">Delete Bill</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        billsData.map((bill)=>{
                                            return <BillItem  bill={bill} handleDelete={handleDelete} findCustomer={findCustomer} key={bill._id}/>
                                        })
                                    }
                                </tbody>
                            </table>
                        
                        ):(
                            <h2>No Products found</h2>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default Billing

