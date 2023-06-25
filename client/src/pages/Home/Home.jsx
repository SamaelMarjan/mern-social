import React, { useEffect, useState } from 'react'
import './home.css'
import Card from '../../components/Card/Card'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Home = () => {
  const {token} = useSelector((state) => state.auth)
  const [post, setPost] = useState([])

  //get all post
  const getAll = async() => {
    try {
      const {data} = await axios.get('http://localhost:5000/post/get', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(data);
      // Sort todos by createdAt in descending order
      const sortedTodos = data.allPost.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt) || new Date(b.createdAt) - new Date(a.createdAt));
      setPost(sortedTodos)
    } catch (error) {
      console.log(error);
      toast.error('Error')
    }
  }

  useEffect(() => {
    getAll()
  }, [])

  return (
    <div className='container home-style'>
      <Toaster />
      <div>
        {
          post.map((data) => (
            <div  key={data._id}>
              <Card created={data.createBy} id={data._id} img={data.image} title={data.posts} likes={data.likes} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home