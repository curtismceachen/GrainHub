import { Link } from "react-router-dom"
import React, {useEffect, useState} from "react"
import SubscribeButton from '../../components/SubscribeButton/SubscribeButton'
import UnsubscribeButton from '../../components/UnsubscribeButton/UnsubscribeButton'
import DOMPurify from 'dompurify'
import {useParams} from 'react-router'


export default function IdeasFeed (props) {

    const [isActive, setActive] = useState({})
    const [ideasWithPubUsername, setIdeasWithPubUsername] = useState([])
    const { userId } = useParams()
    // const [ideas, setIdeas] = useState()

    // let handleSeeMore = (id) => {
    //     let temp = {...isActive}
    //     temp[id] = !temp[id]
    //     setActive(temp)
    // }

    let getIdeas = async () => {
        console.log('PROPS.USER._ID: ' + userId)
        await fetch(`/api/ideas/ideasFeed/${userId}`)
            .then(res => res.json())
            .then(data => setIdeasWithPubUsername(data))
    }

    useEffect(() => {
        (async() => {
            await getIdeas()
        })()
    },[])
    
    let sanitizedData = (data) => ({
      __html: DOMPurify.sanitize(data)
    })
    
    return (
      <main>
        <div className="spots-page spot-background-image">
          <h1 className="discover-title theme-font">Ideas Feed</h1>
          <div className="discover secondary-font">
            <div className="align-items-start discover row row-cols-3">
              {ideasWithPubUsername.map((i) => 
                <div className="card card-spacing">
                  <Link to={`/publishers/show/${i.publisher.id}`}>{i.publisher.username}</Link>
                  <div className="card-body">
                    <h5 className="card-title"><b>{i.title}</b></h5>
                    {i.ticker && <div className="card-subtitle">{i.ticker}</div>}
                    {i.longOrShort && <div className="card-subtitle">{i.longOrShort}</div>}
                    <div className="card-text" dangerouslySetInnerHTML={sanitizedData(i.thesis)}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    )
}