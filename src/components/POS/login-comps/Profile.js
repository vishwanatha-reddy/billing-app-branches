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
    
        <div class="card text-center">
            <div class="card-header">
                 User Profile
            </div >
            <div class="card-body">
                <h5 class="card-title">Username - {info.username} </h5>
                <h5 class="card-title">Email - {info.email} </h5>
                <h5 class="card-title">Business Name - {info.businessName} </h5>
                <h5 class="card-title">Address - {info.address}</h5> 
            </div>
            <div class="card-footer text-muted">
            POS - billing app user
            </div>
        </div>
</div>
    )
}

export default Profile