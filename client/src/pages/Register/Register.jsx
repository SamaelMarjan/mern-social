import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='container'>
        <form className='mt-5'>
            <h4 className='mb-3'>Register</h4>
            <div className="row mb-3">
                <div className="col">
                    <input type="text" className="form-control" placeholder="First name" aria-label="First name" />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" />
                </div>
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder='User Name' />
            </div>
            <div className="mb-3">
                <input type="email" className="form-control" placeholder='Email' />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder='Password' />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder='Confirm Password' />
            </div>
            <div className='mb-3'>Already have an account ? Please <Link to={'/login'}>Login</Link></div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    </div>
  )
}

export default Register