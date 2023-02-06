import { Component } from 'react'
import {useEffect, useState} from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Discover from './pages/Discover/Discover'
import Navbar from './components/Navbar/Navbar'
import EditProfile from './pages/EditProfile/EditProfile'
import BecomePublisher from './pages/BecomePublisher/BecomePublisher'
import NewIdea from './pages/NewIdea/NewIdea'
import PubProfile from './pages/PubProfile/PubProfile'
import PubIdeas from './pages/PubIdeas/PubIdeas'
import IdeasFeed from './pages/IdeasFeed/IdeasFeed'
import UserProfile from './pages/UserProfile/UserProfile'


export default class App extends Component {

  state = {
      user: false,
  }

  setUserInState = (incomingUserData) => {
      this.setState({user: incomingUserData})
  }

  loginStatus = async () => {
      let token = localStorage.getItem('token')
      if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]))
          if (payload.exp < Date.now() / 1000) {
              localStorage.removeItem('token')
              token = null
          } else {
              try {
                  console.log('payload.user: ' + JSON.stringify(payload.user))
                  let userId = payload.user._id
                  console.log(userId)
                  await fetch(`/api/users/getProfile/${userId}`)
                      .then(res => res.json())
                      .then(data => this.setState(data))
                      .then(console.log(JSON.stringify(this.state.user)))
              } catch (error) {
                  console.log(error)
              }
          }
      }
  }

  async componentDidMount() {
      await this.loginStatus()
  }

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} setUserInState={this.setUserInState}/>
        <Routes>
          <Route path='/ideas/create' element={<NewIdea user={this.state.user} setUserInState={this.setUserInState}/>}/>
          <Route path='/users/getProfile/:userId' element={<UserProfile user={this.state.user} setUserInState={this.setUserInState}/>}/>
          <Route path='/users/editProfile/:userId' element={<EditProfile user={this.state.user} setUserInState={this.setUserInState}/>}/>
          <Route path='/publishers/becomePublisher/:userId' element={<BecomePublisher user={this.state.user} setUserInState={this.setUserInState}/>} />
          <Route path='/users/addSubscription'/>
          <Route path='/users/removeSubscription'/>
          <Route path='/publishers/show/:id' element={<PubProfile user={this.state.user}/>}/>
          <Route path='/ideas/show/:id' element={<PubIdeas user={this.state.user}/>}/>
          <Route path='/ideas/ideasFeed/:userId' element={<IdeasFeed user={this.state.user}/>}/>
          <Route path='/discover/:id' element={<Discover user={this.state.user} setUserInState={this.setUserInState}/>}/>
          <Route path='*' element={<Navigate to='/discover/:id' replace />}/>
        </Routes>
      </div>
    )
  }
}

