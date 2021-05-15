import React,{useState} from 'react'
import EditForm from './EditForm'


const ProductItem = (props) => {
    const {item, handleDelete,handleSubmit}=props;

    const [toggle,setToggle]=useState(false);

    const handleToggle=()=>{
        setToggle(!toggle);
    }

    return (
        <div>
            {toggle?(
                <div>
                    <EditForm handleSubmit={handleSubmit} handleToggle={handleToggle} item={item}/>
                    <button onClick={()=>{handleToggle()}} className="btn border border-dark mx-2 btn-dark ">cancel</button>
                </div>
            ):(
                <div>
                    <p> {item.name} - {item.price}</p>
                    <button className="mx-2"  onClick={()=>{handleDelete(item)}}>delete</button>
                    <button className="mx-2"  onClick={()=>{handleToggle()}}>Edit</button>
                </div>
            )}
        </div>
    )
}

export default ProductItem
