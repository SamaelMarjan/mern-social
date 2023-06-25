import React, { useEffect, useRef, useState } from 'react'
import {FcLikePlaceholder} from 'react-icons/fc'
import { CiMenuKebab } from 'react-icons/ci'
import './card.css'
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import EditPost from '../../pages/EditPost/EditPost'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Card = ({title, img, id}) => {
  const {token, user} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [menuModal, setMenuModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const profileRef = useRef(null)

  const handleMenu = () => {
    setMenuModal(!menuModal)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && 
        !profileRef.current.contains(event.target) && 
        !event.target.classList.contains('menu-click')) {
          setMenuModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  //delete post
  const handleDelete = async() => {
    try {
      const {data} = await axios.delete(`http://localhost:5000/post/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(data);
      if(data.success === true) {
        toast.success(data.message)
        window.location.reload()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('Error')
    }
  }

  return (
    <div key={id} className='card mt-5 card-style'>
      {
        img && (
          <div className='img-style'>
              <img src={img} alt={title} />
          </div>
        )
      }
      {
        !img && <h2>{title}</h2>
      }
        <div className='like-comment'>
            <div className='like'>
              <FcLikePlaceholder size={30} />
            </div>
            <div className='comments'>comments</div>
            <div className='comment-section'>comment here</div>
        </div>
        <div className='menu-bar' ref={profileRef} onClick={handleMenu}>
          <CiMenuKebab size={20} />
        </div>
        {
          menuModal &&
          <div className='menu-modal' onClick={handleMenu}>
            <div className='menu-edit'  onClick={() => setEditModal(true)}>
              <AiTwotoneEdit className='menu-click' size={20} />
            </div>
            <div className='menu-delete' onClick={handleDelete}>
              <AiFillDelete className='menu-click' size={20} />
            </div>
          </div>
        }
            <Modal open={editModal} onCancel={() => setEditModal(false)}>
              <EditPost handleModal={() => setEditModal(false)} pid={id} />
            </Modal>
    </div>
  )
}

export default Card