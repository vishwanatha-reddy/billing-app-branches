import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import swal from 'sweetalert'

import {startUpdateCustomer} from '../actions/customersAction'

const CustomerItem = (props) => {
    const {customer, handleDelete}=props;

    console.log(customer);

    const dispatch=useDispatch();

    /*for modal start */
    const [name,setName]=useState(customer.name?customer.name:'');
    const [mobile,setMobile]=useState(customer.mobile?customer.mobile:'');

    const [nameValidate,setNameValidate]=useState(false);
    const [mobileValidate,setMobileValidate]=useState(false);

    const [toggle,setToggle]=useState(false);

    const handleToggle=()=>{
        setToggle(!toggle);
    }


     const handleChange=(e)=>{
        if(e.target.name==='name'){
            const result=e.target.value;
            if(result.length<11){
                setName(result)
            }
            
        }else if(e.target.name==='mobile'){
            const result=e.target.value;
            if(result.length<11){
                setMobile(e.target.value)
            }
            
        }
    }

        const handleSubmit=(e)=>{
         e.preventDefault();
         const customerInfo={};

        //product name validation
        if(name.length>=3){
            customerInfo.name=name;
            setNameValidate(false);
        }else{
            setNameValidate(true);
        }

         //mobile validation
        if(mobile.length>0 ){
            customerInfo.mobile=Number(mobile);
            setMobileValidate(false);
        }else{
            setMobileValidate(true);
        }
    
        console.log(customerInfo);

        if(customerInfo.hasOwnProperty('name') && customerInfo.hasOwnProperty('mobile'))
        {
            dispatch(startUpdateCustomer(customerInfo,customer._id));
        }

        handleToggle();

        swal({
            title: "Customer info updated!",
            // text: "You clicked the button!",
            icon: "success",
            // button: "Aww yiss!",
        });
    }

    /*for modal end */

   
    return (
        <tr>
            
                    
                <Modal isOpen={toggle}  className="test">
                    <ModalHeader >Edit Product details</ModalHeader>
                        <ModalBody>
                            <form className="border border-dark" >
                                <div className="mb-3 mx-2 my-4 d-inline-block" >
                                     <input type="text" className="form-control ml-3 " style={{width:'100%',border:nameValidate?'1px solid red':''}} 
                                     name="name" 
                                    value={name}
                                    onChange={handleChange} placeholder="Enter product name"/>
                                {/* {nameValidate && <div  className="form-text" style={{color:'red'}}>name should be more than 3 characters</div>} */}
                                </div>

                                <div className="mb-3 mx-2 my-4 d-inline-block">
                                    <input type="number" className="form-control ml-3 " style={{width:'100%',border:mobileValidate?'1px solid red':''}} 
                                     name="mobile" 
                                    value={mobile}
                                    onChange={handleChange} placeholder="Enter mobile"/>
                                {/* {mobileValidate && <div  className="form-text" style={{color:'red'}}>mobile should be a positive value</div>} */}
                                </div>
                            </form>
                        </ModalBody>
                     <ModalFooter>
                        <Button color="primary" onClick={handleSubmit}>Save</Button>{' '}
                        <Button color="secondary" onClick={handleToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                   
            
                    <td >{customer.name}</td>
                    <td >{customer.mobile}</td> 
                    <td ><button className="mx-2 btn btn-outline-danger"  onClick={()=>{handleDelete(customer)}}>Delete</button></td>
                    <td ><button className="mx-2 btn btn-warning"  onClick={()=>{handleToggle()}}>Edit</button></td>
             
        </tr>
    )
}

export default CustomerItem
