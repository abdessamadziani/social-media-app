import React from 'react'
import imgface from '../../../shared/imgs/imgface.jpg'
import like from '../../../shared/imgs/like.png'
import liked from '../../../shared/imgs/liked.png'
import dislike from '../../../shared/imgs/dislike.png'
import unlike from '../../../shared/imgs/unlike.png'

import share from '../../../shared/imgs/share.png'
import commentsIcon from '../../../shared/imgs/comments.png'
import { useState,useEffect } from 'react'
import axios from 'axios'

const ContentPost = ({post}) => {
  const [user,setUser] = useState({});
  useEffect(() => {
   const getUserOfPost = async()=>{
    try {
      const res = await axios.get(`http://localhost:5000/api/users/post/user/details/${post.userId}`)
      setUser(res.data);
    } catch (error) {
      
    }
   }
   getUserOfPost();
  }, [])



  console.log("user",user);


  const [Like,setLike] = useState(like)
  const [Dislike,setDislike] = useState(dislike)
  const [count,setCount] = useState(post.like.length)
  const [comment,setComment] = useState('')
  const [comments,setComments] = useState([])
  const [show,setShow] = useState(false)

  const handleShow = ()=>{
    if(show === false)
      setShow(true)
    else
    setShow(false)

  }


  const addcomment = ()=>{
    const newComment = {
      ' id': '0001',
       'user': 'me',
       'title': comment
     }
     setComments([...comments,newComment])
     setComment('')
     document.getElementById('comment').value=''
  }
 

  const handleLike = ()=>{
    if(Like === like)
      {
        setLike(liked)
        setCount(count + 1)
      }
      else
      {
        setLike(like)
        setCount(count - 1)

      }
  }

  const handleDislike = ()=>{
    if(Dislike === dislike)
      {
        setDislike(unlike)
      }
      else
      {
        setDislike(dislike)

      }
  }
  return (
    <div style={{width:'100%',marginTop:20,marginBottom:20}} className='text-white'>
      
        <div style={{height:'800px'}}  className="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 overflow-y-auto scroll-smooth	 	 	">
        <div className="flex items-center">
                    <div class="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src={imgface} alt="Neil image"/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {user.username}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                           Followed by me
                        </p>
                    </div>
        </div>
        
        <p className='text-black font-bold text-xs font-sans py-4'>{post.title}</p>
           <img className='cover w-full rounded' src={post.image} alt="" />
            <div  className='flex justify-between mt-6'>
              <div  className='flex items-center   '>

                   <div className='text-gray-900  mx-4 cursor-pointer'>
                        <img className='w-7 h-7' src={Like} alt="like"  onClick={handleLike}/>
                        <p>{count} Likes</p>
                   </div> 
                   <div className='text-gray-900  mx-4 cursor-pointer'>
                        <img className='w-6 h-6' src={Dislike} alt="dislike"  onClick={handleDislike}/>
                        <p> Dislikes</p>
                   </div> 

                   <div className='text-gray-900 mx-4  cursor-pointer'>
                   <img className='w-6 h-6' src={commentsIcon} alt="comment" onClick={handleShow} />
                    <p>{post.comments.length} Comments</p>
                  </div>

              </div>
              <div className='text-gray-900 cursor-pointer '>
              <img className='w-6 h-6' src={share} alt="like" />
                <p>Share</p>
              </div>
            </div>



      {show === true ? (
            <div className='flex mt-6 '>
                <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src={imgface} alt="Neil image"/>
                </div>
                <input
                    type="text"
                    name="comment"
                    id="comment"
                    className="block flex-1 border-0  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Write a comment ..."
                    onChange={(e)=>setComment(e.target.value)}
                  />
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={addcomment}>
                 Add comment
               </button>
            </div>
               ) : null }

            {comments.map((item,index)=>{
               return(
                  <div  key={index} className="flex items-center mt-4   	">
                  <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src={imgface} alt="Neil image"/>
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {item.user}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {item.title}
                      </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      ...
                  </div>
                  </div>
                )})}


        </div>
    </div>
  )
}

export default ContentPost