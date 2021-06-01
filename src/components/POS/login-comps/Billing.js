import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import Select from 'react-select'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import swal from 'sweetalert'

import '../dashboard-comps/dash-comps.css'
import BillItem from '../../../edit-form/BillItem'
import {setLineItems} from '../../../actions/lineItemsAction';
import {setClearLineItems} from '../../../actions/lineItemsAction';
import {setDeleteLineItem} from '../../../actions/lineItemsAction';
import {startBillsList} from '../../../actions/billAction';
import  {startGenerateBill} from '../../../actions/billAction';
import {asyncBillDelete} from '../../../actions/billAction';
import {startProductsList} from '../../../actions/productsAction';
import {startCustomerList} from '../../../actions/customersAction';
import {startCreateCustomer} from '../../../actions/customersAction'


const Billing = (props) => {
    const [date,setDate]=useState('');
    const [product,setProduct]=useState('');
    const [customer,setCustomer]=useState('');
    const [quantity,setQuantity]=useState('');
    const [toggle,setToggle]=useState(false);

    //for new cust add
    const [custName,setCustName]=useState('');
    const [mobile,setMobile]=useState('');
    const [email,setEmail]=useState('');

    const dispatch=useDispatch();   
    
     useEffect(()=>{
        dispatch(startCustomerList());
        dispatch(startProductsList());
        dispatch(startBillsList());
    },[]);

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

        // console.log(billData,'from Date Customer submit');

        // clearFields();
        
    }

    const handleProductSubmit=(e)=>{
        e.preventDefault();

        dispatch(setLineItems({product,quantity}))

        // console.log(billData,'from prod submit');
        // console.log(cartData,'prods in cart');
    }

    //handle bill delete
    const handleDelete=(id)=>{
        //sweet alert
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this bill data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
        if (willDelete) {
                dispatch(asyncBillDelete(id));
                swal("Bill has been deleted!", {
                icon: "success",
        });
            } else {
                swal("Bill was not deleted");
            }
        })   
    }
    
    const clearStoreItems=()=>{
        billData.date=date;

        billData.customer=customer;

         billData.lineItems=cartData;

        console.log(billData,'clear store');

        dispatch(startGenerateBill(billData));

        dispatch(setClearLineItems());

        //settingtotal bill value in local storage to zero after checkout
        const zeroBill=0;

        localStorage.setItem('bill total', zeroBill);

        swal({
            title: "Bill generated successfully",
            // text: "You clicked the button!",
            icon: "success",
            // button: "Aww yiss!",
        });
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

    const findCustEmail=(id)=>{
        let customerMail='';
         customersData.forEach((customer)=>{
             if(customer._id===id){
                  customerMail=customer.email;
             }
        })
        return customerMail;
    }

    //cart items functions

    //func to return prod name
    const cartProductName=(prodId)=>{
        // console.log(prodId);
        let prodName='';
         productsData.find((item)=>{
            if(item._id==prodId){
                prodName=item.name
            }
        });
    return prodName;
    }

    //func to return prod price
    const cartProductPrice=(prodId)=>{
        // console.log(prodId);
        let prodPrice='';
         productsData.find((item)=>{
            if(item._id==prodId){
                prodPrice=item.price
            }
        });
    return prodPrice;
    }

    //func to handle cart delete
    const handleCartDelete=(prod)=>{
        // console.log(prod,'handle cart del');
        
        //sweet alert
        swal({
            title: "Are you sure?",
            text: "you want to remove the product from cart ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
        if (willDelete) {
                dispatch(setDeleteLineItem(prod))
                swal("Product has been removed!", {
                icon: "success",
        });
            } else {
                swal("Product was not removed");
            }
        })   
    }


    //func cart total
    const cartTotal=()=>{
        const billTotal=localStorage.getItem('bill total');
        return billTotal;
    }

    //func prod sub total
    let count=0;
    const prodSubtotal=(value)=>{
        
        count+=value;
        // console.log(count);
        // cartTotal(value);
        localStorage.setItem('bill total',count)
        return value;
    }

    //other way to get bill total, appy below to cartData and productsData arrays. 
// const obj1=[
//     {
//         prod:2,
//         quantity:2
//     },
//     {
//         prod:3,
//         quantity:3
//     }
// ];

// const obj2=[
//     {
//         _id:6,
//         price:200
//     },
//     {
//         _id:7,
//         price:300
//     },
//     {
//         _id:2,
//         price:400
//     },
//     {
//         _id:3,
//         price:500
//     },
// ]


//     let total=0;
//     for(let i=0;i<=obj1.length-1;i++){
//     for(let j=0;j<=obj2.length-1;j++){
//         if(obj1[i].prod==obj2[j]._id){
//             total+=obj1[i].quantity*obj2[j].price;
//         }
//     }
// }

//func new customer add toggle
const handleNewCust=()=>{
     setToggle(!toggle);
}

//func new cust details change
const handleCustChange=(e)=>{
     if(e.target.name==='custName'){
            const result=e.target.value;
            if(result.length<11){
                setCustName(result)
            }
            
        }else if(e.target.name==='mobile'){
            const result=e.target.value;
            if(result.length<11){
                setMobile(e.target.value)
            }
            
        }else if(e.target.name==='email'){
            const result=e.target.value;
            if(result.length<20){
                setEmail(result)
            }
        }
}

//func new cust submit
const handleCustSubmit=(e)=>{
    e.preventDefault();

     const customerInfo={};

        //product name validation
        if(custName.length>=3){
            customerInfo.name=custName;
            
        }

         //mobile validation
        if(mobile.length>0 ){
            customerInfo.mobile=Number(mobile);
            
        }

         //email validation
        if(email.length>0 ){
            customerInfo.email=email;
            
        }
    
        // console.log(customerInfo);

        if(customerInfo.hasOwnProperty('name') && customerInfo.hasOwnProperty('mobile') && customerInfo.hasOwnProperty('email'))
        {
            dispatch(startCreateCustomer(customerInfo));
        }

        handleNewCust();

        swal({
            title: "New Customer added!!",
            // text: "You clicked the button!",
            icon: "success",
            // button: "Aww yiss!",
        });

        dispatch(startCustomerList());

}
    return (
        <div className="container">
            {/* select customer and date*/}
            <div className="row ">
                <div className="col-md-10 ">
                    {/*new customer modal*/}
                    <Modal isOpen={toggle}  className="test w-100">
                    <ModalHeader >Customer details</ModalHeader>
                        <ModalBody>
                             <form className="border border-dark" >
                                <div className="mb-3 mx-2 my-4 d-inline-block" >
                                     <input type="text" className="form-control ml-3 " style={{width:'100%'}} 
                                     name="custName" 
                                    value={custName}
                                    onChange={handleCustChange} placeholder="Enter customer name"/>
                                {/* {nameValidate && <div  className="form-text" style={{color:'red'}}>name should be more than 3 characters</div>} */}
                                </div>

                                <div className="mb-3 mx-2 my-4 d-inline-block">
                                    <input type="text" className="form-control ml-3 " style={{width:'100%'}} 
                                     name="mobile" 
                                    value={mobile}
                                    onChange={handleCustChange} placeholder="Enter mobile"/>
                                {/* {mobileValidate && <div  className="form-text" style={{color:'red'}}>mobile should be a positive value</div>} */}
                                </div>
                                <div className=" my-4 d-inline-block" style={{marginLeft:'8rem'}}>
                                <input type="email" className="form-control mx-auto" style={{width:'100%'}} 
                                name="email" 
                                 value={email}
                                onChange={handleCustChange} placeholder="Enter email"/>
                                {/* {emailValidate && <div  className="form-text" style={{color:'red'}}>Please enter a valid email</div>} */}
                            </div>
                            </form>
                        </ModalBody>
                     <ModalFooter>
                        <Button color="primary" onClick={handleCustSubmit}>Save</Button>{' '}
                        <Button color="secondary" onClick={handleNewCust}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                    <form onSubmit={handleDateCustomerSubmit} className="border border-dark">
                        <h3>Add customer details</h3>
                            <div className="mb-3 mx-2 my-4 d-inline-block" >
                                <label className=".date-label d-block fw-bold">Date</label>
                                <input type="date"  name="date" 
                                    value={date}
                                    className=".date-input"
                                    min="2018-01-01" max="2050-12-31"
                                     onChange={handleChange}></input>
                            </div>
                             <div className="mb-3 mx-2 my-4 d-inline-block" style={{width:'20%'}}>
                                <label className=".date-label fw-bold" >Customer</label>
                                <Select  options={customersOptions} onChange={handleCustomerChange}/>
                            </div>
                            <button className="btn btn-primary" onClick={()=>{handleNewCust()}}>Add New Customer</button>
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
                                <label className=".date-label fw-bold" >Products</label>
                                <Select  options={productsOptions} onChange={handleProductChange}/>
                            </div>

                            <div className="mb-3 mx-2 my-4 d-inline-block" style={{width:'10%'}}>
                                <label className=".date-label fw-bold" >Quantity</label>
                                <Select  options={quantityOptions}  onChange={handleQuantityChange}/>
                            </div>
                        <input type="submit" value={`Add to cart (${cartData.length})`} className="btn btn-success mx-2"/> 
                        
                        {/* <h1>{cartData.length>0 && cartData.length}</h1> */}
                    </form>

                    <hr />
                    <h4>Cart Items - {cartData.length}</h4>
                </div>
            </div>
            {/* cart item*/} 
            { cartData.length>0 && <>
                <div className="row">
                <div className="col-md-10 ">
                    
                        <table className="table table-secondary table-striped" >
                                <thead>
                                    <tr>
                                        <th scope="col">Product Name</th>
                                        <th scope="col"> Price </th>
                                        <th scope="col"> Quantity</th>
                                        <th scope="col">Sub Total</th>
                                        <th scope="col">Remove item</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {cartData.map((prod,i)=>{
                                     return <tr scope="row" key={i}>
                                              <td>{cartProductName(prod.product)}</td>
                                              <td>{cartProductPrice(prod.product)}</td>
                                              <td>{prod.quantity}</td>
                                              <td>{prodSubtotal(cartProductPrice(prod.product)*prod.quantity)}</td>
                                              <td><button className="btn btn-danger" 
                                              onClick={()=>{handleCartDelete(prod)}}>Remove</button></td>
                                          </tr>
                                   })}
                                </tbody>
                            </table>
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 d-flex align-items-center justify-content-center">
                <h5 className="card-title">Bill Total - {cartTotal()} </h5>
                <input type="button" className="btn btn-success mx-5" value="Checkout" onClick={()=>{clearStoreItems()}} />
                </div>
            </div>
            </>
            }

      
            {/*bills listing*/}
            <div className="row">
                 
                <div className="col-md-10">
                    <hr />
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
                                            return <BillItem  bill={bill} findCustEmail={findCustEmail} handleDelete={handleDelete} findCustomer={findCustomer} billsData={billsData} productsData={productsData} key={bill._id}/>
                                        })
                                    }
                                </tbody>
                            </table>
                        
                        ):(
                            <h2>No Bills found</h2>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default Billing

