import React from 'react'
import AllUser from '../components/user/AllUser'
import FriendRequest from '../components/friendrequest/FriendRequest'

const Homepage = () => {
  return (
     <>
        <div className='grid grid-cols-[2fr,5fr] gap-5 m-5 '>
            <div className='w-[420px] h-[730px]  bg-[#FFFFFF]  '>
                <AllUser/>                
            </div> 
            <div className='w-full h-[730px] grid grid-cols-2 gap-5'>
                <div className='w-full bg-[#FFFFFF] shadow-lg rounded-lg'>
                  <FriendRequest/>
                </div>
                <div className='w-full bg-green-300'></div>
            </div>
        </div>
     </>
  )
}

export default Homepage