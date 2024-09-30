import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const Friends = () => {
   const db = getDatabase();
   let user = useSelector((state) => state.login.loggedIn)
   let [friend, setFriend] = useState([])
   let [block, setBlock] = useState([])

   // friend show
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

   }, [db])

   // Unfriend
   let handleUnfriend = (item) => {
      remove(ref(db, "friends/" + item))
   }
   // Block friend
   let handleBlock = (item) => {
      if (user.uid == item.senderId) {
         set(push(ref(db, 'blocks/')), {
            blockerName: item.senderName,
            blockerId: item.senderId,
            blockedName: item.receiverName,
            blockedId: item.receiverId,
         })
      } else {
         set(push(ref(db, 'blocks/')), {
            blockerName: item.receiverName,
            blockerId: item.receiverId,
            blockedName: item.senderName,
            blockedId: item.senderId,
         })
      }
   }
   // block show
   useEffect(() => {
      const blockdRef = ref(db, 'blocks/');
      onValue(blockdRef, (snapshot) => {
         let blockarr = []
         snapshot.forEach((item) => {
            blockarr.push({ ...item.val(), id: item.key })
         })
         setBlock(blockarr)
      });

   }, [db])

   //  unblock
   let handleUnblock = (item) => {
      let blocktoremove = block.find((e) =>
         e.blockedId == item.receiverId && e.blockerId == user.uid ||
         e.blockedId == item.senderId && e.blockerId == user.uid
      )
      if (blocktoremove) {
         remove(ref(db, "blocks/" + blocktoremove.id))
      }
   }

   return (
      <>
         <div className='p-5'>
            <h2 className='font-inter_semibold text-3xl text-[#494949] mb-10'>My Friends</h2>
            <div className='flex flex-col gap-y-5'>
               {friend.length == "0" ? (
                  <div className='flex justify-center items-center h-56'>
                     <h2 className='text-3xl'>No Friends</h2>
                  </div>
               ) : (
                  friend.map((item) => {
                     let blocked = block.some((e) =>
                        e.blockedId == item.receiverId && e.blockerId == user.uid ||
                        e.blockedId == item.senderId && e.blockerId == user.uid
                     );
                     let notblocked = block.some((e) =>
                        e.blockedId == user.uid && e.blockerId == item.receiverId ||
                        e.blockedId == user.uid && e.blockerId == item.senderId
                     );

                     return (
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

                              {notblocked ?
                                 <h2 className='py-1 px-3 bg-yellow-300 font-inter_Bold  rounded-lg text-red-500'>You are Blocked by {user.uid == item.receiverId ? item.senderName : item.receiverName}</h2>
                                 :
                                 <>
                                    {!blocked &&
                                       <>
                                          <button className='py-3 px-8 font-inter_medium text-sm bg-[#4A81D3] text-[#FFFFFF] rounded-lg' onClick={() => handleUnfriend(item.id)}>Unfriend</button>
                                          <button className='py-3 px-8 font-inter_medium text-sm bg-[#D34A4A] text-[#FFFFFF] rounded-lg' onClick={() => handleBlock(item)}>Block</button>
                                       </>
                                    }
                                    {
                                       blocked &&
                                       <button className='py-3 px-8 font-inter_medium text-sm bg-[#D34A4A] text-[#FFFFFF] rounded-lg' onClick={() => handleUnblock(item)}>UnBlock</button>
                                    }
                                 </>
                              }
                           </div>
                        </div>
                     )
                  })
               )}


            </div>
         </div>
      </>
   )
}

export default Friends 