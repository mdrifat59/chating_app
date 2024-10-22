import React from 'react'
import AllUser from '../components/user/AllUser'
import FriendRequest from '../components/friendrequest/FriendRequest'
import Friends from '../components/friends/Friends'

const Homepage = () => {
  return (
     <>
        <div className='grid grid-cols-[2.2fr,5fr] gap-5 m-5 '> 
            <div className='w-full h-[95vh] border  bg-[#FFFFFF] scrollbar-thin '>
                <AllUser/>                
            </div> 
            <div className='w-full h-[95vh] grid grid-cols-2 gap-5'>
                <div className='w-full bg-[#FFFFFF] border shadow-lg rounded-lg overflow-y-auto scrollbar-thin'>
                  <FriendRequest/>
                </div>
                <div className='w-full bg-[#FFFFFF] shadow-lg rounded-lg border overflow-y-auto scrollbar-thin'>
                    <Friends/>
                </div>
            </div>
        </div>
     </>
  )
}

export default Homepage