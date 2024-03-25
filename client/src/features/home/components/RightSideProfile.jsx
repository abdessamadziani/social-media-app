import React from 'react'
import imgface from '../../../shared/imgs/imgface.jpg'
import FriendRequest from './FriendRequest'
import Follow from './RightSide/Follow'
import axios from 'axios'
import { useState,useEffect } from 'react'
import {useSelector } from 'react-redux'
function RightSideProfile() {




    const {user}=useSelector((state)=>state.theUser)

    const [followers,setFollowers] = useState([]);
    const [users,setUsers] = useState([]);
  

    const getAllUsers = async()=>{
        try {
          const res = await axios.get(`http://localhost:5000/api/users/all/user/${user.user._id}`)
          setUsers(res.data);
        } catch (error) {
          
        }
       }
    useEffect(() => {
    
     getAllUsers();
    }, [])

  return (
    <div className='mt-10'>
          <div style={{width:'25vw'}} className='text-white'>




    <FriendRequest/>






        <div style={{width:'360px',marginTop:'235px',marginLeft:'-1px', maxHeight:'335px'}} className=" max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 fixed verflow-auto overflow-scroll  ">
        <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-bold leading-none text-gray-900 dark:text-white">Suggested for you</h5>
        </div>

        {users.map((item,index) =>(
            <Follow key={index} fetchusers={getAllUsers}  userdetails={item}/>

            ))}
        {/* <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src={imgface} alt="Neil image"/>
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Neil Sims
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Followed by summan yo
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                        </div>
                    </div>
                </li>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center ">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src={imgface} alt="Bonnie image"/>
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Bonnie Green
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Followed by summan yo
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                        </div>
                    </div>
                </li>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src={imgface} alt="Michael image"/>
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Michael Gough
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Suggested for you
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                        </div>
                    </div>
                </li>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center ">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src={imgface} alt="Lana image"/>
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Lana Byrd
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Suggested for you
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                        </div>
                    </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                    <div className="flex items-center ">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src={imgface} alt="Thomas image"/>
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Thomes Lean
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Followed by summan yo
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                        </div>
                    </div>
                </li>
            </ul>
        </div> */}
    </div>


    </div>
    </div>
  )
}

export default RightSideProfile
