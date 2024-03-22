








// "use client";

// import Image from "./Image";
// import React from "react";
// import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
// // import Link from "link";

// import like from '../../../../shared/imgs/like.png'
// import liked from '../../../../shared/imgs/liked.png'
// import commentsIcon from '../../../../shared/imgs/comments.png'
// import share from '../../../../shared/imgs/share.png'

//  import { useState } from "react";

// export function ThreeDCardDemo() {
//   const [Like,setLike] = useState()
//   const [post,setPost] = useState()
//   const [comments,setComments] = useState()
//   const [likeCount,setLikeCount] = useState()
//   const [isOpen, setIsOpen] = useState(false);
//   const [isButtonVisible, setIsButtonVisible] = useState(true);
//   const handleModalEdit =()=>{}
//   const handleDelete = ()=>{}

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//     document.getElementById('dropdownButton').style='display-none'
//       // isButtonVisible === true ? setIsButtonVisible(false) : setIsButtonVisible(true) ;
//       setIsButtonVisible(!isButtonVisible);


// };


//   const handleShow = ()=>{
//    alert('comments show')
//   }
//   const handleLike =()=>{
//     console.log("h")
//   }

//   return (
//     <CardContainer className="inter-var" >
//       <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
//         <CardItem
//           translateZ="50"
//           className="text-xl font-bold text-neutral-600 dark:text-white w-full flex  justify-between	  "
//         >
//          <div className="flex items-center ">
//                     <div className="flex-shrink-0">
//                         <img className="w-8 h-8 rounded-full" src={liked} alt="Neil image"/>
//                     </div>
//                     <div className="flex-1 min-w-0 ms-4">
//                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                             username
//                         </p>
//                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                            Followed by me
//                         </p>
//                     </div>

//         </div>
//         <div className="">
          
//             {isButtonVisible === true ?  <button
//                 id="dropdownButton"
//                 onClick={toggleDropdown}
//                 className="inline text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5 bg-green-400"
//                 type="button"
//              >
//                 <span className="sr-only">Open dropdown</span>
//                 <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
//                     <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
//                 </svg>
//             </button> : '' }
          
//             <div id="dropdown" className={`z-10 ${isOpen ? '' : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 bg-green-400`}>
//                 <ul className="py-2" aria-labelledby="dropdownButton">
//                     <li>
//                         <button className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleModalEdit}>Edit</button>
//                     </li>
                 
//                     <li>
//                         <button className="block px-2 py-1 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleDelete}>Delete</button>
//                     </li>
//                     <li>
//                         <h3 className="cursor-pointer	 block px-2 py-1 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={toggleDropdown}>X</h3>
//                     </li>
//                 </ul>
//             </div> 
//         </div>       
//          </CardItem>
//         <CardItem
//           as="p"
//           translateZ="60"
//           className="text-black font-semibold	 text-sm max-w-sm mt-2 dark:text-neutral-300"
//         >
//           Hover over this card to unleash the power of CSS perspective
//         </CardItem>
//         <CardItem translateZ="100" className="w-full mt-4">
//           <Image
//             src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             height="1000"
//             width="1000"
//             className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
//             alt="thumbnail"
//           />
//         </CardItem>
//         <div className="flex justify-between items-center mt-20">
//           <CardItem
//             translateZ={20}
//             // as={Link}
//             href="https://twitter.com/mannupaaji"
//             target="__blank"
//             className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
//           >
//           <div  className='flex items-center '>
//              <div className='text-gray-900  mx-4 cursor-pointer'>
//                  <img className='w-7 h-7' src={liked} alt="like"  onClick={handleLike}/>
//                 <p> Likes</p>
//             </div> 
          

//             <div className='text-gray-900 mx-4  cursor-pointer'>
//              <img className='w-6 h-6' src={commentsIcon} alt="comment" onClick={handleShow} />
//              <p> Comments</p>
//              </div>

//            </div>
          
//           </CardItem>
//           <CardItem
//             translateZ={20}
//             as="button"
//             // className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
//           >
//           <div className='text-gray-900 cursor-pointer '>
//                 <img className='w-6 h-6' src={share} alt="like" />
//                 <p>Share</p>
//             </div>
//         </CardItem>
//         </div>

        
//       {show === true ? (
//             <div className='flex mt-6 '>
//                 <div className="flex-shrink-0">
//                     <img className="w-8 h-8 rounded-full" src={currentUser?.user?.avatar} alt="Neil image"/>
//                 </div>
//                 <input
//                     type="text"
//                     name="comment"
//                     id="comment"
//                     className="block flex-1 border-0  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                     placeholder="Write a comment ..."
//                     onChange={(e)=>setCommentwriting(e.target.value)}
//                   />
//                 <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={handleComment}>
//                  Add comment
//                </button>
//             </div>
//                ) : null }

//             {comments.map((item,index)=>{
//                return(
//                   <div  key={index} className="flex items-center mt-4   	">
//                   <div className="flex-shrink-0">
//                       <img className="w-8 h-8 rounded-full" src={item.profileImage} alt="Neil image"/>
//                   </div>
//                   <div className="flex-1 min-w-0 ms-4">
//                       <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                           {item.username}
//                       </p>
//                       <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                           {item.comment}
//                       </p>
//                   </div>
//                   <div className=" cursor-pointer inline-flex items-center text-base font-semibold text-gray-900 dark:text-white" >
//                      <img className='w-4 h-4 cursor-pointer mx-3' src={deleteIcon} alt="deleteIcon"  onClick={(e)=>{deleteComment(item._id)}}/>
//                      {/* <img className='w-4 h-4 cursor-pointer' src={pen} alt="editIcon"  onClick={(e)=>{editComment(item._id)}}/> */}
//                   </div>
                 
//                   </div>
//                 )})}

//       </CardBody>
//     </CardContainer>
//   );
// }
