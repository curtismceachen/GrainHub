import React from 'react'
import './UserLogout.css'
import { redirect, Link } from 'react-router-dom'
import { useState } from 'react'


class UserLogout extends React.Component {
// export default function UserLogout (props) {
    

    // const [user, setUser] = useState()

    changeLoginStatus = () => {
        this.props.setUserInState(false)
        // setUser(false)
        localStorage.removeItem('token')
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