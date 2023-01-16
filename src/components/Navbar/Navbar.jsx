import React, { useState, useEffect } from 'react'
import UserLogout from '../UserLogout/UserLogout'
import Auth from '../../pages/Auth/Auth'
import './Navbar.css'
import { Link } from 'react-router-dom'


export default function Navbar(props) {

    const [sidebar, setAuthSidebar] = useState(false)

    const showAuthSidebar = () => setAuthSidebar(!sidebar)
    
    // useEffect(() => {
    //   setAuthSidebar(!sidebar)
    //   console.log(sidebar)
    // }, [])
    
    return (
      <main>
          <nav className="navbar navbar-expand-lg navbar-light shadow p-3 mb-5 bg-white rounded fixed-top justify-content-between">
            <div className="navbar-brand theme-font">
            <Link to='/' style={{color: 'inherit', textDecoration: 'inherit'}}>
              Investing Ideas
            </Link>
            </div>
            <Link to='/' style={{color: 'inherit', textDecoration: 'inherit'}}>
              Discover
            </Link>
            {props.user.publisherAgreement ?
              <div className='theme-font'>
                <Link to='/ideas/create' style={{color: 'inherit', textDecoration: 'inherit'}}>
                  Post an Investing Idea
                </Link>
              </div>
            :
            props.user &&
              <div className="theme-font">
                <Link to='/users/editprofile' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                  Become A Publisher
                </Link>
              </div>
            }
            {props.user ?
            <UserLogout setUserInState={props.setUserInState} showAuthSidebar={showAuthSidebar}/>
            :
            <div>
              <button className="btn btn-light" onClick={showAuthSidebar}>Log in</button>
              <div className={sidebar ? 'auth-panel active' : 'auth-panel'}>
                <div onClick={showAuthSidebar}>X</div>
                <Auth setUserInState={props.setUserInState} />
              </div>
            </div>
            }
          </nav>
        </main>
    )
}