import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import {Modal} from 'antd'
import CreatePost from '../../pages/CreatePost/CreatePost'
import { logout } from '../../redux/authSlice'

const Navbar = () => {
    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const profileRef = useRef(null);
    const [open, setOpen] = useState(false)
    const [creteModal, setCreateModal] = useState(false)

    const createOpenModal = () => {
        setCreateModal(!creteModal)
    }

    const openModal = () => {
        setOpen(!open)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (profileRef.current && 
            !profileRef.current.contains(event.target) && 
            !event.target.classList.contains('modal-link')) {
            setOpen(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    //handle logout
    const handleLogout = () => {
    dispatch(logout())
    }

  return (
    <div className='position'>
        <nav className="navbar navbar-expand-lg position-sticky">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link className="navbar-brand" to={'/'}>Hidden brand</Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {
                            user ? <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/'}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" onClick={createOpenModal}>Create Post</NavLink>
                                </li>
                                <li className="nav-item" ref={profileRef}>
                                    <NavLink className="nav-link" onClick={openModal}>Profile</NavLink>
                                </li>
                                {
                                    open &&
                                    <div className='style-modal' onClick={openModal}>
                                        <ul className=''>
                                            <li>
                                                <Link to={'/profile'} className='modal-link' onClick={openModal}>Profile</Link>
                                            </li>
                                            <li>
                                                <NavLink>Setting</NavLink>
                                            </li>
                                            <li>
                                                <NavLink  className='modal-link' onClick={handleLogout}>Logout</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                }
                                    {/* crete post modal */}
                                    <Modal open={creteModal} onCancel={createOpenModal}>
                                        <CreatePost onCancel={createOpenModal} />
                                    </Modal>
                                
                            </> : <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/register'}>Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/login'}>Login</NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar