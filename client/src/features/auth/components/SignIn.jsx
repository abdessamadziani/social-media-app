import React from 'react'
import {useState} from 'react'
import signInImg from '../../../shared/imgs/media-bro.png'
import {Link,useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from "axios"

import Swal from 'sweetalert2'; // Import the main SweetAlert2 module
import 'sweetalert2/dist/sweetalert2.min.css'; // Import the CSS file
import 'sweetalert2/dist/sweetalert2.min.js'; // Import the JavaScript file
import {AnimatedPinDemo}  from './Card-3D'

import { login } from '../../../redux/api'
import { useDispatch,useSelector } from 'react-redux'


function SignIn() {
  const dispatch = useDispatch()
  const {isFetching ,error} = useSelector((state)=>state.theUser)

  
  const navigate=useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
} = useForm()




const [user,setUser]=useState({
  email: '',
  password: ''
 })


 const clearInputs=()=>{
  document.getElementById('email').value=""
  document.getElementById('password').value=""

}


const submitSignIn = () => {
  // axios.post('http://localhost:5000/api/users/signin', user, {
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  // })
        login(dispatch,user)
        // const token =useSelector((state)=>state.theUser.user[0].token)
        // alert(token)

    .then(res => {
      // alert(res.data.token)
      // Handle the successful response here.
      // console.log(res.data);


    //  login(dispatch,{user})

      clearInputs();
      Swal.fire({
        title: 'Sign is done successfully',
        text: 'Welcome',
        icon: 'success',
        confirmButtonText: 'Cool'
      });

              // console.log(' this is the res before create local storage',res);
              // localStorage.setItem('jwt_token',JSON.stringify(res.data));
              // console.log(' this is the res.data after creat local storage',res.data);
      navigate('/home')
    })
    .catch(error => {
      // Handle any errors that occur during the request.
      console.error(error);
      Swal.fire({
        title: 'Failed registration',
        text: 'Try Again ',
        icon: 'error',
        confirmButtonText: 'Okey'
      });
    });
};


   const handleChange=(e)=>{

    setUser({...user,[e.target.id]:e.target.value})

 }


  return (
    <>
            <div className="container flex  mx-auto mt-6 ">
      <div className=" flex w-1/2 justify-center h-1/3  ">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
              <form onSubmit={handleSubmit(submitSignIn)} className="space-y-6" >
              {/* <form  className="space-y-6" > */}

                  <h5 className="text-xl font-medium text-gray-900 dark:text-white ">Sign In</h5>
                 
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input   type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" {...register("email",{required: "Email is required",pattern: {value:/^\S+@\S+\.\S+$/,message: 'Invalid Email Address'}})} onChange={handleChange}  />
                      {errors.email && (<small className='flex text-red-500'>{errors.email.message}</small>)}
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                      <input  type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  {...register("password",{required: "Password is required",minLength: {value: 6,message :"Min Length you need 6 caracters "},maxLength: {value: 15,message: "max Length is 15 caracters"}})} onChange={handleChange}  />
                      {errors.password && (<small className='flex text-red-500'>{errors.password.message}</small>)}

                  </div>
                  <div className="flex items-start">
                   
                      <Link to='http://localhost:5173/auth/forgetpassword' className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</Link>
                  </div>
                  <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In</button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered? <Link to='http://localhost:5173/auth/signup' className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                  </div>
              </form>
          </div>
          
      </div>
      <div className="w-1/2 h-1/3">
        <img src={signInImg} alt="image" />
      </div>
   </div>

    </>

  )
}

export default SignIn