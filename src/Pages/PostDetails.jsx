import React, { useContext, useEffect, useState } from 'react'
import PostAuthor from '../Component/PostAuthor'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../Context/userContext'
import Loader from '../Component/Loader'
import DeletePost from './DeletePost'
import axios from 'axios'



const PostDetails = () => {
  const {id} = useParams()
  const [post, setpost] = useState(null)
  const [error, seterror] = useState(null)
  const [loading, setloading] = useState(false)

  const {CurrentUser} = useContext(UserContext)
  useEffect(() => {
  const fetchPosts = async () => {
    setloading(true);
    try {
      const response = await axios.get(`http://localhost:8000/posts/${id}`);
      setpost(response?.data);
    } catch (error) {
      console.log(error);
      seterror('Error fetching post details.');
    }
    setloading(false);
  };
  fetchPosts();
}, [id]);

  if(loading){
    return <Loader/>
  }
  return (
    <section className='post-detail'>
    {error && <p className='error'>{error}</p>}
      {post && <div className="container post-detail_container">
        <div className="post-detail_header">
          <PostAuthor authorID={post.creator} createdAt={post.createdAt}/>
         {CurrentUser?.id == post?.creator && 
         <div className="post-detail_buttons">
            <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Edit</Link>
            <DeletePost postID={id}/>
          </div>}
        </div>
        <h1>{post.title}</h1>
        <div className="post-detail_thumbnail">
          <img src={post?.thumbnail} alt="thumbnail" />
        </div>
       <p dangerouslySetInnerHTML={{__html:post.desc}}></p>
      </div>}
    </section>
  )
}

export default PostDetails
