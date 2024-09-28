import React from 'react'

const Friends = () => {
  return (
    <>
         <div className='p-5'>
            <h2 className='font-inter_semibold text-3xl text-[#494949] mb-10'>My Friends</h2>
            <div className='flex flex-col gap-y-5'>

               <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-5'>
                     <div className='w-[63px] h-[63px] rounded-full bg-gray-600'></div>
                     <h3 className='font-inter_Regular text-[23px] text-[#000000]'>Rifat</h3>
                  </div>
                  <div className='flex gap-3' >
                     <button className='py-3 px-8 font-inter_medium text-sm bg-[#4A81D3] text-[#FFFFFF] rounded-lg'>Unfriend</button>
                     <button className='py-3 px-8 font-inter_medium text-sm bg-[#D34A4A] text-[#FFFFFF] rounded-lg'>Block</button>
                  </div>
               </div>
               <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-5'>
                     <div className='w-[63px] h-[63px] rounded-full bg-gray-600'></div>
                     <h3 className='font-inter_Regular text-[23px] text-[#000000]'>Rifat</h3>
                  </div>
                  <div className='flex gap-3' >
                     <button className='py-3 px-8 font-inter_medium text-sm bg-[#4A81D3] text-[#FFFFFF] rounded-lg'>Unfriend</button>
                     <button className='py-3 px-8 font-inter_medium text-sm bg-[#D34A4A] text-[#FFFFFF] rounded-lg'>Block</button>
                  </div>
               </div>
               <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-5'>
                     <div className='w-[63px] h-[63px] rounded-full bg-gray-600'></div>
                     <h3 className='font-inter_Regular text-[23px] text-[#000000]'>Rifat</h3>
                  </div>
                  <div className='flex gap-3' >
                     <button className='py-3 px-8 font-inter_medium text-sm bg-[#4A81D3] text-[#FFFFFF] rounded-lg'>Unfriend</button>
                     <button className='py-3 px-8 font-inter_medium text-sm bg-[#D34A4A] text-[#FFFFFF] rounded-lg'>Block</button>
                  </div>
               </div> 

            </div>
        </div>
    </>
  )
}

export default Friends