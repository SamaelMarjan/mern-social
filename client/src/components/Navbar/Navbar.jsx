import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
    const profileRef = useRef(null);
    const [open, setOpen] = useState(false)

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

  return (
    <div className='position'>
        <nav className="navbar navbar-expand-lg position-sticky">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link className="navbar-brand" href="#">Hidden brand</Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/register'}>Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/login'}>Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/'}>Home</NavLink>
                        </li>
                        <li className="nav-item" ref={profileRef}>
                            <NavLink className="nav-link" onClick={openModal}>Profile</NavLink>
                        </li>
                    </ul>
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
                                    <NavLink>Logout</NavLink>
                                </li>
                            </ul>
                        </div>

                    }
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar