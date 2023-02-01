import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import React, {useEffect, useState} from "react";
import {useParams} from 'react-router'


export default function UserProfile(props) {
    
    
    const { userId } = useParams()

    let getProfile = async () => {
        await fetch(`/api/users/getProfile/${userId}`)
            .then(res => res.json())
            .then(data => props.setUserInState(data))
    }

    useEffect(() => {
        (async() => {
            await getProfile()
        })()
    },[])

    return (
      <main>
        <div className="spots-page spot-background-image">
          <h1 className="discover-title theme-font">{props.user.username}</h1>
          <div className="discover-subtitle secondary-font"></div>
          <div className="discover secondary-font">
            <div className="card-subtitle">Deep value, special situations</div>
            <div className="card-text"> {props.user.fullDescription}</div>
          </div>
        </div>
      </main>
    )
}