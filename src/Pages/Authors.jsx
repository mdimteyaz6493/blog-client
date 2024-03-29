import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Component/Loader'

const Authors = () => {
  const [author, setauthor] = useState('')
  const [isloading, setisloading] = useState(false)

useEffect(()=>{
  const getAuthors=async()=>{
    setisloading(true)
    try {
      const response = await axios.get(`http://localhost:8000/user`)
      setauthor(response?.data)
      console.log(author)
    } catch (error) {
      console.log(error)
    }
    setisloading(false)
  }
  getAuthors();
},[])

if(isloading){
  return <Loader/>
}
  return (
    <section className='authors'>
      {author.length>0?<div className='container author-container'>
        {
          author.map(({_id:id,avatar,name,posts})=>{
            return(
              <Link key={id} to={`/posts/user/${id}`} className='author'>
                <div className="author_avatar">
                  <img src={avatar} alt={name} />
                </div>
                <div className="author_info">
                  <h4>{name}</h4>
                  <p>{posts}</p>
                </div>
              </Link>
            )
          })
        }
      </div>:<h2 className='center'>Not found </h2>}
    </section>
  )
}

export default Authors
