import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import React, {useEffect, useState} from "react";
import './Discover.css';


export default function Discover(props) {
    
    const [isActive, setActive] = useState({})
    const [publishers, setPublishers] = useState([])
    const [subscriptions, setSubscriptions] = useState([])

    const handleSeeMore = (id) => {
        let temp = {...isActive}
        temp[id] = !temp[id]
        setActive(temp)
    }

    let getPublishers = async () => {
        if (props.user){
            let response = await fetch(`/api/publishers/discover/${props.user._id}`)
              let data = await response.json()
              props.setUserInState(data.user)
              setPublishers(data.publishers)
        } else {
            let id = 'false'
            await fetch(`/api/publishers/discover/${id}`)
              .then(res => res.json())
              .then(data => setPublishers(data))
        }
    }

    useEffect(() => {
        (async() => {
            await getPublishers()
        })()
    },[])
    
    let handleSubscribe = async (id) => {
        let body = {userId: props.user._id, pubId: id}
        let options = {
            method: 'Put', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        await fetch('/api/users/addSubscription', options)
            .then(res => res.json())
            .then(data => props.setUserInState(data))
    }

    let handleUnsubscribe = async (id) => {
        let body = {userId: props.user._id, pubId: id}
        let options = {
            method: 'Put', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        let response = await fetch('/api/users/removeSubscription', options)
            let data = await response.json()
            props.setUserInState(data)
            // props.setUserInState(data))
            // props.setUserInState(data)
    }
    
    
    return (
        <main>
          <div className="spots-page spot-background-image">
            <h1 className="discover-title theme-font">Discover</h1>
            <div className="discover-subtitle secondary-font">Top Publishers</div>
            <div className="discover secondary-font">
              <div className="align-items-start discover row row-cols-3">
                {publishers.map((p) => (
                  <div className="card card-spacing">
                    <div className="card-body">
                      <Link to={`/publishers/show/${p._id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <h5 className="card-title"><b>{p.username}</b></h5>
                      </Link>
                      <div className="card-text"> {p.description}</div>
                      <button className="btn btn-primary btn-sm update-button" onClick={() => handleSeeMore(p._id)}>See more</button>
                      <div className={!isActive[p._id] ? "hidden" : null}>
                        <div>{p.description}</div>
                      </div>
                      {props.user &&
                        props.user.subscriptions.some(s => s.publisherId === p._id) ?
                          <button className="btn btn-success btn-sm" onClick={() => handleUnsubscribe(p._id)}>Unsubscribe</button>  
                          :
                          <button className="btn btn-success btn-sm" onClick={() => handleSubscribe(p._id)}>Subscribe</button>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
    )
}