import { Component } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css';
import Discover from './pages/Discover/Discover'
import Auth from './pages/Auth/Auth'
import Navbar from './components/Navbar/Navbar'
import EditProfile from './pages/EditProfile/EditProfile'
import NewIdea from './pages/NewIdea/NewIdea'
import PubProfile from './pages/PubProfile/PubProfile'
import PubIdeas from './pages/PubIdeas/PubIdeas'


export default class App extends Component {
  
  state = {
    user: false,
  }

  setUserInState = (incomingUserData) => {
    console.log('incoming userdata: ' + incomingUserData)
    this.setState({user: incomingUserData})
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.exp < Date.now() / 1000) {
          localStorage.removeItem('token')
          token = null
        } else {
          console.log('payload.user: ' + JSON.stringify(payload.user))
          this.setState({ user: payload.user })
        }
    }
  }


  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} setUserInState={this.setUserInState}/>
        <Routes>
          <Route path='/ideas/create' element={<NewIdea user={this.state.user} setUserInState={this.setUserInState}/>}/>
          <Route path='/users/editprofile' element={<EditProfile user={this.state.user} setUserInState={this.setUserInState}/>} />
          <Route path='/publishers/show/:id' element={<PubProfile user={this.state.user}/>}/>
          <Route path='/ideas/show/:id' element={<PubIdeas user={this.state.user}/>}/>
          <Route path='/' element={<Discover user={this.state.user} setUserInState={this.setUserInState}/>} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    )
  }
}

