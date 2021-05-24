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
                
            </div>
        </div>
    )
}

export default Home
