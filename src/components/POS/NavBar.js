import React from 'react';
import {Link,Route, withRouter,Switch} from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register'; 
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Billing from './login-comps/Billing'
import Products from './login-comps/Products'
import Customers from './login-comps/Customers'
import Profile from './login-comps/Profile'

const NavBar=(props)=> {
    const {userLoggedIn,handleAuth}=props;
    return (
        <div>
            

             <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNavDropdown">
      <ul className="navbar-nav ml-15">
        <li className="nav-item">
          {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
          <Link className="nav-link active " to="/">Home</Link>
        </li>
        {userLoggedIn?(
          <>
            <li className="nav-item">
              <Link className="nav-link active" to="/dashboard">Dashboard</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/customers">Customers</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/products">Products</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/billing">Billing</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/profile">Profile</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="" onClick={()=>{
                            localStorage.removeItem('token');
                            alert('successfully logged out');
                            handleAuth();
                            props.history.push('/');
                        }}>Logout</Link>
            </li>
        </>
        ):(
            <>
            <li className="nav-item">
              <Link className="nav-link active" to="/register">Register</Link>
            </li>

            <li className="nav-item"> 
              <Link className="nav-link active " to="/login">Login</Link>
            </li>
            </>
        )

        }
        
        
      </ul>
    </div>
  </div>
</nav>

              <Switch>
                {/* before login */}
                <Route path="/" component={Home} exact={true}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" render={(props)=>{
                  return <Login
                        {...props}//lec 33, need to pass this prop to get history object n push etc properties
                        handleAuth={handleAuth}
                        />
              }}/>

              {/* after login */}
              <Route path="/billing" component={Billing} exact={true}/>
              <Route path="/customers" component={Customers}/>
              <Route path="/products" component={Products} exact={true}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/dashboard" component={Dashboard}/>

              <ProtectedRoute path="/dashboard" component={Dashboard} userLoggedIn={userLoggedIn}/>
              <Route path="*" component={()=><h1>404 NOT FOUND</h1>}/>
              </Switch>

        </div>
    )
}

// const WrappedComponent=withRouter(NavBar);

// export default WrappedComponent;

export default withRouter(NavBar);
