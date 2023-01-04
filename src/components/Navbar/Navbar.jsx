import React from 'react'
import UserLogout from '../UserLogout/UserLogout'
import { Link } from "react-router-dom";


export default function Navbar(props) {

    return (
        <main>
          <nav className="navbar navbar-expand-lg navbar-light shadow p-3 mb-5 bg-white rounded fixed-top justify-content-between">
            <div className="navbar-brand theme-font">Investing Ideas</div>
            <div className="theme-font">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                Become A Publisher
            </Link>
            </div>
            {props.user ?
              <UserLogout setUserInState={props.setUserInState}/>
                :
              <button className="btn btn-light">Log in</button>
            }
          </nav>
        </main>
    )
}