import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { Link, redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './EditProfile.css'
import { Editor } from '@tinymce/tinymce-react'


export default function EditProfile(props) {
    
    const [user, setUser] = useState({})
    const { userId } = useParams()
    const navigate = useNavigate()

    let handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    let handleFileChange = (e) => {
        setUser({...user, profilePic: e.target.files[0]})
    }
    
    let handleEditorChange = (fullDescription) => {
        setUser({...user, fullDescription})
    }

    let handleSubmit = async (e) => {
        let profilePic = user.profilePic
        const formdata = new FormData()

        formdata.append('_id', user._id)
        formdata.append('profilePic', profilePic)
        formdata.append('username', user.username)
        formdata.append('email', user.email)
        formdata.append('shortDescription', user.shortDescription)
        formdata.append('fullDescription', user.fullDescription)
        formdata.append('paymentInfo', user.paymentInfo)

        let options = {
            method: 'PUT',
            body: formdata
        }

        await fetch('/api/users/editProfile', options)
            .then(res => res.json())
            .then(data => props.setUserInState(data))
            .then(navigate(`/users/getProfile/${user._id}`))    
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
    },[props.user])

    
    return (
      <form className='editProfileForm' encType='multipart/form-data' onSubmit={handleSubmit}>
        <input type='hidden' value={user._id}></input>
        <div>
          <h4>Edit Profile</h4>
          <img className='editProfilePic' src={user.profilePic}></img>
          <div className="form-group address-update">
            <label className="inputUD"><span className="label"><b>Change Profile Picture</b></span></label>
            <input type="file" accept='.png, .jpg, .jpeg' className="form-control" name="profilePic" onChange={handleFileChange}></input>
          </div>
          <div className="form-group address-update">
            <label className="inputUD"><span className="label"><b>Username</b></span></label>
            <input type="text" className="form-control" name="username" onChange={handleChange} value={user.username}></input>
          </div>
          <div className="form-group address-update">
            <label className="inputUD"><span className="label"><b>Email</b></span></label>
            <input type="text" className="form-control" name="email" onChange={handleChange} value={user.email}></input>
          </div>
          {user.publisherAgreement &&
            <div>
              <div className="form-group">
                <label className="inputUD"><span className="label"><b>Short Description</b></span></label>
                <textarea type="text" className="form-control" name="shortDescription" onChange={handleChange} value={user.shortDescription}></textarea>
              </div>
              <div className="form-group">
                <label className="inputUD"><span className="label"><b>Full Description</b></span></label>
                <textarea type="text" className="form-control" name="fullDescription" onChange={handleChange} value={user.fullDescription}></textarea>
              </div>
              <div className="form-group address-update">
                <label className="inputUD"><span className="label"><b>Fake Payment Info</b></span></label>
                <input type="text" className="form-control" name="paymentInfo" onChange={handleChange} value={user.paymentInfo}></input>
              </div>
            </div>
          }
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
      </form>
    )
}
