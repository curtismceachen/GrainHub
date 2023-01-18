import {Component} from 'react'
import React from 'react'

export default class SubscribeButton extends Component {

    state = {
        user: false,
    }

    handleSubscribe = async (id) => {
        let body = {userId: this.props.user._id, pubId: id}
        let options = {
            method: 'Put', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        let response = await fetch('/api/users/addSubscription', options)
            let data = await response.json()
            this.props.setUserInState(data)
    }

    componentDidMount() {
        this.setState({
            user: this.props.user,
        })
    }

    render() {
        return (
            <button className="btn btn-success btn-sm" onClick={() => this.handleSubscribe(this.props.publisher._id)}>Subscribe</button>
        )
    }

}