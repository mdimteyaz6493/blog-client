import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Dummy_post from "../Pages/data";
import Loader from "./Loader";
import axios from "axios";



const Posts = () => {
  const [post, setpost] = useState([]);
  const [isloading, setisloading] = useState(false)

  useEffect(()=>{
    const fetchPosts = async()=>{
      setisloading(true)
      try {
        const response = await axios.get("http://localhost:8000/posts")
        setpost(response?.data)
      } catch (error) {
        console.log(error)
      }
      setisloading(false)
    }
    fetchPosts();
  },[])

  if(isloading){
    return <Loader/>
  }
  return (
    <section className="posts">
      {post.length > 0? <div className="container post_container">
        {post.map(({ _id:id, thumbnail, category, title, desc, creator,createdAt }) => (
          
          <PostItem
            key={id}
            id={id}
            postId={id}
            thumbnail={thumbnail}
            category={category}
            title={title}
            desc={desc}
            authorID={creator}
            createdAt={createdAt}
          />
        ))}
        
      </div> : <h2 className="center">No post Found</h2>}
    </section>
  );
};
export default Posts;
