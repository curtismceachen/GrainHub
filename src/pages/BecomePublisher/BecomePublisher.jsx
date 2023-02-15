import { Component } from 'react'
import React from 'react'
import { useParams } from 'react-router'
import {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './BecomePublisher.css'
import { Editor } from '@tinymce/tinymce-react'


export default function BecomePublisher(props) {

    const [user, setUser] = useState({})
    const { userId } = useParams()
    const navigate = useNavigate()

    let handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    let handleEditorChange = (fullDescription) => {
        setUser({...user, fullDescription: fullDescription})
    }

    let handleCBChange = (e) => {
        setUser({...user, publisherAgreement: !user.publisherAgreement})
    }
    
    let handleSubmit = async () => {
        let body = {
            _id: user._id,
            email: user.email,
            username: user.username,
            shortDescription: user.shortDescription,
            fullDescription: user.fullDescription,
            paymentInfo: user.paymentInfo,
            publisherAgreement: user.publisherAgreement
        }
        let options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        await fetch('/api/publishers/becomePublisher', options)
            .then(res => res.json())
            .then(data => props.setUserInState(data))
            .then(navigate(`/discover/${user._id}`))
    }

    let getProfile = async () => {
      await fetch(`/api/users/getProfile/${userId}`)
          .then(res => res.json())
          .then(data => setUser(data))
    }

    useEffect(() => {
        (async () => {
            setUser(props.user)
            await getProfile()
        })()
    }, [props.user])


    return (
      <form className='becomePublisherForm' onSubmit={handleSubmit}>
        <input type='hidden' value={user._id}></input>
        <input type='hidden' value={user.email}></input>
        <div>
          <h4>Become A Publisher</h4>
          <h6>{user.username}</h6>
          <div className="form-group">
            <label className="inputUD"><span className="label"><b>Short Description</b></span></label>
            <textarea type="text" className="form-control" name="shortDescription" onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label className="inputUD"><span className="label"><b>Full Description</b></span></label>
            {/* this textarea to be replaced later with a text editor */}
            <Editor
              thesis={user.fullDescription} 
              onEditorChange={handleEditorChange}
              initialValue='<p>Write your full bio...</p>'
              init={{
                statubar: true,
                height: 500,
                image_caption: true,
                image_title: true,
                image_uploadtab: true,
                plugins: [
                  "advlist", "autolink", "lists", "link", "image", "charmap",
                  "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                  "insertdatetime", "media", "table", "preview", "help", "wordcount",
                ],
                toolbar: "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                images_upload_url: '/api/ideas/uploadImage',
                image_title: true,
                automatic_uploads: true,
              }}
            />
            {/* <textarea type="text" className="form-control" name="fullDescription" onChange={handleChange}></textarea> */}
          </div>
          <div className="form-group address-update">
            <label className="inputUD"><span className="label"><b>Fake Payment Info</b></span></label>
            <input type="text" className="form-control" name="paymentInfo" onChange={handleChange}></input>
          </div>
          <div className="form-group address-update">
            <label className="inputUD"><span className="label"><b>Fake Publisher Agreement</b></span></label>
            <input type="checkbox" name="publisherAgreement" required onClick={handleCBChange}></input>
          *</div>
          <input type="submit" className="btn btn-success"></input>
        </div>
      </form>
    )
}
