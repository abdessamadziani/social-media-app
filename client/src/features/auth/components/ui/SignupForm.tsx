"use client";
import React from "react";
import { Label } from "./LabelForm";
import { Input } from "./InputForm";
import { cn } from "../../../../utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";



import { useForm } from "react-hook-form"
import {useState} from 'react'
import axios  from 'axios'


import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'sweetalert2/dist/sweetalert2.min.js'; // Import the JavaScript file

export function SignupFormDemo() {

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const clearInputs = (): void => {
    reset();
  }
    
    
       const [user,setUser]=useState({ })



const submitSignUp = () => {
    axios.post('http://localhost:5000/api/users/signup', user, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(res => {
    // Handle the successful response here.
    clearInputs();
    Swal.fire({
      title: 'Your registration is done successfully',
      text: 'Go Check Your Email To Activate Your Account',
      icon: 'success',
      confirmButtonText: 'Cool'
    });
  })
  .catch(error => {
    // Handle any errors that occur during the request.
    console.error(error);
    Swal.fire({
      title: 'Failed registration',
      text: 'Try Again',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  });
};


   const handleChange=(e)=>{
    setUser({...user,[e.target.id]:e.target.value})

}
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white ">
      <h2 className="font-bold text-xl   dark:text-neutral-200">
        Welcome to Aceternity
      </h2>
      <p className="text-neutral-600  text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p>

      <form className="my-8" onSubmit={handleSubmit(submitSignUp)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="fullname">Full name</Label>
            <Input id="fullname"   placeholder="Tyler" type="text"  {... register ("fullname",{required:"fullName is required",minLength: {value: 4,message :"Min Length you need 4 caracters "},maxLength: {value: 15,message: "max Length is 15 caracters"}})} onChange={handleChange}  />
            {errors.fullname && (<small className='flex text-red-500'>{errors.fullname.message}</small>)}

            

          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="lastname"  >User name</Label>
            <Input id="username"  placeholder="Durden" type="text"  {... register ("username",{required:"username is required",minLength: {value: 4,message :"Min Length you need 4 caracters "},maxLength: {value: 15,message: "max Length is 15 caracters"}})} onChange={handleChange}  />
            {errors.username && (<small className='flex text-red-500'>{errors.username.message}</small>)}

          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" >Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email"  {...register("email",{required: "Email is required",pattern: {value:/^\S+@\S+\.\S+$/,message: 'Invalid Email Address'}})}  onChange={handleChange} />
          {errors.email && (<small className='flex text-red-500'>{errors.email.message}</small>)}

        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" >Password</Label>
          <Input id="password"  placeholder="••••••••" type="password"   {...register("password",{required: "Password is required",minLength: {value: 6,message :"Min Length you need 6 caracters "},maxLength: {value: 15,message: "max Length is 15 caracters"}})} onChange={handleChange}  />
          {errors.password && (<small className='flex text-red-500'>{errors.password.message}</small>)}

        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="gender" >Gender</Label>
          <select id="gender" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'  {...register("gender",{required: "gender is required"})}  onChange={handleChange}   >
                          <option  disabled selected></option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        {errors.gender && (<small className='flex text-red-500'>{errors.gender.message}</small>)}

        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="bio" >Bio</Label>
          <Input id="bio" placeholder="bio ..." type="text"  {...register("bio",{required: "Bio is required",minLength: {value: 6,message :"Min Length you need 6 caracters "},maxLength: {value: 15,message: "max Length is 15 caracters"}})} onChange={handleChange} />
          {errors.bio && (<small className='flex text-red-500'>{errors.bio.message}</small>)}

        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="bdate" >Date Of Birth</Label>
          <Input id="bdate" name="bdate"  type="date" onChange={handleChange}  />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
        {/* <button
            className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input mt-4 bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-5 w-5 font-bold text-green-400	  dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 font-bold	">
              Google
            </span>
            <BottomGradient />
          </button> */}
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        {/* <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >

            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div> */}
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
