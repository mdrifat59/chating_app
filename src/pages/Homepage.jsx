import React from 'react'
import AllUser from '../components/user/AllUser'

const Homepage = () => {
  return (
     <>
        <div className='grid grid-cols-[2fr,5fr] gap-5 m-5 '>
            <div className='w-[420px] h-[720px]  bg-[#FFFFFF]  '>
                <AllUser/>                
            </div> 
            <div className='w-full h-[730px] bg-blue-300 overflow-hidden'>ertytry</div>
        </div>
     </>
  )
}

export default Homepage