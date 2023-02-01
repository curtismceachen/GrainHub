import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { Link, redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './EditProfile.css'
// import { useNavigation}


export default function EditProfile(props) {
    
    const [user, setUser] = useState({})
    const { userId } = useParams()
    const navigate = useNavigate()

    let handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    let handleSubmit = async (e) => {
        e.preventDefault()
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
      <form className='editProfileForm' onSubmit={handleSubmit}>
        <input type='hidden' value={user._id}></input>
        <input type='hidden' value={user.publisherAgreement}></input>
        <div>
          <h4>Edit Profile</h4>
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
          {/* <Link to='/'> */}
            <button type="submit" className="btn btn-success">Submit</button>
          {/* </Link> */}
        </div>
      </form>
    )
}
