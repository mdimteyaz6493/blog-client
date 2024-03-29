import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from "../Component/PostAuthor"

const PostItem = ({postId,thumbnail,category,desc,authorID,title, createdAt}) => {
    const short_desc = desc.length>145? desc.substr(0,145)+'...' : desc;
    const short_title = title.length>30? title.substr(0,30)+'...' : title;
  return (
    <>
     <article className="post">
        <div className="post_thumbnail"><img src={thumbnail} alt={title} /></div>
        <div className="post_content">
            <Link to={`/posts/${postId}`}><h3>{short_title}</h3></Link>
            <p dangerouslySetInnerHTML={{__html:short_desc}}></p>
            <div className="post_footer">
               <PostAuthor authorID={authorID} createdAt={createdAt}/>
                <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
            </div>
        </div>
     </article> 
    </>
  )
}

export default PostItem
