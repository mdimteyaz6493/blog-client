import React, { useEffect, useState } from 'react'
import Dummy_post from './data';
import PostItem from '../Component/PostItem';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Component/Loader';


const CategoryPosts = () => {
  const [post, setpost] = useState([]);
  const [isloading, setisloading] = useState(false)
  const {category} = useParams()

  useEffect(()=>{
    const fetchPosts = async()=>{
      setisloading(true)
      try {
        const response = await axios.get(`http://localhost:8000/posts/categories/${category}`)
        setpost(response?.data)
      } catch (error) {
        console.log(error)
      }
      setisloading(false)
    }
    fetchPosts();
  },[category])

  if(isloading){
    return <Loader/>
  }
  return (
    <section className="posts">
      {post.length > 0? <div className="container post_container">
        {post.map(({ _id:id, thumbnail, category, title, desc, creator,createdAt }) => (
          <PostItem
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
}

export default CategoryPosts
