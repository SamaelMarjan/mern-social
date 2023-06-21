import React, { useState } from 'react'
import './profile.css'

const data = {
  id: 1,
  name: 'xyz',
  img: 'images/download.png',
  email: 'xyz@email.com',
  followers: 123,
  following: 123,
  post: 123,
}


const Profile = () => {

  return (
    <div className='container'>
      <div className='profile'>
        <div className='profile-section'>
          <div className='profile-image'>
            <img src={data.img} alt={data.name} />
          </div>
          <div className="profile-details mt-3">
            <div>{data.name}</div>
            <div>{data.email}</div>
            <button className='btn btn-primary'>Follow</button>
            <div className='following-followers'>
              <div className='followers'>followers <br /> {data.followers}</div>
              <div className='following'>following <br /> {data.following}</div>
              <div className='post'>post <br /> {data.post}</div>
            </div>
          </div>
        </div>
        <div className='profile-post-section'>post</div>
      </div>
    </div>
  )
}

export default Profile