import React from 'react'
import {Route,Redirect} from 'react-router-dom'

const ProtectedRoute=({component:Component,...rest})=> {
    // const {userLoggedIn}=props;
    console.log(rest.userLoggedIn);
    return (
        <Route
        {...rest}
        render={props=>{
           return rest.userLoggedIn?(<Component {...props}/>
                ):(
                <Redirect to={{
                    pathname:"/login",
                    state:{from:props.location}
                }}/>)
            
        }}
        />
    )
}

export default ProtectedRoute
