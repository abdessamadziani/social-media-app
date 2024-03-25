import React from 'react'
import imgface from '../../../shared/imgs/imgface.jpg'
import ContentPost from './ContentPost'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {useSelector } from 'react-redux'
import app from '../../../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Spinner from '../spinner'
import spinnerImg from '../../../shared/imgs/Spinner-1s-200px.svg'





const MainPost = () => {

  const {user}=useSelector((state)=>state.theUser)
  const accessToken=user.token
  const [post , setPost] = useState([]);
  const [imagePre , setImagePre] = useState(null);
  const [videoPre , setVideoPre] = useState(null);
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [title, setTitle] = useState('');


  const [userDetails, setUserDetails] = useState();
  const getUserDetails = async () => {
    try {
       
        const res = await axios.get(
        `http://localhost:5000/api/users/user/details/${user?.user._id}`,
       
      );
      setUserDetails(res.data)
      
    } catch (error) {
      // Handle errors
      // console.error('Error:', error);
    }
  };

  useEffect(() => {
    getUserDetails()
  }, [])



  const handlePost = (e)=>{
    e.preventDefault();
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
      fetch(`http://localhost:5000/api/posts/user/post` , {method:"POST" , headers:{'Content-Type':"application/JSON", 'Authorization':`Bearer ${accessToken}`} , body:JSON.stringify({ title:title  , image:downloadURL , video:''})}).then((data)=>{
        alert("Your Post was upload successfully img");
        window.location.reload(true)
      })
    });
  }
);} else if(file2 !== null){
    const fileName = new Date().getTime() + file2?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage , fileName);

    const uploadTask = uploadBytesResumable(StorageRef, file2);
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
      fetch(`http://localhost:5000/api/posts/user/post` , {method:"POST" , headers:{'Content-Type':"application/JSON", 'Authorization':`Bearer ${accessToken}`} , body:JSON.stringify({title:title , video:downloadURL , image:''})}).then((data)=>{
        alert("Your Post was upload successfully vd");
        window.location.reload(true)
      })
    });
  }
);
}else{
  fetch(`http://localhost:5000/api/posts/user/post` , {method:"POST" , headers:{'Content-Type':"application/JSON", 'Authorization':`Bearer ${accessToken}`} , body:JSON.stringify({title:title , video:'' , image:''})}).then((data)=>{
    alert("Your Post was upload successfully status");
    window.location.reload(true)
  }).catch(error=>console.log(error))
}


  }




 
  useEffect(() => {
   const getPost = async()=>{

    try {
      const res = await axios.get(`http://localhost:5000/api/posts/flw/${user.user._id}` , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`

        }
      })
      setPost(res.data);
    } catch (error) {
      
    }
   }
   getPost();
  }, [])



  return (
    <>
    <div style={{width:'45%',marginLeft:'380px'}} className='text-white mt-10'>
      
        <div style={{width:'100%'}}  className="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
            <div className='flex'>
                <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full object-cover	" src={userDetails?.avatar} alt="Neil image"/>
                </div>
                <input
                    type="text"
                    name="post"
                    id="post"
                    className="block flex-1 border-0  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Write your real thought ..."
                    onChange={(e)=>setTitle(e.target.value)}
                  />
            </div>
            <div>
            {imagePre !== null ? <img src={imagePre} className='cover w-full rounded' alt="preimage" /> : videoPre !== null ? <video className='cover w-full rounded'  width="500" height="500" controls >
              <source src={videoPre} type="video/mp4"/>
              </video> : ''
            } 
            </div>
            <div className='flex justify-between mt-6'>
              <div className='flex items-center  '>
                   <div className='text-gray-900'>
                     {/* <label className="cursor-pointer "  htmlFor="file" onClick={()=>{setImagePre(null),setVideoPre(null)}}> */}
                     <label className="cursor-pointer "  htmlFor="file"  onClick={()=>{setImagePre(null),setVideoPre(null)}} >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                      <input type="file" id='file' name='file' className='hidden' onChange={(e)=>[setFile(e.target.files[0]) , setImagePre(URL.createObjectURL(e.target.files[0]))]} />
                      </label>
                   </div>
                  
                   <div className='text-gray-900 mx-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                    </svg>
                  </div>

                    <div className='text-gray-900'>
                    {/* <label className="cursor-pointer"  htmlFor="file2"  onClick={()=>{setImagePre(null),setVideoPre(null)}}> */}
                    <label className="cursor-pointer"  htmlFor="file2" onClick={()=>{setImagePre(null),setVideoPre(null)}}  >

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                      <input type="file" id='file2' name='file2' className='hidden' onChange={(e)=>[setFile2(e.target.files[0]) , setVideoPre(URL.createObjectURL(e.target.files[0]))] } />

                    </label>
                    </div>

              </div>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={handlePost}>
                 Post
              </button>
           
            </div>
        </div>
        
        {post && post.length > 0 ? (
  post.map((item,index) => (
    <ContentPost key={index} post={item} />
  ))
) : (
  <div className='w-full'>
    <img className='w-full h-36' src={spinnerImg} alt="Loading Spinner" />
  </div>
)}

      


        {/* {post.map((item,index)=>(
          <ContentPost key={index} post={item}/>
        ))} */}
    

    </div>
   </>
  )
}

export default MainPost