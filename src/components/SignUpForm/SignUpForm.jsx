import { Component } from "react";
import "./SignUpForm.css"


export default class SignUpForm extends Component {
  
    state = {
        username: "",
        email: "",
        password: "",
        confirm: "",
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
        const fetchResponse = await fetch('/api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: this.state.username, 
                email: this.state.email, 
                password: this.state.password 
            }),
        })
        if (!fetchResponse.ok) throw new Error('FetchFailed - Bad Request ' + fetchResponse.status)
        let token = await fetchResponse.json()
        localStorage.setItem('token', token)
        const userDoc = JSON.parse(atob(token.split('.')[1])).user
        this.props.setUserInState(userDoc)
        } catch (err) {
        this.setState({ error: "Sign Up Failed - Try Again" });
        }
    }


    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
          <div className="container">
          <div className="row">
            {/* <div className="col-md-6"><img src="https://cdn.pixabay.com/photo/2018/07/29/19/52/skateboard-3570896_960_720.png" className="img-fluid" alt="alternatetext"></img></div> */}
            <div className="col-md-6"><h3 className="d-flex justify-content-center">Sign Up</h3>
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <div className="row form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                  />
                </div>
                <div className="row form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
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
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                  />
                </div>
                <div className="row form-group">
                <label>Confirm</label>
                <input
                  type="password"
                  name="confirm"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.confirm}
                  onChange={this.handleChange}
                  required
                  />
                </div>
                <div className="row form-group">
                  <button className="btn btn-primary top-buffer" type="submit" disabled={disable}>
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
          </div>
        );
    }
}
