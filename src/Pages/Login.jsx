import React, { useState ,useContext} from 'react'
import {Link,useNavigate} from "react-router-dom"
import axios from 'axios'

import {UserContext} from "../Context/userContext"
const Login = () => {
  const [userData, setuserData] = useState({
    email:"",
    password:"",
  })

  const [Error, setError] = useState('')
  const navigate = useNavigate();
  const {setCurrentUser} = useContext(UserContext);

  const handleChange=(e)=>{
    const {name,value} = e.target;
    setuserData(userData=>{
     return(
      {
        ...userData,
        [name]:value
      }
     )
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError('')
    try {
      const response = await axios.post(`blog-server-silk.vercel.app
/user/login`, userData);
      console.log('Response:', response); // Log response to inspect its structure
      const User = response.data; // Assuming response.data contains the new user data
      console.log('User:', User); // Log new user data
      if (!User) {
        setError("Couldn't login user, please try again");
      } else {
        setCurrentUser(User)
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors for debugging
      setError(error.response?.data?.message || 'An error occurred'); // Set error message
    }
  }
  return (
    <section className='login'>
      <div className="container">
        <h2>Sign In</h2>
        <form className="form login_form" onSubmit={handleSubmit}>
        {Error && <p className="form_error-msg">{Error}</p>}
        <input type="text" placeholder='Email ' name='email' value={userData.email} onChange={handleChange}/>
        <input type="password" placeholder='Password ' name='password' value={userData.password} onChange={handleChange}/>
        <button type="submit" className='btn primary'>Login</button>
        </form>
        <small>Don't have an account ? <Link to="/register">Sign up</Link></small>
      </div>
    </section>
  )
}

export default Login
