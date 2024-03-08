import React from 'react'
import signUpImg from '../../../shared/imgs/media-amico.png'
// import { useForm } from "react-hook-form"
// import {useState} from 'react'
// import axios  from 'axios'
import { SignupFormDemo } from './ui/SignupForm'


// import Swal from 'sweetalert2'; // Import the main SweetAlert2 module
// import 'sweetalert2/dist/sweetalert2.min.css'; // Import the CSS file
// import 'sweetalert2/dist/sweetalert2.min.js'; // Import the JavaScript file

function SignUp() {


// const {
//         register,
//         handleSubmit,
//         formState: { errors }
//     } = useForm()


    // const clearInputs=()=>{
    //   document.getElementById('email').value=""
    //   document.getElementById('fullname').value=""
    //   document.getElementById('password').value=""
    //   document.getElementById('bdate').value=""
    //   document.getElementById('gender').value=""
    //   document.getElementById('bio').value=""


    
    // }
    
    
      //  const [user,setUser]=useState({
      //   fullname: '',
      //   email: '',
      //   password: '',
      //   bio: '',
      //   bdate: '',
      //   gender: ''

      //  })





    // const submitSignUp = () => {
    //     //  e.preventDefault()
    
    
    //         axios.post('http://localhost:5000/api/users/signup', user, {
    //           headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //           },
    //         })
    //           .then(res => {
    //             // Handle the successful response here.
    //             clearInputs()
    //             Swal.fire({
    //               title: 'Your registration is done successfully',
    //               text: 'Go Check Your Email To Activate Your Account',
    //               icon: 'success',
    //               confirmButtonText: 'Cool'
    //             })
                
    //           })
    //           .catch(error => {
    //             // Handle any errors that occur during the request.
    //             console.error(error);
    //             Swal.fire({
    //               title: 'Failed registration',
    //               text: 'Try Again ',
    //               icon: 'error',
    //               confirmButtonText: 'Okey'
    //             })
            
    //           });
          
    
    //    };

    //    const handleChange=(e)=>{

    //      setUser({...user,[e.target.id]:e.target.value})

    //  }

  return (
       <>
        <div className="container flex  mx-auto mt-10  ">
        <div className="flex w-1/2 justify-center h-1/3 	 ">
             <SignupFormDemo/>
            {/* <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form onSubmit={handleSubmit(submitSignUp)} className="space-y-6"  >
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign Up</h5>
                    <div>
                        <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                        <input  type="text" name="fullname"  id="fullname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com"   {... register ("fullname",{required:"fullName is required",minLength: {value: 4,message :"Min Length you need 4 caracters "},maxLength: {value: 15,message: "max Length is 15 caracters"}})}  onChange={handleChange}   />

                        {errors.fullname && (<small className='flex text-red-500'>{errors.fullname.message}</small>)}
                        
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input  type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com"  {...register("email",{required: "Email is required",pattern: {value:/^\S+@\S+\.\S+$/,message: 'Invalid Email Address'}})}  onChange={handleChange}  />

                        {errors.email && (<small className='flex text-red-500'>{errors.email.message}</small>)}
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"    {...register("password",{required: "Password is required",minLength: {value: 6,message :"Min Length you need 6 caracters "},maxLength: {value: 15,message: "max Length is 15 caracters"}})} onChange={handleChange}  />
                        {errors.password && (<small className='flex text-red-500'>{errors.password.message}</small>)}
                    </div>
                    <div>
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                        <select id="gender" name='gender' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'   {...register("gender",{required: "gender is required"})}  onChange={handleChange}>
                          <option  disabled selected></option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        {errors.gender && (<small className='flex text-red-500'>{errors.gender.message}</small>)}

                    </div>

                    <div>
                        <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                        <input type="text" name="bio" id="bio"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"    {...register("bio",{required: "Password is required",minLength: {value: 6,message :"Min Length you need 6 caracters "},maxLength: {value: 15,message: "max Length is 15 caracters"}})} onChange={handleChange}  />
                        {errors.bio && (<small className='flex text-red-500'>{errors.bio.message}</small>)}
                    </div>
                    <div>
                        <label htmlFor="bdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of birth</label>
                        <input type="date"  name="bdate" id="bdate"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"   onChange={handleChange}  />
                    </div>
                
                  
                   
                  
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
                    

                </form>

            </div> */}

        </div>
        <div className="w-1/2  h-2/3">
          <img src={signUpImg} alt="image" /> 
        </div>
    </div>
       </>
  )
}

export default SignUp