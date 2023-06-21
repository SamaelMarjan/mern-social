import React from 'react'
import {FcLikePlaceholder} from 'react-icons/fc'
import './card.css'

const Card = ({title, img, desc, id}) => {
  return (
    <div key={id} className='card mt-5 card-style'>
        <div className='img-style'>
            <img src={img} alt={title} />
        </div>
        <div className='like-comment'>
            <div className='like'>
              <FcLikePlaceholder size={30} />
            </div>
            <div className='comments'>comments</div>
            <div className='comment-section'>comment here</div>
        </div>
    </div>
  )
}

export default Card