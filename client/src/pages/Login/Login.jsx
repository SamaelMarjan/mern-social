import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='container-fluid'>
        <form className='container mt-5'>
            <h4 className='mb-3'>Login</h4>
            <div className="mb-3">
                <input type="email" className="form-control" placeholder='Email' autoComplete='off' />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder='Password' autoComplete='off' />
            </div>
            <div className='mb-3'>Don't have an account ? Please <Link to={'/register'}>Register</Link></div>
            <div className='mb-3'>Forgot password ? <Link to={'/forgot'}>Reset</Link></div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
  )
}

export default Login