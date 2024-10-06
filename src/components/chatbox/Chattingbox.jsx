import React, { useEffect, useState } from 'react'
import { Audioicon } from '../../svg/Audio'
import { EmojiIcon } from '../../svg/Emoji'
import { PictuerIcon } from '../../svg/Pictuer'
import checkpoto from '../../../public/check.jpg'
import checkpoto2 from '../../../public/check2.jpg'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, set } from 'firebase/database'
import avaterimg from '../../../public/avater.png'
import { formatDistance } from 'date-fns'
import EmojiPicker from 'emoji-picker-react'
// import EmojiPicker from 'emoji-picker-react'

const Chattingbox = () => {
  let db = getDatabase()
  let singlefriend = useSelector((state) => state.active.activefriend)
  let user = useSelector((state) => state.login.loggedIn)
  let [message, setMessage] = useState("")
  let [allmessage, setAllmessagea] = useState([])
  let [emojishow, setEmojishow] = useState(false)

  let handleSend = () => {
    if (singlefriend?.status == "single") {
      set(push(ref(db, "singlemessage")), {
        whosendname: user.displayName,
        whosendid: user.uid,
        whoreceivename: singlefriend.name,
        whoreceiveid: singlefriend.id,
        message: message,
        // date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`
        date: new Date().toISOString()
      }).then(() => {
        setMessage("")
        setEmojishow(false)
      })
    }
  }

  useEffect(() => {
    onValue(ref(db, "singlemessage/"), (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (user.uid == item.val().whosendid && item.val().whoreceiveid == singlefriend.id || user.uid == item.val().whoreceiveid && item.val().whosendid == singlefriend.id) {
          arr.push(item.val())
        }
      })
      setAllmessagea(arr)
    })
  }, [singlefriend.id])

  let handleEmoji = ({ emoji }) => {
    setMessage(message + emoji)

  }
  return (
    <>
      <div className='w-full h-full relative'>
        <div className='flex items-center p-5  gap-5  bg-[#F9F9F9]'>
          <div className='w-[81px] h-[81px] bg-gray-500 rounded-full' >
            <img src={singlefriend?.profile || avaterimg} className='w-full h-full rounded-full object-cover overflow-hidden' alt="" />
          </div>
          <h3 className='font-inter_medium text-xl text-[#000000]'>{singlefriend?.name || "Choouse your friend"}</h3>
        </div>
        <div className="h-[500px] px-5 overflow-y-auto">
          {
            singlefriend?.status == "single" ?
              allmessage.map((item, index) => (
                <div key={index}>
                  {
                    item.whosendid == user.uid ? (
                      <div className="w-[65%] ml-auto flex flex-col items-end">
                        <p className="bg-sky-400 py-3 px-4 rounded-lg inline-block mt-5 text-white"> {item.message} </p>
                        <span  > {formatDistance(item.date, new Date(), { addSuffix: true })}</span>
                      </div>
                    ) : (
                      <div className="w-[65%] flex flex-col items-start">
                        <p className="bg-slate-400 py-3 px-4 rounded-lg inline-block mt-5 text-white"> {item.message}</p>
                        <span  > {formatDistance(item.date, new Date(), { addSuffix: true })}</span>
                      </div>
                    )
                  }
                </div>
              ))
              : ""
          }

          {/* sender msg */}
          {/* <div className="w-[65%] ml-auto flex flex-col items-end">
            <p className="bg-sky-400 py-3 px-3 rounded-lg inline-block mt-5 text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium quod debitis ex dolore sed expedita natus architecto accusantium autem voluptate totam repellendus, quasi maiores aliquid rem quo deleniti soluta aut? </p>
            <span  >date</span>
          </div> */}
          {/* sender img */}
          {/* <div className="w-[65%] ml-auto flex flex-col items-end">
            <div className=" py-3 px-3  inline-block mt-5">
              <img src={checkpoto} className='border border-sky-400 rounded-lg object-cover w-full h-full' alt="" />
            </div>
            <span >date</span>
          </div> */}
          {/* sender audio */}
          {/* <div className="w-[65%] ml-auto flex flex-col items-end">
            <div className=" py-3 px-3  inline-block mt-5">
              <audio src="" controls></audio>
            </div>
            <span  >date</span>
          </div> */}
          {/* receiver msg */}
          {/* <div className="w-[65%] ">
            <p className="  bg-slate-400 py-3 px-3 rounded-lg inline-block mt-5 text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium quod debitis ex dolore sed expedita natus architecto accusantium autem voluptate totam repellendus, quasi maiores aliquid rem quo deleniti soluta aut? </p>
            <span  >date</span>
          </div> */}
          {/* receiver img */}
          {/* <div className="w-[65%] ">
            <div className=" py-3 px-3  inline-block mt-5">
              <img src={checkpoto2} className='border border-slate-400 rounded-lg object-cover w-full h-full' alt="" />
            </div>
            <span >date</span>
          </div> */}
          {/* receiver audio */}
          {/* <div className="w-[65%] ">
            <div className=" py-3 px-3  inline-block mt-5">
              <audio src="" controls></audio>
              <span >date</span>
            </div>
          </div> */}

        </div>
        <div className='absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%] py-4 px-2  bg-[#F5F5F5] rounded-lg grid grid-cols-[2fr,6fr,1fr]'>
          <div className='w-full h-full flex justify-center items-center gap-4'>
            <div className='cursor-pointer'>
              <Audioicon />
            </div>
            <div className=' flex justify-center items-center gap-2'>
              <div className='relative'>
                <div className='cursor-pointer' onClick={() => setEmojishow((prev) => !prev)}>
                  <EmojiIcon />
                </div>
                {
                  emojishow &&
                  <div className='absolute bottom-9 -left-24'>
                    <EmojiPicker onEmojiClick={handleEmoji} />
                  </div>
                }
              </div>
            </div>
            <div className='cursor-pointer'>
              <PictuerIcon />
            </div>
          </div>
          <div className='w-full h-full flex items-center '>
            <input type="text" className='w-full py-3 px-2 outline-none rounded-lg font-semibold' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='type here...' />
          </div>
          <div className='w-full h-full '>
            <button className='font-inter_medium  text-xl bg-[#3E8DEB] text-[#FFFFFF] py-3 px-10 rounded-lg mx-2' onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chattingbox

