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
    })
    
    
    return (
        <main>
          <div className="spots-page spot-background-image">
            <h1 className="discover-title theme-font">Discover</h1>
            <div className="discover-subtitle secondary-font">Top Publishers</div>
            <div className="discover secondary-font">
              <div className="align-items-start discover row row-cols-3">
                <div className="card card-spacing">
                  <div className="card-body">
                    <h5 className="card-title"><b>{publisher.username}</b></h5>
                    <div className="card-subtitle">Deep value, special situations</div>
                    <div className="card-text"> {publisher.description}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
    )
}