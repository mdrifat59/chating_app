import React from 'react'
import { Homeicons } from '../../svg/HomeIcon'
import { Messageicons } from '../../svg/MessageIcons'
import { Backicons } from '../../svg/Back'

const Sitebar = () => {
  return (
     <>
         <div className='w-[166px] h-screen bg-[#5E3493] flex flex-col justify-between items-center pt-5 pb-5'>
            <div className='text-center text-[#FFFFFF]'>
               <div className='w-[106px] h-[106px] rounded-full bg-slate-500'></div>
               <h3 className='font-inter_semibold mt-3 text-xl'>Rifat</h3>
            </div>
            <div className='flex flex-col gap-7'> 
                  <Homeicons/>  
                  <Messageicons/> 
            </div>
            <div >
               <button className='flex gap-2  items-center'>
               <Backicons/>
               <h4 className='font-inter_semibold text-[#FFFFFF] text-xl'> Log Out</h4>

               </button>

            </div>
         </div>
     </>
  )
}

export default Sitebar