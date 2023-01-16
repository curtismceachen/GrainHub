import React from 'react'
import './UserLogout.css'
import { redirect } from 'react-router-dom'


class UserLogout extends React.Component {
    
    changeLoginStatus = () => {
        localStorage.removeItem('token')
        this.props.setUserInState(null)
        return redirect('/')
    }
  
    render() {
        return (
        // <Link to='/' style={{color: 'inherit', textDecoration: 'inherit'}}>
          <button className="btn btn-light" onClick={this.changeLoginStatus}>Log out</button>
        // </Link>
        )
    }
}

export default UserLogout