import React from 'react'
import './home.css'
import Card from '../../components/Card/Card'

const data = [
  {
    id: 1,
    title: 'post one',
    img: 'images/image one.jpg',
    desc: 'desc 1',
  },
  {
    id: 2,
    title: 'post two',
    img: 'images/image two.jpg',
    desc: 'desc 2',
  },
  {
    id: 3,
    title: 'post three',
    img: 'images/image three.jpg',
    desc: 'desc 3',
  },
  {
    id: 4,
    title: 'post five',
    img: 'images/image four.jpg',
    desc: 'desc 4',
  },
  {
    id: 5,
    title: 'post six',
    img: 'images/image three.jpg',
    desc: 'desc 5',
  },
]

const Home = () => {
  return (
    <div className='container home-style'>
      <div>
        {
          data.map((data) => (
            <div  key={data.id}>
              <Card id={data.id} img={data.img} title={data.title} desc={data.desc} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home