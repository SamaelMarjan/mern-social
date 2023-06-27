import React, { useEffect, useRef, useState } from 'react'
import {FcLike, FcLikePlaceholder} from 'react-icons/fc'
import { CiMenuKebab } from 'react-icons/ci'
import './card.css'
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai'
import { BiCommentAdd } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import EditPost from '../../pages/EditPost/EditPost'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment from 'moment'

const Card = ({title, img, id, likes, created, time}) => {
  const {token, user} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [menuModal, setMenuModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const profileRef = useRef(null)
  const [comment, setComment] = useState(false)

  const handleComment = () => {
    setComment(!comment)
  }

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

  //like post
  const likePost = async(postId) => {
    try {
      const {data} = await axios.put('http://localhost:5000/post/like', {postId}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(data);
      toast.success(data.message)
      window.location.reload()
    } catch (error) {
      console.log(error);
      toast.error('Error')
    }
  }

  //unlike post
  const unlikePost = async(postId) => {
    try {
      const {data} = await axios.put('http://localhost:5000/post/unlike', {postId}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(data);
      toast.success(data.message)
      window.location.reload()
    } catch (error) {
      console.log(error);
      toast.error('Error')
    }
  }

  return (
    <div key={id} className='card mt-5 card-style'>
      {
        img ? ( <>
          <div className='img-style'>
            <img src={`http://localhost:5000/post/${img}`} alt={title} />
          </div>
          <div>{title}</div>
        </>
        ) : (<>
          <h2>{title}</h2>
        </>)
      }
        <div className='like-comment'>
          {
            likes?.includes(user._id) ? <>
              <div onClick={() => unlikePost(id)}>
                <FcLike size={30} />
              </div>
            </> : <>
              <div className='like' onClick={() => likePost(id)}>
                <FcLikePlaceholder size={30} />
              </div>
            </>
          }
          <div onClick={handleComment}>
            <BiCommentAdd size={30}/>
          </div>
        </div>
              <div>
                {likes.length} likes
              </div>
            <div className='comments'>comments</div>
            {
              comment ? <>
                <div>
                  <form>
                    <input type='text' placeholder='Comment here' />
                  </form>
                  <button>Submit</button>
                </div>
              </> : ''
            }
        <div className='created-at'>
          {moment(time).fromNow()}
        </div>
        <div className='menu-bar' ref={profileRef} onClick={handleMenu}>
          <CiMenuKebab size={20} />
        </div>
        {
          menuModal &&
          <div className='menu-modal' onClick={handleMenu}>
            {
              user?._id === created?._id ? <>
                <div className='menu-edit'  onClick={() => setEditModal(true)}>
                  <AiTwotoneEdit className='menu-click' size={20} />
                </div>
                <div className='menu-delete' onClick={handleDelete}>
                  <AiFillDelete className='menu-click' size={20} />
                </div>
              </> : <>
                <div>
                  Share
                </div>
              </>
            }
          </div>
        }
        <Modal open={editModal} onCancel={() => setEditModal(false)}>
          <EditPost handleModal={() => setEditModal(false)} pid={id} />
        </Modal>
    </div>
  )
}

export default Card