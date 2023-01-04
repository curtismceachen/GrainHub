import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import './Auth.css'


export default class Auth extends React.Component {
  
  state = {
      showSignUp: false,
  };

  render() {
      return (
        <div className="Auth">
          {/* <nav className="navbar navbar-expand-lg navbar-light shadow p-3 mb-5 bg-white rounded justify-content-between"> */}
            <a className="navbar-brand theme-font">Investing Ideas</a>
            <a className="ml-auto onClick-link" onClick={() => this.setState({ showSignUp: !this.state.showSignUp })}>
              {this.state.showSignUp ? "Already signed up? LOG IN" : "Don't have an account? SIGN UP"}
            </a>
          {/* </nav> */}
          
          {/* If showLogin is true, show the login form. If false, show the signup form */}
          {console.log('this.props: ' + this.props)}
          {console.log('this.props.setuser...: ' + this.props.setUserInState)}
          {this.state.showSignUp ? 
            <SignUpForm setUserInState={this.props.setUserInState} />
            :
            <LoginForm setUserInState={this.props.setUserInState} />
          }

        </div>
      );
  }
}