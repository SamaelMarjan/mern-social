import axios from 'axios'
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../redux/authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setInput({...input, [name] : value})
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('http://localhost:5000/user/login', input)
      console.log(data);
      if(data.success === true) {
        toast.success(data.message)
        setInput({
          email: '',
          password: ''
        })
        dispatch(login(data))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('Error')
    }
  }
  return (
    <div className='container'>
      <Toaster />
        <form className='mt-5' onSubmit={handleLogin}>
            <h4 className='mb-3'>Login</h4>
            <div className="mb-3">
                <input type="email" className="form-control" placeholder='Email' autoComplete='off' name='email' value={input.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder='Password' autoComplete='off' name='password' value={input.password} onChange={handleChange} />
            </div>
            <div className='mb-3'>Don't have an account ? Please <Link to={'/register'}>Register</Link></div>
            <div className='mb-3'>Forgot password ? <Link to={'/forgot'}>Reset</Link></div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
  )
}

export default Login