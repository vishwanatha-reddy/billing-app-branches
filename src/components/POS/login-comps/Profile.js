import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import {asyncUserInfo} from '../../../actions/userInfoAction'

const Profile=(props)=> {

    const dispatch=useDispatch();
    
    const info=useSelector((store)=>{
        return store.userInfo;
    })

    // console.log(info,'from profile comp');

    useEffect(()=>{
        dispatch(asyncUserInfo());
    },[])


    return (
<div className="w-100 d-flex align-items-center justify-content-center m-5">
    
        <div className="card text-center">
            <div className="card-header">
                 User Profile
            </div >
            <div className="card-body">
                <h5 className="card-title">Username - {info.username} </h5>
                <h5 className="card-title">Email - {info.email} </h5>
                <h5 className="card-title">Business Name - {info.businessName} </h5>
                <h5 className="card-title">Address - {info.address}</h5> 
            </div>
            <div className="card-footer text-muted">
            POS - billing application
            </div>
        </div>
</div>
    )
}

export default Profile