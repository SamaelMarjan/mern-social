import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'

const EditPost = ({pid, handleModal}) => {
  const {token, user} = useSelector((state) => state.auth)

  const [input, setInput] = useState({
    post: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setInput({...input, [name] : value})
  }

  const singleData = async() => {
    try {
      const {data} = await axios.get(`http://localhost:5000/post/get/${pid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(data);
      setInput(data.singlePost)
    } catch (error) {
      console.log(error);
      toast.error('Error')
    }
  }

  //get single data
  useEffect(() => {
    singleData()
  }, [])

  //update post
  const handleUpdate = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put(`http://localhost:5000/post/update/${pid}`, input, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(data);
      if(data.success === true) {
        toast.success(data.message)
        handleModal()
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
    <div>
      <Toaster />
      <form onSubmit={handleUpdate}>
        <input name='post' value={input.post} onChange={handleChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default EditPost