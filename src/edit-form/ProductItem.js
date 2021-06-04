import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import swal from 'sweetalert';

import {startUpdateProduct} from '../actions/productsAction'

const ProductItem = (props) => {
    const {item, handleDelete}=props;

    const dispatch=useDispatch();

    /*for modal start */
    const [name,setName]=useState(item.name?item.name:'');
    const [price,setPrice]=useState(item.price?item.price:'');

    const [nameValidate,setNameValidate]=useState(false);
    const [priceValidate,setPriceValidate]=useState(false);

    const [toggle,setToggle]=useState(false);

    const handleToggle=()=>{
        setToggle(!toggle);
    }


     const handleChange=(e)=>{
        if(e.target.name==='name'){
            setName(e.target.value)
        }else if(e.target.name==='price'){
            setPrice(e.target.value)
        }
    }

        const handleSubmit=(e)=>{
         e.preventDefault();
         const productInfo={};

        //product name validation
        if(name.length>=3){
            productInfo.name=name;
            setNameValidate(false);
        }else{
            setNameValidate(true);
        }

         //price validation
        if(Number(price)>0){
            productInfo.price=Number(price);
            setPriceValidate(false);
        }else{
            setPriceValidate(true);
        }
    
        console.log(productInfo);

        dispatch(startUpdateProduct(productInfo,item._id));

        handleToggle();

        swal({
            title: "Product info updated!",
            // text: "You clicked the button!",
            icon: "success",
            // button: "Aww yiss!",
        });
    }

    /*for modal end */

   
    return (
        <tr>
            
                    {/* <EditForm handleSubmit={handleSubmit} handleToggle={handleToggle} item={item}/> */}
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
                                    <input type="text" className="form-control ml-3 " style={{width:'100%',border:priceValidate?'1px solid red':''}} 
                                     name="price" 
                                    value={price}
                                    onChange={handleChange} placeholder="Enter price"/>
                                {/* {priceValidate && <div  className="form-text" style={{color:'red'}}>price should be a positive value</div>} */}
                                </div>
                            </form>
                        </ModalBody>
                     <ModalFooter>
                        <Button className="save-btn border border-dark"  onClick={handleSubmit}>Save</Button>{' '}
                        <Button color="secondary" className="border border-dark" onClick={handleToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                   
            
                    <td >{item.name}</td>
                    <td >{item.price}</td> 
                    <td ><button className="mx-2 btn remove-button border border-dark"  onClick={()=>{handleDelete(item)}}>Delete</button></td>
                    <td ><button className="mx-2 btn edit-btn border border-dark"  onClick={()=>{handleToggle()}}>Edit</button></td>
            
        </tr>
    )
}

export default ProductItem
