import React from 'react'
import image from './pexels.jpg'

const Home=(props)=> {
    return (
        <div className="container ">
            <h1 className="display-1">Billing Application</h1>
            <div className="row">
                <div className="col-md-10">
                    <img src={image} style={{width:'70rem',height:'30rem'}} className="img-fluid" alt="Responsive image"></img>
                </div>
            </div>
            <div className="row ">
                <div className="col-md-10">
                    <h3 className="mt-5">Credentials to sign in to application</h3>
                    <div>
                        <h4 className="d-inline">Email id</h4> - <h5 className="d-inline">vreddym@gmail.com</h5>
                    </div>
                    <div>
                        <h4 className="d-inline">Password</h4> - <h5 className="d-inline" >vreddym@123</h5>
                    </div>
                    <h5 className="mt-3">Please navigate to the Login page, and enter above credentials to explore the application.</h5>
                </div>
            </div>
        </div>
    )
}

export default Home
