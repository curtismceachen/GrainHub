import { Link } from "react-router-dom"
import React, {useEffect, useState} from "react"
import DOMPurify from 'dompurify'
import {useParams} from 'react-router'
import './IdeasFeed.css'
import bullish from '../../images/bullish.svg'
import bearish from '../../images/bearish.png'


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
      <div>
        <h1 className="discover-title">Ideas Feed</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
            {ideasWithPubUsername.map((i) =>
              <div className="ideaCard border">
                <div className="ideaPanelMargin">
                  <section className="post-heading">
                    <div className="ideaPanelProfilePic">
                      <img className='profilePic' src={i.publisher.profilePic}></img>
                    </div>
                    <h6 className='ideaPanelUsername'><Link to={`/publishers/show/${i.publisher.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>{i.publisher.username}</Link></h6>
                  </section>
                  <section className="">
                    <h5 className="ideaPanelTitle">{i.title}</h5>
                    {i.ticker && <div className="ideaPanelSubheading">{i.ticker}
                      <svg xmlns="http://www.w3.org/2000/svg" className='' width="16" height="16" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                      </svg>
                    </div>}
                    {i.longOrShort && <div className="ideaPanelSubheading">{i.longOrShort}</div>}
                    {i.longOrShort === 'Long' && <img className='longOrShortImg' src={bullish}></img>}
                    {i.longOrShort === 'Short' && <img className='longOrShortImg' src={bearish}></img>}
                    <div dangerouslySetInnerHTML={sanitizedData(i.thesis)}></div>
                  </section>
                </div>
              </div>
            )}
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    )
}