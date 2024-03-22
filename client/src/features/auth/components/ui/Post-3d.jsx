// "use client";

//  import Image from "./Image";
// import React from "react";
// import { CardBody, CardContainer, CardItem } from "./3d-card";

// import like from '../../../../shared/imgs/like.png'
// import liked from '../../../../shared/imgs/liked.png'
// import commentsIcon from '../../../../shared/imgs/comments.png'
// import { useState } from "react";

// export function ThreeDCardDemo() {

//   const [Like,setLike] = useState()
//   const [post,setPost] = useState()
//   const [comments,setComments] = useState()
//   const [likeCount,setLikeCount] = useState()
//   const handleShow = ()=>{

//   }
//   const handleLike =()=>{
//     console.log("h")
//   }

//   return (
//     <CardContainer className="inter-var">
//       <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
//         <CardItem
//           translateZ="50"
//           className="text-xl font-bold text-neutral-600 dark:text-white"
//         >
//           Make things float in air
//         </CardItem>
//         <CardItem
//           as="p"
//           translateZ="60"
//           className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
//         >
//           Hover over this card to unleash the power of CSS perspective
//         </CardItem>
//         <CardItem
//           translateZ="100"
//           rotateX={20}
//           rotateZ={-10}
//           className="w-full mt-4"
//         >
//           <Image
//            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//            height="1000"
//            width="1000"
//            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
//            alt="thumbnail"
//           />
//         </CardItem>
//         <div className="flex justify-between items-center mt-20">
//           <CardItem
//             translateZ={20}
//             translateX={-40}
//             as="button"
//             className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
//           >
//             <div  className='flex items-center '>
//             <div className='text-gray-900  mx-4 cursor-pointer'>
//                 <img className='w-7 h-7' src={Like} alt="like"  onClick={handleLike}/>
//                 <p> Likes</p>
//             </div> 
          

//             <div className='text-gray-900 mx-4  cursor-pointer'>
//             <img className='w-6 h-6' src={commentsIcon} alt="comment" onClick={handleShow} />
//             <p> Comments</p>
//             </div>

//             </div>
//           </CardItem>
//           <CardItem
//             translateZ={20}
//             translateX={40}
//             as="button"
//             className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
//           >
//             Sign up
//           </CardItem>
//         </div>
//       </CardBody>
//     </CardContainer>
//   );
// }











"use client";

import Image from "./Image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
// import Link from "link";

import like from '../../../../shared/imgs/like.png'
import liked from '../../../../shared/imgs/liked.png'
import commentsIcon from '../../../../shared/imgs/comments.png'
import share from '../../../../shared/imgs/share.png'

import { useState } from "react";

export function ThreeDCardDemo() {
  const [Like,setLike] = useState()
  const [post,setPost] = useState()
  const [comments,setComments] = useState()
  const [likeCount,setLikeCount] = useState()
  const handleShow = ()=>{

  }
  const handleLike =()=>{
    console.log("h")
  }

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            // as={Link}
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
          <div  className='flex items-center '>
             <div className='text-gray-900  mx-4 cursor-pointer'>
                 <img className='w-7 h-7' src={liked} alt="like"  onClick={handleLike}/>
                <p> Likes</p>
            </div> 
          

            <div className='text-gray-900 mx-4  cursor-pointer'>
             <img className='w-6 h-6' src={commentsIcon} alt="comment" onClick={handleShow} />
             <p> Comments</p>
             </div>

           </div>
          
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            // className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
          <div className='text-gray-900 cursor-pointer '>
                <img className='w-6 h-6' src={share} alt="like" />
                <p>Share</p>
            </div>
        </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
