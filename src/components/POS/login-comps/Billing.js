import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import Select from 'react-select'

import '../dashboard-comps/dash-comps.css'
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

    console.log(quantityOptions);

    console.log(customersOptions);


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
    
    const clearStoreItems=()=>{
        billData.date=date;

        billData.customer=customer;

         billData.lineItems=cartData;

        console.log(billData,'clear store');

        dispatch(startGenerateBill(billData));

        dispatch(setClearLineItems());
    }

    const handleDelete=(bill)=>{
        dispatch(asyncBillDelete(bill))
    }

    const handleEdit=(bill)=>{
        console.log(bill);
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
                        <input type="submit" value="Add product" className="btn btn-success mx-2"/> 
                        <input type="button" value="gen bill" onClick={()=>{clearStoreItems()}} />
                        {/* <h1>{cartData.length>0 && cartData.length}</h1> */}
                    </form>

                    <hr />

                </div>
            </div>
            {/*bills listing*/}
            <div className="row">
                <div className="col-md-10">
                    <h3>All Bills</h3>
                    <ol>
                        {
                            billsData.map((bill)=>{
                                return <li key={bill._id}>{bill.date}-{bill.total} <button onClick={()=>{handleDelete(bill)}}>delete</button> <button onClick={()=>{handleEdit(bill)}} > View</button></li>
                            })
                        }
                    </ol>
                </div>
            </div>

        </div>
    )
}

export default Billing

