import React from 'react'
import imgface from '../../../shared/imgs/imgface.jpg'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios';
import { useState,useEffect } from 'react';
import {useSelector } from 'react-redux'

function LeftSideProfile() {
    const {user}=useSelector((state)=>state.theUser)

   const accesstoken = user.token



    let location = useLocation();
    let id = location.pathname.split("/")[3];





    const [specificUser , setSpecificUser] = useState([]);
    useEffect(() => {
      const getuser = async()=>{
        try {
          const res  = await axios.get(`http://localhost:5000/api/users/post/user/details/${id}`)
          setSpecificUser(res.data);
        } catch (error) {
          console.log("Some error occured")
        }
      }
      getuser();
    }, [])
    let followingCounter = specificUser?.following?.length;


    const [followingUsers,setFollowingUsers] = useState([]);

    const getAllFollowingUsers = async()=>{
        try {
        //   const res = await axios.get(`http://localhost:5000/api/posts/following/${user.user._id}`)
        const res = await axios.get(`http://localhost:5000/api/posts/following/${id}`)

          setFollowingUsers(res.data);
        } catch (error) {
          
        }
       }
    useEffect(() => {
    
     getAllFollowingUsers();
    }, [])
    const [Follow , setUnFollow] = useState([user?.user?.following.includes(id) ? "Unfollow" : "Follow"]);
    const handleFollow = async()=>{
        if(Follow === "Follow"){
          await fetch(`http://localhost:5000/api/users/following/${id}` , {method:'PUT', headers:{'Content-Type':"application/JSON" ,'Authorization': `Bearer ${accesstoken}`} , body:JSON.stringify({userId:`${user.user._id}`})})
          setUnFollow("UnFollow")
        }else{
          await fetch(`http://localhost:5000/api/users/following/${id}` , {method:'PUT', headers:{'Content-Type':"application/JSON" ,'Authorization': `Bearer ${accesstoken}`} , body:JSON.stringify({userId:`${user.user._id}`})})
          setUnFollow("Follow")
        }
      }

  return (
    <div style={{width:'20%'}} className='text-white'>
         
   


    

<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-end px-4 pt-4">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            <span class="sr-only">Open dropdown</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button>
        <div id="dropdown" class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2" aria-labelledby="dropdownButton">
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li>
            </ul>
        </div>
    </div>
    <div class="flex flex-col items-center pb-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={specificUser?.avatar} alt="Bonnie image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{specificUser?.username}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        <h5 class=" text-xl font-medium text-gray-900 dark:text-white mt-1">Bio</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400 p-2">{specificUser?.bio}</span>


        <div class="flex mt-4 md:mt-6">
            {user?.user?._id !== id ? <div onClick={handleFollow}><button className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>{Follow}</button></div> : <div><button className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Edit Bio</button></div> }
            <Link to='http://localhost:5173/home/setting'  class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Settings</Link>
           
                        
        </div>
    </div>
</div>





<div className="w-full max-w-md p-4 bg-white border border-gray-200 mt-10 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Following</h5>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                      {/* {user.user.following.length} */}
                      {followingCounter}


                  </a>
            </div>
          
            <div style={{ display: 'grid',gridTemplateColumns: '1fr 1fr 1fr'}} className="  gap-4 ">
            {followingUsers.map((user,index) => (
                    <Link  key={index} to={`/home/Profile/${user._id}`}>
                        <div  className="" onClick={() => setTimeout(()=>{window.location.reload()},2000) }>
                            <img className="w-18 h-18 rounded-lg" src={user?.avatar} alt="Neil image"/>
                            <p className='text-black font-bold text-xs truncate mt-2 text-center'>{user?.username}</p>
                        </div>
                    </Link>
               ))}

            </div>

          </div>
</div>



  )
}

export default LeftSideProfile
