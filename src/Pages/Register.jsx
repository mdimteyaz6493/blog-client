import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"

const Register = () => {
  const [userData, setuserData] = useState({
    name:"",
    email:"",
    password:"",
    password2:""
  })

  const [Error, setError] = useState('')
  const navigate = useNavigate();

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await axios.post(`blog-server-silk.vercel.app/
user/register`, userData);
      console.log('Response:', response); // Log response to inspect its structure
      const newUser = response.data; // Assuming response.data contains the new user data
      console.log('New User:', newUser); // Log new user data
  
      if (!newUser) {
        setError("Couldn't register user, please try again");
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors for debugging
      setError(error.response?.data?.message || 'An error occurred'); // Set error message
    }
  };
  
  return (
    <section className='register'>
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register_form" onSubmit={handleSubmit}>
        {Error && <p className="form_error-msg">{Error}</p>}
        <input type="text" placeholder='Full name ' name='name' value={userData.name} onChange={handleChange}/>
        <input type="text" placeholder='Email ' name='email' value={userData.email} onChange={handleChange}/>
        <input type="password" placeholder='Password ' name='password' value={userData.password} onChange={handleChange}/>
        <input type="password" placeholder='Confirm Password ' name='password2' value={userData.password2} onChange={handleChange}/>
        <button type="submit" className='btn primary'>Register</button>
        </form>
        <small>Already having account ? <Link to="/login">Sign in</Link></small>
      </div>
    </section>
  )
}

export default Register
