"use client";
import React from "react";
import { PinContainer } from "./ui/3d-pin";
import imgface from '../../../shared/imgs/imgface.jpg'

export function AnimatedPinDemo() {
  return (
    <div className="w-full mt-0 ">
      <PinContainer>
        
                 <div style={{height:'220px'}} className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 	 overflow-y-auto  ">
              <div className="flex items-center justify-between mb-2">
                  <h5 className="text-lg font-bold leading-none text-gray-900 dark:text-white">Notifications</h5>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                      View all
                  </a>
            </div>
            <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                      <li className="py-2 sm:py-4">
                          <div className="flex items-center">
                              <div className="flex-shrink-0">
                                  <img className="w-8 h-8 rounded-full" src={imgface} alt="Neil image"/>
                              </div>
                              <div className="flex-1 min-w-0 ms-4">
                                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                      Neil Sims
                                  </p>
                                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                      Liked your post
                                  </p>
                              </div>
                              <div className="inline-flex items-center text-base font-semibold text-white dark:text-white">
                                  $320
                              </div>
                          </div>
                      </li>
                      <li className="py-2 sm:py-4">
                          <div className="flex items-center ">
                              <div className="flex-shrink-0">
                                  <img className="w-8 h-8 rounded-full" src={"https://firebasestorage.googleapis.com/v0/b/social-media-2ce9e.appspot.com/o/1711406961641tt.jpg?alt=media&token=75c55cab-0c54-4cbe-957e-fcd6ef44d3de"} alt="Bonnie image"/>
                              </div>
                              <div className="flex-1 min-w-0 ms-4">
                                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                      Youness
                                  </p>
                                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                      send you a friend request
                                  </p>
                              </div>
                              <div className="inline-flex items-center text-base font-semibold text-white dark:text-white">
                                  $3467
                              </div>
                          </div>
                      </li>
                      <li className="py-2 sm:py-4">
                          <div className="flex items-center">
                              <div className="flex-shrink-0">
                                  <img className="w-8 h-8 rounded-full" src={"https://firebasestorage.googleapis.com/v0/b/social-media-2ce9e.appspot.com/o/1711406673952pexels-andrea-piacquadio-874158.jpg?alt=media&token=7c5acf9e-ad5a-4dbf-b07a-73750a446152"} alt="Michael image"/>
                              </div>
                              <div className="flex-1 min-w-0 ms-4">
                                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                      Michael Gough
                                  </p>
                                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                      comment on your post
                                  </p>
                              </div>
                              <div className="inline-flex items-center text-base font-semibold text-white dark:text-white">
                                  $67
                              </div>
                          </div>
                      </li>
                      <li className="py-2 sm:py-4">
                          <div className="flex items-center ">
                              <div className="flex-shrink-0">
                                  <img className="w-8 h-8 rounded-full" src={imgface} alt="Lana image"/>
                              </div>
                              <div className="flex-1 min-w-0 ms-4">
                                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                      Lana Byrd
                                  </p>
                                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                      send you a poke
                                  </p>
                              </div>
                              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                  $367
                              </div>
                          </div>
                      </li>
                      <li className="pt-2 pb-0 sm:pt-4">
                          <div className="flex items-center ">
                              <div className="flex-shrink-0">
                                  <img className="w-8 h-8 rounded-full" src={imgface} alt="Thomas image"/>
                              </div>
                              <div className="flex-1 min-w-0 ms-4">
                                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                      Thomes Lean
                                  </p>
                                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                      accept your friend request
                                  </p>
                              </div>
                              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                  $2367
                              </div>
                          </div>
                      </li>
                  </ul>
            </div>
          </div>
      </PinContainer>
     </div>
  );
}
