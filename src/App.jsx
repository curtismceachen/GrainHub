import { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css';
import Users from './pages/Users/Users'
import Auth from './pages/Auth/Auth'



export default class App extends Component {
  
  state = {
    user: null
  }

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData })
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.exp < Date.now() / 1000) {
          localStorage.removeItem('token')
          token = null
        } else {
          this.setState({ user: payload.user })
        }
    }
  }


  render() {
    return (
      <div className="App">
        { this.state.user ? 
          <Routes>
            <Route path='/' element={<Users setUserInState={this.setUserInState}/>} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
          :
          <Auth setUserInState={this.setUserInState}/>
        }
      </div>
    )
  }
}

