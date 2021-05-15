import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'

import {startUpdateProduct} from '../actions/productsAction'

const EditForm = (props) => {

    const {item, handleToggle}=props;

    const dispatch=useDispatch();

    const [name,setName]=useState(item.name?item.name:'');
    const [price,setPrice]=useState(item.price?item.price:'');

    const [nameValidate,setNameValidate]=useState(false);
    const [priceValidate,setPriceValidate]=useState(false);

    const handleChange=(e)=>{
        if(e.target.name==='name'){
            setName(e.target.value)
        }else if(e.target.name==='price'){
            setPrice(e.target.value)
        }
    }

    const clearFields=()=>{
        setName('');
        setPrice('');
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

        clearFields();

        handleToggle();
    }

    return (
        <div>
            <h3>Edit product details</h3>
            <form onSubmit={handleSubmit} className="border border-dark">
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
                            <input type="submit" value="Save"  className="btn btn-success mx-2"/> 
                            {/* <button type="button" onClick={()=>{handleToggle()}} className="btn btn-success mx-2">save</button> */}
            </form>
        </div>
    )
}

export default EditForm
