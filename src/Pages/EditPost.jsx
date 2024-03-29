import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../Context/userContext';


const EditPost = () => {
  const [title, settitle] = useState('')
  const [category, setcategory] = useState('')
  const [desc, setdesc] = useState('')
  const [thumbnail, setthumbnail] = useState('')
  const [error, seterror] = useState('')
  const {CurrentUser} = useContext(UserContext)
  const token = CurrentUser?.token;
  const navigate = useNavigate();

  const Category = ['Agriculture','Business','Education','Entertainment','Art' ,'Investment','Weather','Uncategorized']

  const modules = {
    toolbar:[
      [{'header':[1,2,3,4,5,6,false]}],
      ['bold','italic','underline','strike','blockquote'],
      [{'list':'ordered'},{'list':'bullet'},{'indent':'-1'},{'index':'+1'}],
      ['link','image'],
      ['clean']
    ]
  }
  const formats=[
    "header",
    'bold','italic','underline','strike','blockquote',
    'ordered','bullet','indent',
    'link','image'

  ]
  const {id}= useParams();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/posts/${id}`);
        settitle(response?.data.title)
        setcategory(response?.data.category)
        setdesc(response?.data.desc)
        setthumbnail(response?.data.thumbnail)
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [id]);
  const handleSubmit=async(e)=>{
  
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:8000/posts/${id}`,{
        title,
        category,
        desc,
        thumbnail
      },{
        withCredentials:true,
        headers:{Authorization:`Bearer ${token}`}})
  
      if(response.status==200){
        navigate('/')
      }
    } catch (error) {
      console.log('Error:', error); // Log any errors for debugging
      seterror(error.response?.data?.message || 'An error occurred'); // Set error message
    }
  
  }
   //redirect to login page for user not login 
   useEffect(()=>{
    if(!token){
      navigate("/login")
    }
  })
  return (
    <section className='create-post'>
    <div className="container">
      <h2>Edit Post</h2>
      {error && <p className='form_error-msg'>{error}</p>}
      <form className='form create-post_form' onSubmit={handleSubmit}>
        <input type="text" placeholder='Title' value={title} onChange={(e)=>settitle(e.target.value)} autoFocus/>
        <select name="category" value={category} onChange={(e)=>setcategory(e.target.value)}>
          {
            Category.map((cat)=>{
              return(
                <option value={cat} key={cat}>{cat}</option>
              )
            })
          }
        </select>
        <ReactQuill value={desc} onChange={setdesc} modules={modules} formats={formats} className='quil-editor'/>
        <input type="text" onChange={e=>setthumbnail(e.target.value)} value={thumbnail}/>
        <button type='submit' className='btn primary'>Update</button>
      </form>
    </div>
      
    </section>
  )
}

export default EditPost
