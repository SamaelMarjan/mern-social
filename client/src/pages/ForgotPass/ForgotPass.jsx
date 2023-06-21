import React from 'react'

const ForgotPass = () => {
  return (
    <div className='container'>
      <form className='mt-5'>
            <h4 className='mb-3'>Reset Password</h4>
            <div className="mb-3">
                <input type="email" className="form-control" placeholder='Email' autoComplete='off' />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder='Password' autoComplete='off' />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder='Confirm Password' autoComplete='off' />
            </div>
            <button type="submit" className="btn btn-primary">Reset</button>
        </form>
    </div>
  )
}

export default ForgotPass