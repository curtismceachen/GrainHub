import { Component } from 'react'
import { Link } from 'react-router-dom'
import UserLogout from '../../components/UserLogout/UserLogout'
import React from 'react'
import './NewIdea.css';


export default class NewSpot extends Component {
    
    state = {
        title: '',
        thesis: '',
        ticker: '',
        longOrShort: '',
    }
    
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }

    handleSubmit = async () => {

        let body = {
            title: this.state.title,
            thesis: this.state.thesis,
            ticker: this.state.ticker,
            longOrShort: this.state.longOrShort,
            user: this.props.user
        }

        let options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        
        await fetch("/api/ideas/create", options)
            .then(res => res.json())
            .then(() =>
                this.setState({
                    title: '',
                    thesis: '',
                    ticker: '',
                    longOrShort: '',
                })
            )
    }


    render() {
        return (
          <main>
            <main className="newspot-background-image">
              <form className='newIdeaForm' onSubmit={this.handleSubmit}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 fade-edge">
                      <h3 className="title theme-font">Post An Idea</h3>
                      <div className="form-group secondary-font title">
                        <label className="input"><b>Title</b></label>
                        <input type="text" className="form-control" name="title" placeholder="Title" onChange={this.handleChange} value={this.name}></input>
                      </div>
                      <div className="form-group secondary-font thesis">
                        <label className="input"><b>Thesis</b></label>
                        <textarea type="text" className="form-control" name="thesis" placeholder="Thesis" onChange={this.handleChange} value={this.description}></textarea>
                      </div>
                      <div className="form-group secondary-font ticker">
                        <label className="input"><b>Ticker Symbol</b></label>
                        <input type="text" className="form-control" name="ticker" placeholder="Ticker Symbol" onChange={this.handleChange} value={this.address}></input>
                      </div>
                      <div className="form-group secondary-font">
                        <label className="input"><b>Long or Short</b></label>
                        <select className="form-control" name="longOrShort" placeholder="Long/Short" onChange={this.handleChange}>
                          <option value={this.longOrShort}></option>
                          <option value={this.longOrShort}>Long</option>
                          <option value={this.longOrShort}>Short</option>
                        </select>
                      </div>
                      <input hidden name='user'>{this.props.user.id}</input>
                      <input type='submit' className="btn btn-primary top-buffer-submit"></input>
                    </div>
                  </div>
                </div>
              </form>
            </main>
          </main>
        )
    }
}