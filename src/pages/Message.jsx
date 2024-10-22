import React from 'react'
import Friends from '../components/friends/Friends'
import Chattingbox from '../components/chatbox/Chattingbox'

const Message = () => {
  return (
     <> 
         <div className='grid grid-cols-[2.3fr,5fr] gap-5  m-5 '> 
            <div className='w-full h-[95vh] border  bg-[#FFFFFF] rounded-lg overflow-y-auto scrollbar-thin '>
                <Friends/>
            </div> 
            <div className='w-full h-[95vh] bg-[#FFFFFF] border shadow-lg rounded-lg '>
                 <Chattingbox/>
            </div>
        </div> 
     </>
  )
}

export default Message