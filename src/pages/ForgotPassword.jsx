import React from 'react'

const ForgotPassword = () => {
  return (
     <>
        <div className='w-full h-screen bg-slate-400 flex justify-center items-center'>
            <div className='w-1/4  bg-white flex flex-col p-5 rounded-lg'>
                <h2 className='font-inter_Regular text-3xl'>Forgot Password</h2> 
                    <input type="text" className='p-2 border outline-none rounded-lg my-5' placeholder='Enter your Email' />
                    <button className='bg-[#236DB0] text-white py-1 rounded-lg'>Confirm</button>
            
            </div>
        </div>
     </>
  )
}

export default ForgotPassword