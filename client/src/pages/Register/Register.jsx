import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Toaster, toast} from 'react-hot-toast'
import axios from 'axios'

const Register = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setInput({...input, [name] : value})
    }

    const handleCreate = async(e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post('http://localhost:5000/user/register', input)
            console.log(data);
            if(data.success === true) {
                toast.success(data.message)
                setInput({
                    firstName: '',
                    lastName: '',
                    userName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
                navigate('/login')
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
        <form className='mt-5' onSubmit={handleCreate}>
            <h4 className='mb-3'>Register</h4>
            <div className="row mb-3">
                <div className="col">
                    <input type="text" className="form-control" placeholder="First name" name='firstName' value={input.firstName} onChange={handleChange} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Last name" name='lastName' value={input.lastName} onChange={handleChange} />
                </div>
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder='User Name' name='userName' value={input.userName} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <input type="email" className="form-control" placeholder='Email' name='email' value={input.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder='Password' name='password' value={input.password} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder='Confirm Password' name='confirmPassword' value={input.confirmPassword} onChange={handleChange} />
            </div>
            <div className='mb-3'>Already have an account ? Please <Link to={'/login'}>Login</Link></div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    </div>
  )
}

export default Register