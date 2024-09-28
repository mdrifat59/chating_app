import React from 'react'
import Friends from '../components/friends/Friends'
import Chattingbox from '../components/chatbox/Chattingbox'

const Message = () => {
  return (
     <> 
         <div className='grid grid-cols-[2fr,4fr] gap-5  m-5 '>
            <div className='w-[490px] h-[730px] border  bg-[#FFFFFF] rounded-lg overflow-y-auto  '>
                <Friends/>
            </div> 
            <div className='w-full h-[730px] bg-[#FFFFFF] border shadow-lg rounded-lg '>
                 <Chattingbox/>
            </div>
        </div>
     </>
  )
}

export default Message