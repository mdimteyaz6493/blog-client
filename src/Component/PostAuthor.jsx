import axios from 'axios'
import TimeAgo from 'javascript-time-ago'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'
import en from "javascript-time-ago/locale/en.json"
import ru from "javascript-time-ago/locale/ru.json"

TimeAgo.addDefaultLocale(en)
TimeAgo.addDefaultLocale(ru)

const PostAuthor = ({authorID,createdAt}) => {
  const [author, setauthor] = useState([])
  const id=authorID
  useEffect(()=>{
    const getAuthor = async()=>{
      
      try{
        const response = await axios.get(`http://localhost:8000/user/${id}`)
        setauthor(response?.data) 
       
        console.log(author)
      }
      catch(err){
        console.log(err)
        console.log(authorID)
      }
    }
    getAuthor();
  },[])
 
  return (
    <>
      <Link to={`/posts/user/${authorID}`} className='post_author'>
        <div className="post_author_avatar">
            <img src={author?.User?.avatar} alt="avatar" />
        </div>
        <div className="post_author_details">
            <h5>{author?.User?.name}</h5>
            <small><ReactTimeAgo date={new Date(createdAt)} locale='en-US'/></small>
        </div>
      </Link>
    </>
  )
}

export default PostAuthor
