import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/userContext'

const Logout = () => {
  const {setCurrentUser} = useContext(UserContext)
  const navigate = useNavigate();

  setCurrentUser(null)
  navigate("/login")
  return (
    <div>
      
    </div>
  )
}

export default Logout
