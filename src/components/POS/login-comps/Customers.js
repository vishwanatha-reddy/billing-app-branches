import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import validator from 'validator';

import {asyncDeleteCustomer, startCustomerList} from '../../../actions/customersAction'
import {startCreateCustomer} from '../../../actions/customersAction'

 const Customers = (props) => {
    const [name, setName]=useState('');
    const [phone,setPhone]=useState('');
    const [email, setEmail]=useState('');

    const [nameValidate,setNameValidate]=useState(false);
    const [phoneValidate,setPhoneValidate]=useState(false);
    const [emailValidate,setEmailValidate]=useState(false);

      const dispatch=useDispatch();

    const customersData=useSelector((store)=>{
        return store.customers;
    })

    console.log(customersData);

    useEffect(()=>{
        dispatch(startCustomerList());
    },[])

  

    const handleChange=(e)=>{
        if(e.target.name==='name'){
            setName(e.target.value)
        }else if(e.target.name==='email'){
            setEmail(e.target.value)
        }else if(e.target.name==='phonenumber'){
            setPhone(e.target.value)
        }
    }

    const clearFields=()=>{
        setName('');
        setPhone('');
        setEmail('');
    }

    const handleSubmit=(e)=>{
         e.preventDefault();
        //  console.log(validator.isEmail(email));
         const correctEmail=validator.isEmail(email)?email:'';
         const customerInfo={};

        //customerName validation
        if(name.length>10){
            customerInfo.name=name;
            setNameValidate(false);
        }else{
            setNameValidate(true);
        }

         //phone validation
        if(phone.length>8 && phone.length<128){
            customerInfo.phone=Number(phone);
            setPhoneValidate(false);
        }else{
            setPhoneValidate(true);
        }

         //email validation
        if(correctEmail.length>0){
            customerInfo.email=correctEmail;
            setEmailValidate(false)
        }else{
            setEmailValidate(true)
        }
        console.log(customerInfo);

        dispatch(startCreateCustomer(customerInfo));

        clearFields();

    }

    const handleDelete=(item)=>{
        console.log(item);
        dispatch(asyncDeleteCustomer(item._id));
    }



    return (
        <div className="container">
            <div className="row ">
                <div className="col-md-10 ">
                    <h2>Add customers</h2>
                    <form onSubmit={handleSubmit} className="border border-dark">
                            <div className="mb-3 mx-2 my-4 d-inline-block" >
                                <input type="text" className="form-control ml-3 " style={{width:'100%',border:nameValidate?'1px solid red':''}} 
                                name="name" 
                                value={name}
                                onChange={handleChange} placeholder="Enter customer name"/>
                                {nameValidate && <div  className="form-text" style={{color:'red'}}>name should be more than 10 characters</div>}
                            </div>

                            <div className="mb-3 mx-2 my-4 d-inline-block">
                                <input type="text" className="form-control ml-3 " style={{width:'100%',border:phoneValidate?'1px solid red':''}} 
                                name="phonenumber" 
                                value={phone}
                                onChange={handleChange} placeholder="Enter phone number"/>
                                {phoneValidate && <div  className="form-text" style={{color:'red'}}>price</div>}
                            </div>

                            <div className="mb-3 mx-2 my-4 d-inline-block">
                                <input type="email" className="form-control mx-auto" style={{width:'100%',border:emailValidate?'1px solid red':''}} 
                                name="email" 
                                 value={email}
                                onChange={handleChange} placeholder="Enter email"/>
                                {emailValidate && <div  className="form-text" style={{color:'red'}}>Please enter a valid email</div>}
                            </div>
                            <input type="submit" value="Save" className="btn btn-success mx-2"/> 
                            <input type="button" value="Cancel" className="btn border border-dark mx-2 "/> 
                    </form>

                    <hr/>

                    <h1>Existing Customers</h1>
                   { customersData.length>0 ?(
                        <ol>
                        {
                            customersData.map((item)=>{
                                return <li key={item._id}>
                                     {item.name} - {item.email} 
                                <button className="mx-2"  onClick={()=>{handleDelete(item)}}>delete</button>
                                <button className="mx-2"  onClick={()=>{handleDelete(item)}}>Edit</button></li>
                            })
                        }
                    </ol>
                        ):(
                            <h2>No Customers found</h2>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Customers
