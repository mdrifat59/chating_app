import React from 'react'
import Friends from '../components/friends/Friends'
import Chattingbox from '../components/chatbox/Chattingbox'
import { Helmet } from 'react-helmet'

const Message = () => {
  return (
     <> 
     <Helmet>
      <title>Message</title>
     </Helmet>
         <div className='w-11/12 grid grid-cols-[2.3fr,4fr] '> 
            <div className='w-full p-5'>
                <Friends/>
            </div> 
            <div className='w-full p-5 '>
                 <Chattingbox/> 
            </div>
        </div> 
     </>
  )
}

export default Message