import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import React, {useEffect, useState} from "react";
import {useParams} from 'react-router'
import DOMPurify from 'dompurify'
import './PubIdeas.css';
import bullish from '../../images/bullish.svg'
import bearish from '../../images/bearish.png'

export default function PubIdeas(props) {
    
    const [ideasWithPubUsername, setIdeasWithPubUsername] = useState([]);
    const { id } = useParams()

    let getPubIdeas = async () => {
        console.log("getPubIdeas!!!")
        
        await fetch(`/api/ideas/show/${id}`)
          .then(res => res.json())
          .then(data => setIdeasWithPubUsername(data))
    }

    useEffect(() => {
        (async() => {
            await getPubIdeas()
        })()
    }, [])
    
    // sanitize the thesis text editor html so it will be less vulnerable
    let sanitizeData = (data) => ({
      __html: DOMPurify.sanitize(data)
    })

    return (
        <main>
          <div className="spots-page spot-background-image">
            <h1 className="discover-title theme-font">Publisher Ideas</h1>
            <Link to={`/publishers/show/${id}`}>Profile</Link>
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
                        <div dangerouslySetInnerHTML={sanitizeData(i.thesis)}></div>
                      </section>
                    </div>
                  </div>
                )}
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
        </main>
    )
}