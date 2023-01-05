import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import React, {useEffect, useState} from "react";
import './Discover.css';


export default function Discover(props) {
    
    const [isActive, setActive] = useState({});
    const [publishers, setPublishers] = useState([]);
    const handleSeeMore = (id) => {
        let temp = {...isActive}
        temp[id] = !temp[id]
        setActive(temp)
    }

    let getPublishers = async () => {
        await fetch("/api/publishers")
          .then(res => res.json())
          .then(data => setPublishers(data))
    }

    useEffect(() => {
        (async() => {
            await getPublishers()
        })()
    },[])
    
    
    return (
        <main>
          <div className="spots-page spot-background-image">
            <h1 className="discover-title theme-font">Discover</h1>
            <div className="discover-subtitle secondary-font">Top Publishers</div>
            <div className="discover secondary-font">
              <div className="align-items-start discover row row-cols-3">
                {publishers.map((p) => (
                  <div className="card card-spacing">
                  {/* <img className="card-img-top image-size" src={s.photoUrl} alt="spot picture"></img> */}
                  <div className="card-body">
                      <h5 className="card-title"><b>{p.username}</b></h5>
                      <div className="card-text"> {p.description}</div>
                      <button className="btn btn-primary btn-sm update-button" onClick={() => handleSeeMore(p._id)}>See more</button>
                      {/* <button className="btn btn-danger btn-sm delete-button" onClick={() => handleDelete(s._id)}>Delete</button> */}
                      <div className={!isActive[p._id] ? "hidden" : null}>
                        {/* <UpdateSpot spot={s} refresh={getSpots}/> */}
                        <div>{p.description}</div>
                      </div>
                  </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
    )
}