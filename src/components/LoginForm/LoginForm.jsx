import { Component } from "react";
import React from 'react';

export default class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const fetchResponse = await fetch('/api/users/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.state.email, password: this.state.password }),
      })

      if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')

      let token = await fetchResponse.json()
      localStorage.setItem('token', token);

      const userDoc = JSON.parse(atob(token.split('.')[1])).user;
      this.props.setUserInState(userDoc)
    } catch (err) {
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    return (
    <main>
        <div className="container">
          <div className="row">
          {/* <div className="col-md-6"><img src="https://cdn.pixabay.com/photo/2018/07/29/19/52/skateboard-3570896_960_720.png" className="img-fluid" alt="alternatetext"></img></div> */}
          <div className="col-md-6">
            <h3 className="d-flex justify-content-center">Login</h3>
          <form autoComplete="off" onSubmit={this.handleSubmit} >
            <div className="row form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
              />
            </div>
            <div className="row form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
              />
            </div>
            <div className="row form-group">
            <button className="btn btn-primary top-buffer" type="submit">LOG IN</button>
            </div>
          </form>
          </div>
          </div>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </main>
    );
  }
}