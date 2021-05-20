import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import MaterialTable from 'material-table'

import {asyncDeleteProduct, startProductsList} from '../../../actions/productsAction'
import {startCreateProduct} from '../../../actions/productsAction'

import ProductItem from '../../../edit-form/ProductItem'


 const Products = (props) => {
    const [name, setName]=useState('');
    const [price,setPrice]=useState('');

    

    const [nameValidate,setNameValidate]=useState(false);
    const [priceValidate,setPriceValidate]=useState(false);

      const dispatch=useDispatch();

    const productsData=useSelector((store)=>{
        return store.products;
    })

    console.log(productsData);

    useEffect(()=>{
        dispatch(startProductsList());
    },[])


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

        //customerName validation
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

        dispatch(startCreateProduct(productInfo));

        clearFields();

    }

    const handleDelete=(item)=>{
        console.log(item);
        dispatch(asyncDeleteProduct(item._id));
    }


    return (
        <div className="container">
            <div className="row ">
                <div className="col-md-10 ">
                    <h2>Add products</h2>
                    <form onSubmit={handleSubmit} className="border border-dark">
                            <div className="mb-3 mx-2 my-4 d-inline-block" >
                                <input type="text" className="form-control ml-3 " style={{width:'100%',border:nameValidate?'1px solid red':''}} 
                                name="name" 
                                value={name}
                                onChange={handleChange} placeholder="Enter product name"/>
                                {nameValidate && <div  className="form-text" style={{color:'red'}}>name should be more than 3 characters</div>}
                            </div>

                            <div className="mb-3 mx-2 my-4 d-inline-block">
                                <input type="text" className="form-control ml-3 " style={{width:'100%',border:priceValidate?'1px solid red':''}} 
                                name="price" 
                                value={price}
                                onChange={handleChange} placeholder="Enter price"/>
                                {priceValidate && <div  className="form-text" style={{color:'red'}}>price should be a positive value</div>}
                            </div>

                            <input type="submit" value="Save" className="btn btn-success mx-2"/> 
                            <input type="button" value="Cancel" className="btn border border-dark mx-2 "/> 
                    </form>

                    <hr/>

                    <h1>Existing Products</h1>
                   { productsData.length>0 ?(
                        <div>
                            {/* <ol>
                        {
                            productsData.map((item)=>{
                                return  <ProductItem handleDelete={handleDelete} handleSubmit={handleSubmit} item={item} key={item._id}/>
     
                            })
                        }
                    </ol> */}
                        <div >
                            <table className="table table-success table-striped table-hover" >
                                <thead>
                                    <tr>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Product Price</th>
                                        <th scope="col">Delete Product</th>
                                        <th scope="col">Edit product</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productsData.map((item)=>{
                                            return <ProductItem handleDelete={handleDelete} handleSubmit={handleSubmit} item={item} key={item._id}/>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    
                    
                        </div>
                        ):(
                            <h2>No Products found</h2>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Products
