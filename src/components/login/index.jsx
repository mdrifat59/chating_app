import React from 'react'

const Loginform = () => {
  return (
    <>
         <div className='w-3/5 bg-white shadow-2xl rounded-lg  m-auto'>
        <div className='py-10 px-5'>
            <form> 
                 <label className='font-inter_Regular text-[#484848] text-lg mt-3 block'> 
                  <span className='mt-4'>Enter Email</span>
                <input type="text"   className='w-full border outline-none border-[#D8D8D8] py-1 px-2 rounded-md mt-2'  /> 
                 </label>
                 <label className='font-inter_Regular text-[#484848] text-lg mt-3 block'>
                 Enter Password
                <input type="text"   className='w-full border outline-none border-[#D8D8D8] py-1 px-2 rounded-md mt-2'  /> 
                 </label>   
                <button className='w-full bg-[#313131] text-[#FFFFFF] px-2 py-2 rounded-md mt-5 font-inter_medium font-[18px]'>Sign In</button>
            </form>
            <p className='font-inter_Regular font-[16px] text-[#4A4A4A] my-5 underline'>forgot password?</p>
            <p className='font-inter_Regular text-[#000000] font-[16px] mt-5'>Don’t have an account please  <span className='text-[#236DB0] cursor-pointer'>sign up</span></p>
        </div>
    </div> 
    </>
  )
}

export default Loginform