import React, { useEffect, useState } from 'react'
import { BsFillImageFill } from 'react-icons/bs'
import { AiTwotoneEdit } from 'react-icons/ai'
import './createPost.css'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { useSelector } from 'react-redux'

const CreatePost = ({onCancel}) => {
  const {token, user} = useSelector((state) => state.auth)
  const [selected, setSelected] = useState(false)
  const [input, setInput] = useState({
    posts: '',
    image: ''
  })

  const [createdPost, setCreatedPost] = useState(null);


  const handleChange = (e) => {
    const {name, value, type, files} = e.target
    const inputValue = type === 'file' ? files[0] : value
    setInput({...input, [name] : inputValue})
  }

  //create post
  const createPost = async(e) => {
    e.preventDefault()

    // Check if the input field is empty
    if (input.posts.trim() === '') {
      toast.error('Please enter a post')
      return
    }

    try {
      const {data} = await axios.post('http://localhost:5000/post/create', input, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type" : "multipart/form-data"
        }
      })
      console.log(data);
      if(data.success === true) {
        toast.success(data.message)
        setCreatedPost(data.post); // Update the created post data
        onCancel()
        setInput({
          post: '',
          image: ''
        })
        window.location.reload()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('Error')
    }
  }

  useEffect(() => {
    // Perform actions with the newly created post data
    if (createdPost) {
      // Access the newly created post data
      console.log('Newly created post:', createdPost);
      // Perform any necessary actions with the data
    }
  }, [createdPost]);
  
  return (
    <div>
      <Toaster />
      <form onSubmit={createPost}>
        <h4>Create post</h4>
        {
          selected ? <>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder='Write something' name='posts' value={input.posts} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <input id='image' type="file" className="form-control" name='image' accept='images/*' onChange={handleChange} />
            </div>
          </> : <>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder='Write something' name='posts' value={input.posts} onChange={handleChange} />
            </div>
          </>
        }
        <div className='post-icons'>
          <AiTwotoneEdit size={20} onClick={() => setSelected(false)} />
          <BsFillImageFill size={20} onClick={() => setSelected(true)} />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  )
}

export default CreatePost