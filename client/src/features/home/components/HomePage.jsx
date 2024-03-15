
import React from 'react'
import NavBar from './NavBar'
import LeftSide from './LeftSide'
import RightSide from './RightSide/RightSide'
import MainPost from './MainPost'
const HomePage = () => {
  return (
    <>
        <NavBar/>
        <div className='mx-4 my-10 flex  '>
          <LeftSide/>
          <MainPost/>
          <RightSide/>
        </div>
    
    </>

  )
}

export default HomePage


