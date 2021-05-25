import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import { Preview, print } from 'react-html2pdf';

const BillItem = (props) => {
    const {bill, findCustomer,findCustEmail,handleDelete,productsData,billsData}=props;

    const dispatch=useDispatch();

    const ids = ['1']

    /*for modal start */
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [date,setDate]=useState('');
 

     const [toggle,setToggle]=useState(false);
     const [pdfToggle,setPdfToggle]=useState(false);

    const handleToggle=()=>{
        setToggle(!toggle);
    }

    //find product name
    let prodName='product deleted';
    const findProduct=(id)=>{
      console.log(id,'prod id');
      productsData.forEach((item)=>{
        if(item._id==id){
          prodName=item.name;
        }
      })
      return prodName;
    }
    console.log(prodName);
    console.log(productsData,'prods data');
    console.log(bill);
   
    return (
        <tr >
                <Modal isOpen={toggle}  className="test">
                    <ModalHeader >Bill details</ModalHeader>
                        <ModalBody>
                              {/*react html 2 pdf*/}   
                            <Preview id={'jsx-template'} >
                              <h5 className="d-inline-block">Bill Date - </h5><span >{moment(bill.date).format('YYYY-MM-DD')}</span><br />
                              <h5 className="d-inline-block">Email - </h5><span>{findCustEmail(bill.customer)}</span><br />
                              <h5 className="d-inline">Customer Name - </h5><span >{findCustomer(bill.customer)}</span><br />
                              <table className="table table-secondary table-striped" >
                                <thead>
                                    <tr>
                                        <th scope="col">Product Name</th>
                                        <th scope="col"> Price </th>
                                        <th scope="col"> Quantity</th>
                                        <th scope="col">Sub Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {bill.lineItems.map((item,i)=>{
                                     return <tr scope="row" key={i}>
                                              <td>{findProduct(item.product)}</td>
                                              <td>{item.price}</td>
                                              <td>{item.quantity}</td>
                                              <td>{item.subTotal}</td>
                                          </tr>
                                   })}
                                   <tr scope="row"> 
                                     <td><strong>Bill Total</strong> - {bill.total}</td>
                                     <td></td>
                                     <td></td>
                                     <td></td>
                                   </tr>
                                </tbody>
                            </table>
                            <h5 className="d-inline"></h5><span ></span><br />
                          </Preview>
                            {/*react html 2 pdf end*/} 
                        </ModalBody>
                     <ModalFooter>
                       <button className="btn btn-success" onClick={()=>print(`${findCustomer(bill.customer)} - ${moment(bill.date).format('YYYY-MM-DD')} invoice`, 'jsx-template')}>Download Bill</button>
                        <Button color="secondary" onClick={handleToggle}>Close</Button>
                    </ModalFooter>
                </Modal>

                    <td >{moment(bill.date).format('YYYY-MM-DD')}</td>
                    <td >{findCustomer(bill.customer)}</td> 
                    <td>{bill.total}</td>
                    <td ><button className="mx-2 btn btn-warning"  onClick={()=>{handleToggle()}}>View Bill</button></td>
                    <td ><button className="mx-2 btn btn-danger"  onClick={()=>{handleDelete(bill._id)}}>Delete Bill</button></td>
                </tr>
    )
}

export default BillItem
