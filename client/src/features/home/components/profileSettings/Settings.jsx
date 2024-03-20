import React from 'react'

import './app.css'
import NavBar from '../NavBar'
import {useSelector } from 'react-redux'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useForm } from "react-hook-form"
import app from '../../../../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function Settings() {



  const {
    register,
    handleSubmit,
    formState: { errors }
} = useForm()


  const {user}=useSelector((state)=>state.theUser)
  const accessToken = user.token
  const [username, setUserName] = useState('');
  const [fullname, setFullName] = useState('');
  const [userDetails, setUserDetails] = useState();
  // const [avatar, setAvatar] = useState('');



  const [file, setFile] = useState(null)


//   if(file !== null){
//     const fileName = new Date().getTime() + file?.name;
//     const storage = getStorage(app);
//     const StorageRef = ref(storage,fileName);
    
//     const uploadTask = uploadBytesResumable(StorageRef, file);
//     uploadTask.on('state_changed', 
//   (snapshot) => {
//     // Observe state change events such as progress, pause, and resume
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//     }
//   }, 
//   (error) => {
//     // Handle unsuccessful uploads
//   }, 
//   () => {
//     // Handle successful uploads on complete
//     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       fetch(`http://localhost:5000/api/users/edit/user/${user?.user._id}` , {method:"PUT" , headers:{'Content-Type':"application/JSON", 'Authorization':`Bearer ${accessToken}`} , body:JSON.stringify({ username,fullname, avatar:downloadURL})}).then((data)=>{
//         alert("Your profile  updated successfully");
//         // window.location.reload(true)
//       })
//     });
//   }
// );}


  const handleEdit = async ()=>{
    try {
     
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
           const res = fetch(`http://localhost:5000/api/users/edit/user/${user?.user._id}` , {method:"PUT" , headers:{'Content-Type':"application/JSON", 'Authorization':`Bearer ${accessToken}`} , body:JSON.stringify({ username,fullname, avatar:downloadURL})
              }).then((data)=>{
            
            alert("Your profile  updated successfully");
         
             window.location.reload(true)
          })
        

        });
      }
    );
    
  }

    else
    {
       const res = fetch(`http://localhost:5000/api/users/edit/user/${user?.user._id}` , {method:"PUT" , headers:{'Content-Type':"application/JSON", 'Authorization':`Bearer ${accessToken}`} , body:JSON.stringify({ username,fullname, avatar:user.user.avatar})})
      setUser(res.data);
      getUserDetails()
    }




    } catch (error) {
      
    }
  }





  const getUserDetails = async () => {
    try {
       
       const res = await axios.get(
        `http://localhost:5000/api/users/user/details/${user?.user._id}`,
       
      );
      setUserDetails(res.data)
      
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getUserDetails()
   }, [])

  


  return (
    <>
    <NavBar/>
      <div className='container m-auto mt-4  '>
              <div className="col-span-12 lg:col-span-8">
              <div className="card">
                <div
                  className="flex flex-col items-center space-y-4 border-b border-slate-200 p-4 dark:border-navy-500 sm:flex-row sm:justify-between sm:space-y-0 sm:px-5"
                >
                  <h2
                    className="text-lg font-medium tracking-wide text-slate-700 dark:text-navy-100"
                  >
                    Account Setting
                  </h2>
                  <div className="flex justify-center space-x-2">
                    <button
                      className="btn min-w-[7rem] rounded-full border border-slate-300 font-medium text-slate-700 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-100 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
                    >
                      Cancel
                    </button>
                    <button
                      className="btn min-w-[7rem] rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                     onClick={handleSubmit(handleEdit)}
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col">
                    <span
                      className="text-base font-medium text-slate-600 dark:text-navy-100"
                      >Avatar</span
                    >
                    <div className="avatar mt-1.5 h-20 w-20">
                      <img
                        className="mask is-squircle"
                        src={userDetails?.avatar}
                        alt="avatar"
                        onChange={(e)=>setFile(e.target.files[0])}
                      />
                      <div
                        className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-white dark:bg-navy-700"
            
                      >
                        <input
                          className="btn h-6 w-6 rounded-full border border-slate-200 p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:border-navy-500 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                          onChange={(e)=>setFile(e.target.files[0])}
                          type='file'
                        >
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                            />
                          </svg> */}
                        </input>
                      </div>
                    </div>
                  </div>
                  <div className="my-7 h-px bg-slate-200 dark:bg-navy-500"></div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span>User name </span>
                      <span className="relative mt-1.5">
                        <input
                          className=" mt-2 form-input peer w-full rounded-full border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                          defaultValue={userDetails?.username}
                          type="text"
                          {...register("username",{required: "Username is required", minLength: {value: 3,message :"Min Length you need 3 caracters "},maxLength: {value: 10,message: "max Length is 10 caracters"}  })}
                          onChange={(e)=> setUserName(e.target.value) }

                        />
                        <br/>
                        {errors.username && (<small className='flex text-red-500'>{errors.username.message}</small>)}
                      </span>
                    </label>
                    <label className="block">
                      <span>Full Name </span>
                      <span className="relative mt-1.5">
                        <input
                          className=" mt-2 form-input peer w-full rounded-full border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                          defaultValue={ userDetails?.fullname}
                          type="text"
                          {...register("fullname",{required: "Fullname is required", minLength: {value: 5,message :"Min Length you need 5 caracters "},maxLength: {value: 18,message: "max Length is 18 caracters"}  })}
                          onChange={(e)=>setFullName(e.target.value)}

                        />
                        <br/>
                        {errors.fullname && (<small className=' block text-red-500'>{errors.fullname.message}</small>)}

                      </span>
                    </label>
                    <label className="block">
                      <span>Email Address </span>
                      <span className="relative mt-1.5 flex">
                        <input
                          className="form-input peer w-full rounded-full border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                          defaultValue={user?.user.email}
                          type="text"
                          readOnly
                        />
                        <span
                          className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent"
                        >
                          {/* <i className="fa-regular fa-envelope text-base"></i> */}
                        </span>
                      </span>
                    </label>
                    <label className="block">
                      <span>Gender</span>
                      <span className="relative mt-1.5 flex">
                        <input
                          className="form-input peer w-full rounded-full border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                          defaultValue={user.user.gender}
                          type="text"
                          readOnly
                        />
                        <span
                          className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent"
                        >
                          {/* <i className="fas fa-cash-register"></i>  */}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="my-7 h-px bg-slate-200 dark:bg-navy-500"></div>
                  <div>
                    <h3
                      className="text-base font-medium text-slate-600 dark:text-navy-100"
                    >
                      Linked Accounts
                    </h3>
                    <p className="text-xs+ text-slate-400 dark:text-navy-300">
                      Lorem ipsum dolor sit amet consectetur.
                    </p>
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12">
                          <img src="images/logos/google.svg" alt="logo" />
                        </div>
                        <p className="font-medium line-clamp-1">
                          Sign In with Google
                        </p>
                      </div>
                      <button
                        className="btn h-8 rounded-full border border-slate-200 px-3 text-xs+ font-medium text-primary hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-500 dark:text-accent-light dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  </div>

  </>
  )
}

export default Settings

