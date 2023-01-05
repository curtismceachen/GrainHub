import { Component } from 'react'
import React from 'react'
import './EditProfile.css'


export default class EditProfile extends Component {
    
    state = {
        _id: '',
        username: '',
        description: '',
        paymentInfo: '',
        publisherAgreement: false,
    }

    // handleCheckboxChange = () => {
    //     this.setState({publisherAgreement:(!this.state.publisherAgreement)})
    // }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = async () => {
        let body = {
            _id: this.state._id,
            username: this.state.username,
            description: this.state.description,
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
        await fetch('/api/users/editprofile', options)
            .then(res => res.json())
    }

    componentDidMount() {
        console.log('props.user._id: ' + this.props.user._id)
        this.setState({
            _id: this.props.user._id,
            username: this.props.user.username,
            description: this.props.user.description,
            paymentInfo: this.props.user.paymentInfo,
            publisherAgreement: this.props.user.publisherAgreement
        })
    }


    render() {
        return (
          <form className='editProfileForm' onSubmit={this.handleSubmit}>
            <input type='hidden' value={this.state._id}></input>
            <div>
              <div className="form-group name-update">
                <label className="inputUD"><span className="label"><b>Username</b></span></label>
                <input type="text" className="form-control" name="username" onChange={this.handleChange} value={this.state.username}></input>
              </div>
              <div className="form-group">
                <label className="inputUD"><span className="label"><b>Description</b></span></label>
                {/* this textarea to be replaced later with a text editor */}
                <textarea type="text" className="form-control" name="description" onChange={this.handleChange} value={this.state.description}></textarea>
              </div>
              <div className="form-group address-update">
                <label className="inputUD"><span className="label"><b>Fake Payment Info</b></span></label>
                <input type="text" className="form-control" name="paymentInfo" onChange={this.handleChange} value={this.state.paymentInfo}></input>
              </div>
              <div className="form-group address-update">
                <label className="inputUD"><span className="label"><b>Fake Publisher Agreement</b></span></label>
                <input type="checkbox" name="publisherAgreement" onClick={()=>this.setState({publisherAgreement:!this.state.publisherAgreement})} value={this.state.publisherAgreement}></input>
              </div>
              <input type="submit" className="btn btn-success"></input>
            </div>
          </form>
        )
    }
}
