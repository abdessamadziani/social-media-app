import React from 'react'
import imgface from '../../../shared/imgs/imgface.jpg'
import axios from 'axios'
import { useState,useEffect } from 'react'
import {useSelector } from 'react-redux'
import { useLocation,Link } from 'react-router-dom'

function FriendRequest() {

    let location = useLocation();
    let id = location.pathname.split("/")[3];

    const {user}=useSelector((state)=>state.theUser)
    const [followers,setFollowers] = useState([]);
    const getMyFollowers = async()=>{
        try {
          const res = await axios.get(`http://localhost:5000/api/posts/followers/${id}`)
          setFollowers(res.data);
        } catch (error) {
          
        }
       }
    useEffect(() => {
    
        getMyFollowers();
    }, [])
    console.log("followers",followers)
  return (
   
//     <div className="w-full max-w-md p-4 bg-white border border-gray-200 mb-10  rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
//         <div className='flex justify-between'>
//             <h6 className='text-black font-bold '>Profile Views</h6>
//             <p className='text-black font-semibold'>33</p>
//         </div>
//         <div className='flex justify-between'>
//             <h6 className='text-black font-bold'>Friends</h6>
//             <p className='text-black font-semibold'>114</p>
//         </div>
     
//     <div className="flex items-center justify-between mb-4 mt-4">
//         <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Friend Request</h5>
       
//   </div>

//   <div className="flow-root">
//             <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
//                 <li className="py-3 sm:py-4">
//                     <div className="flex items-center">
//                         <div className="flex-shrink-0">
//                             <img className="w-8 h-8 rounded-full" src={imgface} alt="Neil image"/>
//                         </div>
//                         <div className="flex-1 min-w-0 ms-4">
//                             <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                                 Neil Sims
//                             </p>
//                             <p className="text-sm text-gray-500 truncate dark:text-gray-400">wants to make you a friend</p>
//                         </div>
//                         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white cursor-pointer">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-green-500">
//                             <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
//                         </svg>

//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-4 w-6 h-6 text-red-500	 ">
//                             <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
//                         </svg>

//                         </div>
//                     </div>
//                 </li>
//                 <li className="py-3 sm:py-4">
//                     <div className="flex items-center ">
//                         <div className="flex-shrink-0">
//                             <img className="w-8 h-8 rounded-full" src={imgface} alt="Bonnie image"/>
//                         </div>
//                         <div className="flex-1 min-w-0 ms-4">
//                             <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                                 Bonnie Green
//                             </p>
//                             <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                             wants to make you a friend</p>
//                         </div>
//                         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white cursor-pointer">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-green-500">
//                                 <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
//                             </svg>

//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-4 w-6 h-6 text-red-500	">
//                                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
//                             </svg>
//                         </div>
//                     </div>
//                 </li>
//                 <li className="py-3 sm:py-4">
//                     <div className="flex items-center">
//                         <div className="flex-shrink-0">
//                             <img className="w-8 h-8 rounded-full" src={imgface} alt="Michael image"/>
//                         </div>
//                         <div className="flex-1 min-w-0 ms-4">
//                             <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                                 Michael Gough
//                             </p>
//                             <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                             wants to make you a friend  </p>
//                         </div>
//                         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white cursor-pointer">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-green-500">
//                             <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
//                         </svg>

//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" mx-4 w-6 h-6 text-red-500	">
//                             <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
//                         </svg>
//                         </div>
//                     </div>
//                 </li>
         
//             </ul>
//         </div>

//    </div>


<div style={{width:'360px',marginTop:'300px',marginLeft:'-1px',marginTop:'1px',maxHeight:'220px'}}  className="w-full max-w-md p-4 bg-white border border-gray-200 mb-10  rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 verflow-auto overflow-scroll fixed">
<div className='flex justify-between'>
    <h6 className='text-black font-bold '>Profile Views</h6>
    <p className='text-black font-semibold'>33</p>
</div>
<div className='flex justify-between'>
    <h6 className='text-black font-bold'>Friends</h6>
    <p className='text-black font-semibold'>114</p>
</div>

<div className="flex items-center justify-between mb-2 mt-2">
<h5 className="text-lg font-bold leading-none text-gray-900 dark:text-white">Followers</h5>
<a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
 {followers?.length}
</a>
</div>

<div className="flow-root">
    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
    {followers?.map((person,index) =>
    (
        <li key={index} className="py-3 sm:py-4">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full object-cover" src={person?.avatar} alt="Neil image"/>
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {person?.username}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">following you</p>
                </div>
                {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-green-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-4 w-6 h-6 text-red-500	 ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

                </div> */}
            </div>
        </li>
     ))}

    </ul>
</div>

</div>
  )
}

export default FriendRequest
