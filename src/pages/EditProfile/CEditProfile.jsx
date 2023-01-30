import { Component } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import './EditProfile.css'


export default class EditProfile extends Component {
    
    state = {
        _id: '',
        email: '',
        username: '',
        shortDescription: '',
        fullDescription: '',
        paymentInfo: '',
        publisherAgreement: false,
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    handleSubmit = async () => {
        let body = {
            _id: this.state._id,
            email: this.state.email,
            username: this.state.username,
            shortDescription: this.state.shortDescription,
            fullDescription: this.state.fullDescription,
            paymentInfo: this.state.paymentInfo,
            publisherAgreement: this.state.publisherAgreement
        }
        let options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        await fetch('/api/users/editProfile', options)
            .then(res => res.json())
            .then(() => {
                this.props.setUserInState(this.state)
            })
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.setState({
            _id: this.props.user._id,
            email: this.props.user.email,
            username: this.props.user.username,
            shortDescription: this.props.user.shortDescription,
            fullDescription: this.props.user.fullDescription,
            paymentInfo: this.props.user.paymentInfo,
            publisherAgreement: this.props.user.publisherAgreement
        })
        console.log(this.state)
    }


    render() {
        return (
          <form className='editProfileForm' onSubmit={this.handleSubmit}>
            <input type='hidden' value={this.state._id}></input>
            <input type='hidden' value={this.state.email}></input>
            <div>
              <h4>Edit Profile</h4>
              <div className="form-group address-update">
                <label className="inputUD"><span className="label"><b>Username</b></span></label>
                <input type="text" className="form-control" name="username" onChange={this.handleChange} value={this.state.username}></input>
              </div>
              <div className="form-group address-update">
                <label className="inputUD"><span className="label"><b>Email</b></span></label>
                <input type="text" className="form-control" name="email" onChange={this.handleChange} value={this.state.email}></input>
              </div>
              {this.props.user.publisherAgreement &&
                <div>
                  <div className="form-group">
                    <label className="inputUD"><span className="label"><b>Short Description</b></span></label>
                    {/* this textarea to be replaced later with a text editor */}
                    <textarea type="text" className="form-control" name="shortDescription" onChange={this.handleChange} value={this.state.shortDescription}></textarea>
                  </div>
                  <div className="form-group">
                    <label className="inputUD"><span className="label"><b>Full Description</b></span></label>
                    {/* this textarea to be replaced later with a text editor */}
                    <textarea type="text" className="form-control" name="fullDescription" onChange={this.handleChange} value={this.state.fullDescription}></textarea>
                  </div>
                  <div className="form-group address-update">
                    <label className="inputUD"><span className="label"><b>Fake Payment Info</b></span></label>
                    <input type="text" className="form-control" name="paymentInfo" onChange={this.handleChange} value={this.state.paymentInfo}></input>
                  </div>
                </div>
              }
              {/* <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit' }}> */}
                <button type="submit" className="btn btn-success">Submit</button>
              {/* </Link> */}
                
            </div>
          </form>
        )
    }
}
