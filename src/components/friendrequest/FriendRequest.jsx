import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {
   const db = getDatabase();
   let user = useSelector((state) => state.login.loggedIn)
   let [request, setRequest] = useState([])
   useEffect(() => {
      const friendreqRef = ref(db, 'friendrequest/');
      onValue(friendreqRef, (snapshot) => {
         let reqarr = []
         snapshot.forEach((item) => {
            if (user.uid == item.val().receiverId) {
               reqarr.push({ ...item.val(), id: item.key })
            }
         })
         setRequest(reqarr)
      });
   }, [])

   return (
      <>
         <div className='p-5'>
            <h2 className='font-inter_semibold text-3xl text-[#494949] mb-10'>Friend Request</h2>
            <div className='flex flex-col gap-y-5'>
               {request.length == "0" ?
                  <div className='flex justify-center items-center h-56'>
                     <h2 className='text-3xl'>No Friend Request</h2>
                  </div>
                  :
                  request.map((item) => (

                     <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-5'>
                           <div className='w-[63px] h-[63px] rounded-full bg-gray-600'></div>
                           <h3 className='font-inter_Regular text-[23px] text-[#000000]'>{item.senderName}</h3>
                        </div>
                        <div className='flex gap-3' >
                           <button className='py-3 px-10 font-inter_medium text-sm bg-[#4A81D3] text-[#FFFFFF] rounded-lg'>Accept</button>
                           <button className='py-3 px-10 font-inter_medium text-sm bg-[#D34A4A] text-[#FFFFFF] rounded-lg'>Reject</button>
                        </div>
                     </div>
                  ))
               }


            </div>
         </div>
      </>
   )
}

export default FriendRequest