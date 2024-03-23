import React from 'react'
import imgface from '../../../shared/imgs/imgface.jpg'
import {AnimatedPinDemo} from '../../auth/components/Card-3D'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
const LeftSide = () => {
    const {user} = useSelector((state)=>state.theUser)

    const [post, setPost] = useState([]);

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/posts/flw/${user?.user._id}`)
                setPost(res.data);
            } catch (error) {
                // Handle error
                // console.error("Error fetching posts:", error);
            }
        };
        
        getPost();
    }, []); // Empty dependency array means this effect runs only once after the component mounts



   
  return (
    <div style={{width:'20%',marginTop:'-80px'}} className='text-white fixed mt-0'>
         
        
          <AnimatedPinDemo/>

          <div style={{maxHeight:'320px'}} className="w-full max-w-md p-4 pb-4 bg-white border border-gray-200 mt-10 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 verflow-auto overflow-scroll">
              <div className="flex items-center justify-between mb-4">
                  <h5 className="text-lg font-bold leading-none text-gray-900 dark:text-white">Explore</h5>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                      See all
                  </a>
            </div>
          
            <div style={{ display: 'grid',gridTemplateColumns: '1fr 1fr 1fr'}} className="  gap-5 m-auto ">
                 {post.map((image,index) => (

                     image.image === '' ? '' : <img key={index} className="w-18 h-18 rounded-lg object-cover " src={image.image} alt="Neil image"/>
                ))}
            </div>

          </div>
    </div>
  )
}

export default LeftSide 