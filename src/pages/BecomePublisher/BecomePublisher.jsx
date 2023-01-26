import { Component } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import './BecomePublisher.css'


export default class BecomePublisher extends Component {
    
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

    handleCBChange = (e) => {
        this.setState({publisherAgreement:!this.state.publisherAgreement})
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
        await fetch('/api/publishers/becomePublisher', options)
            .then(res => res.json())
            .then(() => {
                this.props.setUserInState(this.state)
            })
    }

    componentDidMount() {
        this.setState({
            _id: this.props.user._id,
            email: this.props.user.email,
            username: this.props.user.username,
            shortDescription: this.props.user.shortDescription,
            fullDescription: this.props.fullDescription,
            paymentInfo: this.props.user.paymentInfo,
            publisherAgreement: this.props.user.publisherAgreement
        })
    }


    render() {
        return (
          <form className='becomePublisherForm' onSubmit={this.handleSubmit}>
            <input type='hidden' value={this.state._id}></input>
            <input type='hidden' value={this.state.email}></input>
            <div>
              <h4>Become A Publisher</h4>
              <h6>{this.state.username}</h6>
              {/* <div className="form-group name-update">
                <label className="inputUD"><span className="label"><b>Username</b></span></label>
                <input type="text" className="form-control" name="username" onChange={this.handleChange} value={this.state.username}></input>
              </div> */}
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
              <div className="form-group address-update">
                <label className="inputUD"><span className="label"><b>Fake Publisher Agreement</b></span></label>
                <input type="checkbox" name="publisherAgreement" required onClick={this.handleCBChange} value={this.state.publisherAgreement}></input>
              *</div>
              <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <input type="submit" className="btn btn-success"></input>
              </Link>
            </div>
          </form>
        )
    }
}
