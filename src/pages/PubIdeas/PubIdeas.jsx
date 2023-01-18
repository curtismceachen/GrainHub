import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import React, {useEffect, useState} from "react";
import {useParams} from 'react-router'
import './PubIdeas.css';


export default function Discover(props) {
    
    const [ideas, setIdeas] = useState([]);
    const { id } = useParams()

    let getPubIdeas = async () => {
        await fetch(`/api/ideas/show/${id}`)
          .then(res => res.json())
          .then(data => setIdeas(data))
    }

    useEffect(() => {
        (async() => {
            await getPubIdeas()
        })()
    }, [])
    
    
    return (
        <main>
          <div className="spots-page spot-background-image">
            <h1 className="discover-title theme-font">Publisher Ideas</h1>
            <Link to={`/publishers/show/${id}`}>Profile</Link>
            <div className="discover-subtitle secondary-font"></div>
            <div className="discover secondary-font">
              <div className="align-items-start discover row row-cols-3">
                {ideas.map((i) => (
                <div className="card card-spacing">
                  <div className="card-body">
                    <h5 className="card-title"><b>{i.title}</b></h5>
                    <div className="card-subtitle"> {i.ticker}</div>
                    <div className="card-subtitle"> {i.longOrShort}</div>
                    <div className="card-text"> {i.thesis}</div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </main>
    )
}