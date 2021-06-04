import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { Link,Switch, Route , withRouter} from 'react-router-dom';
import swal from 'sweetalert';

import { SidebarData } from './SidebarData';
import './Sidebar.css';
import Profile from '../../login-comps/Profile';
import Dashboard  from '../../Dashboard';
import Customers from '../../login-comps/Customers'
import Products from '../../login-comps/Products'
import Billing from '../../login-comps/Billing'
import ProtectedRoute from '../../ProtectedRoute';
import Login from '../../Login';

const SideBar=(props)=> {

  const {handleAuth,userLoggedIn}=props;
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>    
              <h3 style={{color:'white',marginLeft:'33%'}} >POS - Billing application</h3>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
              
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="nav-text">
              <Link className="nav-link active" to="" onClick={()=>{
                            localStorage.removeItem('token');
                            swal({
                                title: "Logged out successfully",
                                icon: "success",
                            });
                            handleAuth();
                            props.history.push('/');
                        }}><RiIcons.RiLogoutCircleRLine className="mRight"  />Logout</Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>

      <Switch>
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/products' component={Products} />
          <Route path='/customers' component={Customers} />
          <Route path='/billing' component={Billing} />
          <Route path='/profile' component={Profile} />
          <Route path="/login" render={(props)=>{
                  return <Login
                        {...props}
                        handleAuth={handleAuth}
                        />
              }}/>

          <ProtectedRoute path="/dashboard" component={Dashboard} userLoggedIn={userLoggedIn}/>
            <Route path="*" component={()=><h1>404 NOT FOUND</h1>}/>
        </Switch>
    </>

    
  );
}

export default withRouter(SideBar);
