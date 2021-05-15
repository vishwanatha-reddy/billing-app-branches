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
        <div>
            <h2>username - {info.username} </h2>
            <h2>email - {info.email}</h2>
            <h3>business name - {info.businessName}</h3>
            <h3>address - {info.address}</h3>
        </div>
    )
}

export default Profile