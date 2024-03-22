import React from 'react'
import imgface from '../../../shared/imgs/imgface.jpg'
import like from '../../../shared/imgs/like.png'
import liked from '../../../shared/imgs/liked.png'
import dislike from '../../../shared/imgs/dislike.png'
import unlike from '../../../shared/imgs/unlike.png'
import share from '../../../shared/imgs/share.png'
import commentsIcon from '../../../shared/imgs/comments.png'
import pen from '../../../shared/imgs/pen.png'
import deleteIcon from '../../../shared/imgs/delete.png'

import {Fragment, useRef, useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import app from '../../../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ContentPost = ({post}) => {


  const currentUser = useSelector((state) => state.theUser.user)
  const accessToken = currentUser.token



  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [file, setFile] = useState(null)

  const handleDelete = async () =>{
    try {
      const res = await axios.delete(`http://localhost:5000/api/posts/delete/post/${post._id}`,  {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`

        }
      })
      setUser(res.data);
    } catch (error) {
      
    }
  }

const handleModalEdit=()=>{

  setOpenEdit(true)
}

const cancelButtonRef = useRef(null)



const handleSubmitEdit = async(event) => {
  event.preventDefault();






  if(file !== null){
    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage,fileName);
    
    const uploadTask = uploadBytesResumable(StorageRef, file);
    uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      fetch(`http://localhost:5000/api/posts/update/post/${post._id}` , {method:"PUT" , headers:{'Content-Type':"application/JSON", 'Authorization':`Bearer ${accessToken}`} , body:JSON.stringify({ title:newTitle  , image:downloadURL , video:''})}).then((data)=>{
        alert("Your Post was upload successfully img updated");
        // window.location.reload(true)
      })
    });
  }
);}


  setOpenEdit(false); // Close the modal
};





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

  



  const [Like,setLike] = useState(post.like.includes(`${currentUser?.user?._id}`) ? liked : like)
  // const [Dislike,setDislike] = useState(post.dislike.includes(`${currentUser?.user?._id}`) ? unlike : dislike)
  const [likeCount,setLikeCount] = useState(post?.like.length)
  // const [DislikeCount,setDislikeCount] = useState(post?.dislike.length)

  const [comments,setComments] = useState(post.comments)
  const [commentwriting, setCommentwriting] = useState('');
  const [editedComment, setEditedComment] = useState('');



  const [isOpen, setIsOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const toggleDropdown = () => {
      setIsOpen(!isOpen);
      document.getElementById('dropdownButton').style='display-none'
        // isButtonVisible === true ? setIsButtonVisible(false) : setIsButtonVisible(true) ;
        setIsButtonVisible(!isButtonVisible);


  };
 

  const [show,setShow] = useState(false)

  const handleShow = ()=>{
    if(show === false)
      setShow(true)
    else
    setShow(false)

  }

  const handleComment = () =>{
    addComment()
  }

  const addComment = async ()=>{

    const newComment = {

      'postId': `${post._id}`,
      'comment': `${commentwriting}`,
      'profileImage': `${currentUser.user.avatar}`,

     }

   
    await fetch(`http://localhost:5000/api/posts/comment/post` , {method:"PUT" , headers:{'Content-Type':"application/Json" , 'Authorization':`Bearer ${accessToken}`} , body:JSON.stringify(newComment)})

     setCommentwriting(''),
     setComments([...comments,newComment])
     document.getElementById('comment').value=''
  }




  const deleteComment = async (id)=>{

    const deletedComment = {

      'postId': `${post._id}`,
      'commentId': `${id}`,

     }

   
     await fetch(`http://localhost:5000/api/posts/delete/comment` , {method:"PUT" , headers:{'Content-Type':"application/Json" , 'Authorization':`Bearer ${accessToken}`} , body:JSON.stringify({postId: deletedComment.postId , commentId:deletedComment.commentId})})

  
  }


  // const editComment = async (id)=>{

  //   const commentObg = {

  //     'postId': `${post._id}`,
  //     'commentId': `${id}`,
  //     'editedComment': editedComment

  //    }

   
  //    await fetch(`http://localhost:5000/api/posts/edit/comment` , {method:"PUT" , headers:{'Content-Type':"application/Json" , 'Authorization':`Bearer ${accessToken}`} , body:JSON.stringify({postId:commentObg.postId , commentId:commentObg.commentId , editedComment})})

  
  // }


 

  const handleLike = async ()=>{
    if(Like === like)
      {
        await fetch(`http://localhost:5000/api/posts/${post._id}/like` , {method:"PUT" , headers:{'Content-Type':"application/Json",'Authorization':`Bearer ${accessToken}`}})
        setLike(liked)
        setLikeCount(likeCount + 1)

          // post.dislike.includes(`${currentUser?.user?._id}`) ? (setDislike(dislike),setDislikeCount(post?.dislike.length - 1)) : null

      }
      else
      {
        await fetch(`http://localhost:5000/api/posts/${post._id}/like` , {method:"PUT" , headers:{'Content-Type':"application/Json",'Authorization': `Bearer ${accessToken}`}})
        setLike(like)
        setLikeCount(likeCount - 1)

      }
  }

  // const handleDislike = async ()=>{
  // if(Dislike === dislike)
  //   {
  //   await fetch(`http://localhost:5000/api/posts/${post._id}/dislike` , {method:"PUT" , headers:{'Content-Type':"application/Json",'Authorization':`Bearer ${accessToken}`}})
  //   setDislike(unlike)
  //   setDislikeCount(DislikeCount + 1)
  //   // post.like.includes(`${currentUser?.user?._id}`) ? alert("yess") (setLike(like),setLikeCount(post?.like.length - 1)) :null


  // }
  // else
  // {
  //   await fetch(`http://localhost:5000/api/posts/${post._id}/dislike` , {method:"PUT" , headers:{'Content-Type':"application/Json",'Authorization': `Bearer ${accessToken}`}})
  //   setDislike(dislike)
  //   setDislikeCount(DislikeCount - 1)

  // }
  // }
  return (
    <>
    <div style={{width:'100%',marginTop:20,marginBottom:20}} className='text-white'>


      
        <div style={{maxHeight:'800px'}}  className="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 overflow-y-auto scroll-smooth	 	 	">
        <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src={user?.avatar} alt="Neil image"/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {user.username}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                           Followed by me
                        </p>
                    </div>


            {isButtonVisible === true ?   <button
                id="dropdownButton"
                onClick={toggleDropdown}
                className="inline text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                type="button"
             >
                <span className="sr-only">Open dropdown</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
            </button> : '' }
          
            <div id="dropdown" className={`z-10 ${isOpen ? '' : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                        <button className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleModalEdit}>Edit</button>
                    </li>
                 
                    <li>
                        <button className="block px-2 py-1 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleDelete}>Delete</button>
                    </li>
                    <li>
                        <h3 className="cursor-pointer	 block px-2 py-1 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={toggleDropdown}>X</h3>
                    </li>
                </ul>
            </div>
           {/* </div> */}


        </div>
        
        <p className='text-black font-bold text-xs font-sans py-4'>{post.title}</p>
        {post.image !=='' ? <div className='cover' style={{height:400}}> <img className='cover w-full h-auto rounded object-cover' style={{width:'100%',height:'100%'}} src={`${post.image}`} alt="" /> </div>: post.video !== '' ?
        <video className="cover w-full rounded" width="500" height="400" controls >
          <source src={`${post.video}`} type="video/mp4"/>
       </video> : '' }
            <div  className='flex justify-between mt-6'>
              <div  className='flex items-center '>

                   <div className='text-gray-900  mx-4 cursor-pointer'>
                        <img className='w-7 h-7' src={Like} alt="like"  onClick={handleLike}/>
                        <p>{likeCount} Likes</p>
                   </div> 
                   {/* <div className='text-gray-900  mx-4 cursor-pointer'>
                        <img className='w-6 h-6' src={Dislike} alt="dislike"  onClick={handleDislike}/>
                        <p> {DislikeCount} Dislikes</p>
                   </div>  */}

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
                    <img className="w-8 h-8 rounded-full" src={currentUser?.user?.avatar} alt="Neil image"/>
                </div>
                <input
                    type="text"
                    name="comment"
                    id="comment"
                    className="block flex-1 border-0  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Write a comment ..."
                    onChange={(e)=>setCommentwriting(e.target.value)}
                  />
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={handleComment}>
                 Add comment
               </button>
            </div>
               ) : null }

            {comments.map((item,index)=>{
               return(
                  <div  key={index} className="flex items-center mt-4   	">
                  <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src={item.profileImage} alt="Neil image"/>
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {item.username}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {item.comment}
                      </p>
                  </div>
                  <div className=" cursor-pointer inline-flex items-center text-base font-semibold text-gray-900 dark:text-white" >
                     <img className='w-4 h-4 cursor-pointer mx-3' src={deleteIcon} alt="deleteIcon"  onClick={(e)=>{deleteComment(item._id)}}/>
                     {/* <img className='w-4 h-4 cursor-pointer' src={pen} alt="editIcon"  onClick={(e)=>{editComment(item._id)}}/> */}
                  </div>
                 
                  </div>
                )})}


        </div>
    </div>






<Transition.Root show={openEdit} as={Fragment}>
  <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setOpenEdit(false)}>
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    </Transition.Child>

    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Deactivate account
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to deactivate your account? All of your data will be permanently
                      removed. This action cannot be undone.
                    </p>
                    <div className="p-4 md:p-5">
                      <form className="space-y-4" onSubmit={handleSubmitEdit}>
                      {/* <input type="text" name="postId" id="postId" defaultValue={post._id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Appartement number" required/> */}
                        <div>
                          <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                          <input type="text" name="title" id="title" defaultValue={post.title} onChange={(e)=>setNewTitle(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Appartement number" required/>
                        </div>
                        <div>
                          <label htmlFor="floor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image / Video</label>
                          <input type="file" name="file" id="file" onChange={(e)=>setFile(e.target.files[0])} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                        </div>
                        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="submit"
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => setOpenEdit(false)}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition.Root>




</> )
}

export default ContentPost