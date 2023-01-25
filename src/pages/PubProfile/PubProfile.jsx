import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import React, {useEffect, useState} from "react";
import {useParams} from 'react-router'
import './PubProfile.css';


export default function Discover(props) {
    
    const [publisher, setPublisher] = useState([]);
    const { id } = useParams()

    let getPubProfile = async () => {
        await fetch(`/api/publishers/show/${id}`)
          .then(res => res.json())
          .then(data => setPublisher(data))
    }

    useEffect(() => {
        (async() => {
            await getPubProfile()
        })()
    }, [])
    
    
    return (
        <main>
          <div className="spots-page spot-background-image">
            <h1 className="discover-title theme-font">Publisher Profile</h1>
            {props.user ? (
              props.user.subscriptions.some(s => s.publisherId === publisher._id) || props.user._id === id ?
                <Link to={`/ideas/show/${id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>Ideas</Link>
              :
              <div>Ideas</div>
            ) :
            <div>Ideas</div>
            }
            <div className="discover-subtitle secondary-font"></div>
            <div className="discover secondary-font">
              <div className="align-items-start discover row row-cols-3">
                <div className="card card-spacing">
                  <div className="card-body">
                    <h5 className="card-title"><b>{publisher.username}</b></h5>
                    <div className="card-subtitle">Deep value, special situations</div>
                    <div className="card-text"> {publisher.fullDescription}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
    )
}