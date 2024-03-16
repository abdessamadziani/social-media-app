import React from 'react'
import { useState,useEffect } from 'react'
import imgface from '../../../../shared/imgs/imgface.jpg'
import adduser from '../../../../shared/imgs/add-user.png'
import adduserdone from '../../../../shared/imgs/add-user-done.png'
import axios from 'axios'

const Follow = ({userdetails,fetchusers}) => {

    const [follow, setFollow] = useState(adduser);

    const handleFollow = async (id) => {
      try {
          // Make the Axios PUT request
          await axios.put(
          `http://localhost:5000/api/users/following/${id}`,
          { userId: '65eae5ab7bd923690fe88857' }, // Body data
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZTVhYjdiZDkyMzY5MGZlODg4NTciLCJpYXQiOjE3MTA1MzQ3ODB9.KZ2U_lOVO-bMFEdHMqauzHmzfH7PA_vZKrAxjA8Zey8'
            }
          }

        );
       
        setTimeout(() => {
            fetchusers()
            setFollow(adduser);

          }, 3000);

        // Update the follow state after the request is successful

        if(follow === adduser )
            {
                setFollow(adduserdone);
            }
        else
        {
            setFollow(adduser);
        }

        
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    };
    

  return (
             <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                      <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                              <div className="flex-shrink-0">
                                  <img className="w-10 h-10 rounded-full cover" src={userdetails.avatar} alt="Neil image"/>
                              </div>
                              <div className="flex-1 min-w-0 ms-4">
                                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                      {userdetails.username}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                      Followed by summan yo
                                  </p>
                              </div>
                              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white cursor-pointer">
                                <img className='w-5 h-5' src={follow} alt="add user icon" onClick={()=>handleFollow(userdetails._id)} />
                              </div>
                          </div>
                      </li>
                      {/* <li className="py-3 sm:py-4">
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
                              
                              <img className='w-5 h-5' src={adduser} alt="add user icon" />
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
                             
                                <img className='w-5 h-5' src={adduserdone} alt="add user icon" />

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
                      </li> */}
                  </ul>
            </div>
  )
}

export default Follow