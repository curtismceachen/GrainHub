import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import './Auth.css'


export default class Auth extends React.Component {
  
  state = {
      showLogin: true,
  };

  render() {
      return (
        <main className="Auth">
          <nav className="navbar navbar-expand-lg navbar-light shadow p-3 mb-5 bg-white rounded justify-content-between">
            <a className="navbar-brand theme-font">Investing Ideas</a>
            <a className="ml-auto onClick-link" onClick={() => this.setState({ showLogin: !this.state.showLogin })}>
              {this.state.showLogin ? "Already signed up? LOG IN" : "Don't have an account? SIGN UP"}
            </a>
          </nav>
          
          {/* If showLogin is true, show the login form. If false, show the signup form */}
          
          {this.state.showLogin ? 
            <SignUpForm setUserInState={this.props.setUserInState} />
            :
            <LoginForm setUserInState={this.props.setUserInState} />
          }

        </main>
      );
  }
}