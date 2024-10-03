import React from 'react'
import { Audioicon } from '../../svg/Audio'
import { EmojiIcon } from '../../svg/Emoji'
import { PictuerIcon } from '../../svg/Pictuer'
import checkpoto from '../../../public/check.jpg'
import checkpoto2 from '../../../public/check2.jpg'
import { useSelector } from 'react-redux'

const Chattingbox = () => {
  let singlefriend = useSelector((state) => state.active.activefriend)
  return (
    <>
      <div className='w-full h-full relative'>
        <div className='flex items-center p-5  gap-5  bg-[#F9F9F9]'>
          <div className='w-[81px] h-[81px] bg-gray-500 rounded-full' >
            <img src={singlefriend.profile} className='w-full h-full rounded-full object-cover overflow-hidden' alt="" />
          </div>
          <h3 className='font-inter_medium text-xl text-[#000000]'>{singlefriend.name}</h3>
        </div>
        <div className="h-[500px] px-5 overflow-y-auto">
          {/* sender msg */}
          <div className="w-[65%] ml-auto flex flex-col items-end">
            <p className="bg-sky-400 py-3 px-3 rounded-lg inline-block mt-5 text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium quod debitis ex dolore sed expedita natus architecto accusantium autem voluptate totam repellendus, quasi maiores aliquid rem quo deleniti soluta aut? </p>
            <span  >date</span>
          </div>
          {/* sender img */}
          <div className="w-[65%] ml-auto flex flex-col items-end">
            <div className=" py-3 px-3  inline-block mt-5">
              <img src={checkpoto} className='border border-sky-400 rounded-lg object-cover w-full h-full' alt="" />
            </div>
            <span >date</span>
          </div>
          {/* sender audio */}
          <div className="w-[65%] ml-auto flex flex-col items-end">
            <div className=" py-3 px-3  inline-block mt-5">
              <audio src="" controls></audio>
            </div>
            <span  >date</span>
          </div>
          {/* receiver msg */}
          <div className="w-[65%] ">
            <p className="  bg-slate-400 py-3 px-3 rounded-lg inline-block mt-5 text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium quod debitis ex dolore sed expedita natus architecto accusantium autem voluptate totam repellendus, quasi maiores aliquid rem quo deleniti soluta aut? </p>
            <span  >date</span>
          </div>
          {/* receiver img */}
          <div className="w-[65%] ">
            <div className=" py-3 px-3  inline-block mt-5">
              <img src={checkpoto2} className='border border-slate-400 rounded-lg object-cover w-full h-full' alt="" />
            </div>
            <span >date</span>
          </div>
          {/* receiver audio */}
          <div className="w-[65%] ">
            <div className=" py-3 px-3  inline-block mt-5">
              <audio src="" controls></audio>
              <span >date</span>
            </div>
          </div>
        </div>
        <div className='absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%] py-4 px-2  bg-[#F5F5F5] rounded-lg grid grid-cols-[2fr,6fr,1fr]'>
          <div className='w-full h-full flex justify-center items-center gap-4'>
            <div className='cursor-pointer'>
              <Audioicon />
            </div>
            <div className='cursor-pointer'>
              <EmojiIcon />
            </div>
            <div className='cursor-pointer'>
              <PictuerIcon />
            </div>
          </div>
          <div className='w-full h-full flex items-center '>
            <input type="text" className='w-full py-3 px-2 outline-none rounded-lg font-semibold' placeholder='type here...' />
          </div>
          <div className='w-full h-full '>
            <button className='font-inter_medium  text-xl bg-[#3E8DEB] text-[#FFFFFF] py-3 px-10 rounded-lg mx-2'>Send</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chattingbox