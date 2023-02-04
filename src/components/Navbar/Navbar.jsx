import React, { useState, useEffect } from 'react'
import UserLogout from '../UserLogout/UserLogout'
import Auth from '../../pages/Auth/Auth'
import './Navbar.css'
import { Link } from 'react-router-dom'


export default function Navbar(props) {

    const [sidebar, setAuthSidebar] = useState(false)

    const showAuthSidebar = () => setAuthSidebar(!sidebar)
    const profilePic = props.user.profilePic
    
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
            {props.user &&
              <Link to={`/ideas/ideasFeed/${props.user._id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>
                Feed
              </Link>
            }
            {props.user && (
              props.user.publisherAgreement ?
                <div className='theme-font'>
                  <Link to='/ideas/create' style={{color: 'inherit', textDecoration: 'inherit'}}>
                    Post an Investing Idea
                  </Link>
                </div>
              :
              props.user &&
                <div className="theme-font">
                  <Link to='/publishers/becomePublisher' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    Become A Publisher
                  </Link>
                </div>
            )}
            {props.user ?
              <div className='dropdown show'>
                {props.user.profilePic ?
                  <img className='navProfilePic' data-bs-toggle='dropdown' aria-expanded='false' src={props.user.profilePic}></img>
                :
                <button type='button' className="btn btn-secondary dropdown-toggle" data-bs-toggle='dropdown' aria-expanded='false'>Profile</button>
                }
                <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                  {props.user.publisherAgreement ?
                    <Link to={`/publishers/show/${props.user._id}`} style={{ color: 'inherit', textDecoration: 'inherit' }} >
                      <div className='dropdown-item' href='#'>Profile</div>
                    </Link>
                  :
                    <Link to={`/users/getProfile/${props.user._id}`} style={{ color: 'inherit', textDecoration: 'inherit' }} >
                      <div className='dropdown-item' href='#'>Profile</div>
                    </Link>
                  }
                  <Link to={`/users/editProfile/${props.user._id}`} style={{ color: 'inherit', textDecoration: 'inherit' }} >
                    <div className='dropdown-item' href='#'>Edit Profile</div>
                  </Link>
                  <UserLogout setUserInState={props.setUserInState} showAuthSidebar={showAuthSidebar}/>
                </div>
              </div>
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