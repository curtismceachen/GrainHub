import { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css';
import Auth from './pages/Auth/Auth'



export default class App extends Component {
  
  state = {
    user: null
  }

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData })
  }

  render() {
    return (
    <div className="App">
      <Auth setUserInState={this.setUserInState}/>
      Investing Ideas
    </div>
    )
  }
}

