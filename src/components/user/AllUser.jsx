import React from 'react'
import { Addfriendicon } from '../../svg/Addfriend'

const AllUser = () => {
  return (
    <>
        <div className='p-5 shadow-lg w-full h-full  bg-[#FFFFFF] rounded-lg overflow-y-auto no-scroll'>
            <div className='sticky top-0 left-0 bg-[#fff]'> 
                <h2 className='font-inter_semibold text-[30px] text-[#494949]'>All Users</h2>
                <input type="text" className='w-full py-2 px-3 my-5 border rounded-lg bg-[#F8F8F8] outline-none' placeholder='search users...' />
            </div>
            <div className='flex flex-col gap-5 mt-10'>
                
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-4'>
                        <div className='w-[82px] h-[82px] bg-stone-600 rounded-full'></div>
                        <h3>MD Rifatul Islam</h3>
                    </div>
                    <div> 
                        <Addfriendicon/>    
                     </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-4'>
                        <div className='w-[82px] h-[82px] bg-stone-600 rounded-full'></div>
                        <h3>MD Rifatul Islam</h3>
                    </div>
                    <div> 
                        <Addfriendicon/>    
                     </div>
                </div>
               
                
            </div>
        </div>
    </>
  )
}

export default AllUser