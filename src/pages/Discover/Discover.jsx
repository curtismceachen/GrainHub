import { Link } from "react-router-dom"
import React, {useEffect, useState} from "react"
import SubscribeButton from '../../components/SubscribeButton/SubscribeButton'
import UnsubscribeButton from '../../components/UnsubscribeButton/UnsubscribeButton'
import './Discover.css'


export default function Discover (props) {

    const [isActive, setActive] = useState({})
    const [publishers, setPublishers] = useState([])

    let handleSeeMore = (id) => {
        let temp = {...isActive}
        temp[id] = !temp[id]
        setActive(temp)
    }

    let getPublishers = async () => {
        let token = localStorage.getItem('token')
        if (token) {
            let payload = JSON.parse(atob(token.split('.')[1]))
            let userId = payload.user._id
            let response = await fetch(`/api/publishers/discover/${userId}`)
                let data = await response.json()
                props.setUserInState(data.user)
                setPublishers(data.publishers)
        } else {
            let userId = 'false'
            await fetch(`/api/publishers/discover/${userId}`)
              .then(res => res.json())
              .then(data => setPublishers(data))
        }
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
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                  <table className='table table-hover'>
                    <tbody>
                    {publishers.map((p) => (
                      <tr>
                        <td><img className='navProfilePic' src={p.profilePic}></img></td>
                        <td><Link to={`/publishers/show/${p._id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                          <b>{p.username}</b>
                        </Link></td>
                        <td>{p.shortDescription}</td>
                        <td><button className="btn btn-primary btn-sm update-button" onClick={() => handleSeeMore(p._id)}>See more</button></td>
                        <td className={!isActive[p._id] ? "hidden" : null}>
                          <p>{p.shortDescription}</p>
                        </td>
                        {props.user && (
                          props.user.subscriptions.some(s => s.publisherId === p._id) ?
                            <td><UnsubscribeButton user={props.user} publisher={p} setUserInState={props.setUserInState} /></td>
                            :
                            <td><SubscribeButton user={props.user} publisher={p} setUserInState={props.setUserInState}/></td>
                        )}
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              <div className='col-md-2'></div>
              </div>
            </div>
          </div>
        </main>
    )
}