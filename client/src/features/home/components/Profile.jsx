import React from 'react'
import LeftSide from './LeftSide'
import NavBar from './NavBar'
import RightSideProfile from './RightSideProfile'
import MainPostProfile from './MainPostProfile'
import LeftSideProfile from './LeftSideProfile'
import Settings from './profileSettings/Settings'

const Profile = () => {
  return (
        <>
            <NavBar/>
            <div className='mx-4 my-10 flex  '>
                <LeftSideProfile/>
                <MainPostProfile/>
                <RightSideProfile />
            </div>
        </>
  )
}

export default Profile