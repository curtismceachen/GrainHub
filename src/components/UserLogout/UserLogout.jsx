import React from 'react'
import './UserLogout.css'


class UserLogout extends React.Component {
    
    changeLoginStatus = () => {
        localStorage.removeItem('token')
        this.props.setUserInState(null)
    }
  
    render() {
        return (
          
            <button className="btn btn-light" onClick={this.changeLoginStatus}>Log out</button>
            // <button className="btn btn-light" onClick={this.changeLoginStatus}>Log out</button>
            
        )
    }
}

export default UserLogout