import React from 'react'
import './UserLogout.css'
import { redirect, Link } from 'react-router-dom'


class UserLogout extends React.Component {
    
    changeLoginStatus = () => {
        localStorage.removeItem('token')
        this.props.setUserInState(false)
        this.props.showAuthSidebar(false)
    }
  
    render() {
        return (
        <Link to='/' style={{color: 'inherit', textDecoration: 'inherit'}}>
          <button className="btn btn-light" onClick={this.changeLoginStatus}>Log out</button>
        </Link>
        )
    }
}

export default UserLogout