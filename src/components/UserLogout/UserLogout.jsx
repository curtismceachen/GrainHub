import React from 'react'
import './UserLogout.css'
import { redirect, Link } from 'react-router-dom'
import { useState } from 'react'


class UserLogout extends React.Component {

    changeLoginStatus = () => {
        this.props.setUserInState(false)
        localStorage.removeItem('token')
        this.props.showAuthSidebar(false)
    }
  
    render() {
        return (
        <Link to='/' style={{color: 'inherit', textDecoration: 'inherit'}}>
          {/* <button className="btn btn-light" </button> */}
          <a className='dropdown-item' href='#' onClick={this.changeLoginStatus}>Log out</a>
        </Link>
        )
    }
}

export default UserLogout