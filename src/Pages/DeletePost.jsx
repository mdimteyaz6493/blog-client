import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/userContext';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

const DeletePost = ({postID}) => {
  const {CurrentUser} = useContext(UserContext)
  const token = CurrentUser?.token;
  const navigate = useNavigate();
  const location = useLocation();

  //redirect to login page for user not login 
useEffect(()=>{
  if(!token){
    navigate("/login")
  }
})

const removePost = async(id)=>{
  try {
    const response = await axios.delete(`http://localhost:8000/posts/${id}`,{
      withCredentials:true,
      headers:{Authorization:`Bearer ${token}`}})

    if(response.status==201){
      if(location.pathname == `/mypost/${CurrentUser.id}`){
        navigate(0)
      }else{
        navigate("/")
      }
    }
  } catch (error) {
    console.log('Error:', error); // Log any errors for debugging
    seterror(error.response?.data?.message || 'An error occurred'); // Set error message
  }

}
  return (
    <div>
      <Link className='btn sm danger' onClick={()=>removePost(postID)}>Delete</Link>
    </div>
  )
}

export default DeletePost
