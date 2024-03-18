import React from 'react'
import imgface from '../../../shared/imgs/imgface.jpg'
import ContentPost from './ContentPost'
import {useLocation,Link} from 'react-router-dom'

import { useState,useEffect } from 'react'
import axios from 'axios'
import {useSelector } from 'react-redux'

function MainPostProfile() {

  
  let location = useLocation();
  let id = location.pathname.split("/")[3];

  const {user}=useSelector((state)=>state.theUser)
  const accesstoken=user.token
    const [post , setPost] = useState([]);
  useEffect(() => {
   const getPost = async()=>{
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/get/post/${id}` , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accesstoken}`
        }
      })
      setPost(res.data);
    } catch (error) {
      
    }
   }
   getPost();
  }, [])

  return (
    <div style={{width:'45%',margin:'auto'}} className='text-white'>
      
        <div style={{width:'100%'}}  className="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
            <div className='flex'>
                <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src={imgface} alt="Neil image"/>
                </div>
                <input
                    type="text"
                    name="post"
                    id="post"
                    className="block flex-1 border-0  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Write your real thought ..."
                  />
            </div>
            <div className='flex justify-between mt-6'>
              <div className='flex items-center  '>
                   <div className='text-gray-900'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                         <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                   </div>
                  
                   <div className='text-gray-900 mx-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                    </svg>
                  </div>

                    <div className='text-gray-900'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </div>

              </div>
              <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                 Post
              </button>
           
            </div>
        </div>
        
        {post.map((item,index)=>(
          <ContentPost key={index} post={item}/>
      ))}
    </div>
  )
}

export default MainPostProfile
