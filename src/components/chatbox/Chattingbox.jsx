import React from 'react'
import { Audioicon } from '../../svg/Audio'
import { EmojiIcon } from '../../svg/Emoji'
import { PictuerIcon } from '../../svg/Pictuer'

const Chattingbox = () => {
  return (
    <>
      <div className='w-full h-full relative'>
        <div className='flex items-center p-5 gap-5 bg-[#F9F9F9]'>
          <div className='w-[81px] h-[81px] bg-gray-500 rounded-full' ></div>
          <h3 className='font-inter_medium text-xl text-[#000000]'>MD Rifatul Islam</h3>
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