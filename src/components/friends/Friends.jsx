import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const Friends = () => {
   const db = getDatabase();
   let user = useSelector((state) => state.login.loggedIn)
   let [friend, setFriend] = useState([])

   useEffect(() => {
      const friendRef = ref(db, 'friends/');
      onValue(friendRef, (snapshot) => {
         let arr = []
         snapshot.forEach((item) => {
            if (user.uid == item.val().senderId || user.uid == item.val().receiverId) {
               arr.push({ ...item.val(), id: item.key })
            }
         })
         setFriend(arr)
      });

   }, [])

   // Unfriend
   let handleUnfriend = (item) => {
      remove(ref(db, "friends/" + item))
   }
   return (
      <>
         <div className='p-5'>
            <h2 className='font-inter_semibold text-3xl text-[#494949] mb-10'>My Friends</h2>
            <div className='flex flex-col gap-y-5'>

               {
                  friend.length == "0" ?
                     <div className='flex justify-center items-center h-56'>
                        <h2 className='text-3xl'>No Friends</h2>
                     </div>
                     :
                     friend.map((item) => (
                        <div key={item.key} className='flex justify-between items-center'>
                           <div className='flex items-center gap-5'>
                              <div className='w-[63px] h-[63px] rounded-full bg-gray-600'>
                                 {
                                    user.uid == item.senderId ?
                                       <img src={item.receiverPhoto} className='w-full h-full rounded-full object-cover overflow-hidden' alt="" />
                                       :
                                       <img src={item.senderPhoto} className='w-full h-full rounded-full object-cover overflow-hidden' alt="" />
                                 }
                              </div>
                              <h3 className='font-inter_Regular text-[23px] text-[#000000]'>{user.uid == item.receiverId ? item.senderName : item.receiverName}</h3>
                           </div>
                           <div className='flex gap-3' >
                              <button className='py-3 px-8 font-inter_medium text-sm bg-[#4A81D3] text-[#FFFFFF] rounded-lg' onClick={() => handleUnfriend(item.id)}>Unfriend</button>
                              <button className='py-3 px-8 font-inter_medium text-sm bg-[#D34A4A] text-[#FFFFFF] rounded-lg'>Block</button>
                           </div>
                        </div>
                     ))
               }


            </div>
         </div>
      </>
   )
}

export default Friends