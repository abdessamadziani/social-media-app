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
    const [bio , setBio] = useState('');

    const handleBio = (e)=>{
      setBio(e.target.value)
      
    }
    const handleUpdate = async (e)=>{
      e.preventDefault();

      try {
        const res  = await axios.put(`http://localhost:5000/api/users/edit/user/bio/${id}` ,
        { bio}, // Body data
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accesstoken}`

          }
        } )
        setBio(res.data);
      } catch (error) {
        console.log("Some error occured")
      }

    }
   
    const getuser = async()=>{
      try {
        const res  = await axios.get(`http://localhost:5000/api/users/post/user/details/${id}`)
        setSpecificUser(res.data);
      } catch (error) {
        console.log("Some error occured")
      }
    }
useEffect(() => {
      getuser();
    }, [bio])


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
    <>
    <div style={{width:'20%'}} className='text-white'>
         
   


    

 <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"> 
   

   <div className="flex flex-col items-center pb-10 mt-5">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={specificUser?.avatar} alt="Bonnie image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{specificUser?.username}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        <h5 className=" text-xl font-medium text-gray-900 dark:text-white mt-1">Bio</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400 p-2">{specificUser?.bio}</span>


        <div className="flex mt-4 md:mt-6">
            {user?.user?._id !== id ? <div onClick={handleFollow}><button className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>{Follow}</button></div> : <div><button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"  className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Edit Bio</button></div> }
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







<div id="authentication-modal" tabindex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Sign in to our platform
                </h3>
                <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleUpdate}>
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Edit bio</label>
                        <textarea type="text"  defaultValue={specificUser.bio} name="bio" id="bio" onChange={handleBio} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" ></textarea>
                    </div>
                    <button  className="w-full text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Update</button>
                   
                </form>
            </div>
        </div>
    </div>
</div> 



</>
  )
}

export default LeftSideProfile
