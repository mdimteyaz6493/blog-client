import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Dummy_post from "./data"
import { UserContext } from '../Context/userContext';
import { useNavigate } from 'react-router-dom'
import Loader from '../Component/Loader';
import axios from 'axios';
import DeletePost from './DeletePost';




const Dashboard = () => {
  const [posts, setposts] = useState([])
  const [isloading, setisloading] = useState(false)
  const {id} = useParams();

  const {CurrentUser} = useContext(UserContext)
  const token = CurrentUser?.token;
  const navigate = useNavigate();

  //redirect to login page for user not login 
  useEffect(()=>{
    if(!token){
      navigate("/login")
    }
  })

  useEffect(()=>{
    const fetchPosts = async()=>{
      setisloading(true)
      try {
        const response = await axios.get(`http://localhost:8000/posts/user/${id}`,{
          withCredentials:true,
          headers:{Authorization:`Bearer ${token}`}})

        setposts(response?.data)
      } catch (error) {
        console.log(error)
      }
      setisloading(false)
    }
    fetchPosts();
  },[id])
if(isloading){
  <Loader/>
}
  return (
    <>
     <section className='dashboard'>
      {
        posts.length > 0 ? <div className="container dashboard_container">
          {
            posts.map(post=>{
              return(
                <article className='dashboard_post' key={post.id}>
                <div className="dashboard_prifile-info">
                  <div className="dashboard_post-thumbnail">
                    <img src={post.thumbnail} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard_post-actions">
                  <Link to={`/posts/${post._id}`} className='btn sm'>View</Link>
                  <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                 <DeletePost postID={post._id}/>
                </div>
                </article>
              )
            })
          }
        </div>: <h2 className='center'>You have no post yet</h2>
      }
     </section> 
    </>
  )
}

export default Dashboard
