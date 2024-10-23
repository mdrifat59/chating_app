import React from 'react'
import AllUser from '../components/user/AllUser'
import FriendRequest from '../components/friendrequest/FriendRequest'
import Friends from '../components/friends/Friends'

const Homepage = () => {
  return (
     <>
        <div className='w-11/12 grid grid-cols-[2.1fr,5fr] '> 
            <div className='w-full p-5'>
                <AllUser/>                
            </div> 
            <div className='w-full h-[95vh] grid grid-cols-2 '>
                <div className='w-full p-5'>
                  <FriendRequest/>
                </div>
                <div className='w-full p-5'>
                    <Friends/>
                </div>
            </div>
        </div>
     </>
  )
}

export default Homepage