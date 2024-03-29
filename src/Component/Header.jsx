import React, { useState,useContext} from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from '../Context/userContext'

const Header = () => {
  const [isNavshowing, setisNavshowing] = useState(window.innerWidth>800?true:false)
  const {CurrentUser} = useContext(UserContext)

  const closeHandler =()=>{
    if(window.innerWidth<800){
      setisNavshowing(false);
    }else{
      setisNavshowing(true)
    }
  }
  return (
    <div>
      <nav>
        <div className="container nav_container">
          <Link to="/" className="nav_logo">
            <img src="Images/logo.jpg" alt="nav logo" />
          </Link>
          {CurrentUser?.id && isNavshowing && <ul className="nav_menu">
            <li>
              <Link to={`/profile/${CurrentUser.id}`} onClick={()=>closeHandler()}>{CurrentUser?.name}</Link>
            </li>
            <li>
              <Link to="/create" onClick={()=>closeHandler()}>Create Post</Link>
            </li>
            <li>
              <Link to="/authors" onClick={()=>closeHandler()}>Authors</Link>
            </li>
            <li>
              <Link to="/logout" onClick={()=>closeHandler()}>Logout</Link>
            </li>
          </ul>}

          {!CurrentUser?.id && isNavshowing && <ul className="nav_menu">
            <li>
              <Link to="/authors" onClick={()=>closeHandler()}>Authors</Link>
            </li>
            <li>
              <Link to="/login" onClick={()=>closeHandler()}>Login</Link>
            </li>
          </ul>}
          <button className="nav_toggle_btn" onClick={()=>setisNavshowing(!isNavshowing)}>
            {isNavshowing? <AiOutlineClose/>:<FaBars/>}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
