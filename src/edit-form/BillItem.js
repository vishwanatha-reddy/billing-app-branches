import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';




const BillItem = (props) => {
    const {bill, findCustomer,handleDelete}=props;

    const dispatch=useDispatch();

    /*for modal start */
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [date,setDate]=useState('');
 

     const [toggle,setToggle]=useState(false);

    const handleToggle=()=>{
        setToggle(!toggle);
    }

   
    return (
        <tr>
            {toggle?(
                <>
                <Modal isOpen={toggle}  className="test">
                    <ModalHeader >Bill details</ModalHeader>
                        <ModalBody>
                            <h3 > Date of purchase - {moment(bill.date).format('YYYY-MM-DD')}</h3>
                            <h3 >Customer name - {findCustomer(bill.customer)}</h3> 
                            <h3>total cost - {bill.total}</h3>
                            <h3> Items purchased - {bill.lineItems[0].quantity}</h3>
                        </ModalBody>
                     <ModalFooter>
                        <Button color="secondary" onClick={handleToggle}>Close</Button>
                    </ModalFooter>
                </Modal>
                   
                </>
            ):(
                <>
                    <td >{moment(bill.date).format('YYYY-MM-DD')}</td>
                    <td >{findCustomer(bill.customer)}</td> 
                    <td>{bill.total}</td>
                    <td ><button className="mx-2 btn btn-warning"  onClick={()=>{handleToggle()}}>View Bill</button></td>
                    <td ><button className="mx-2 btn btn-danger"  onClick={()=>{handleDelete(bill._id)}}>Delete Bill</button></td>
                </>
            )}
        </tr>
    )
}

export default BillItem
