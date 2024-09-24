import { useFormik } from 'formik'
import React, { useState } from 'react'
import { singIn } from '../../validation/LoginValidation'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import { SyncLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { loggedInUser } from '../../features/slice/Loginslice';

const Loginform = () => {
  const auth = getAuth();
  let [loading, setLoading]=useState(false)
  let dispatch = useDispatch()
  let initialValues={
    email:"",
    password:""
  }
  let formik = useFormik({
      initialValues,
      onSubmit:()=>{
        SingInUser()
      },
      validationSchema: singIn
  })

  let SingInUser=()=>{
    setLoading(true)
    signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
  .then(({user}) => {
     if(user.emailVerified == true){
         dispatch(loggedInUser(user))
         localStorage.setItem('user', JSON.stringify(user))
        
     }else{
      toast.error('Please varify your Eamil', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light", 
        });
     }
    setLoading(false)
    
  })
  .catch((error) => {
    if(error.message.includes("auth/invalid-credential")){ 
      toast.error("Your Email or Password Incorrect", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light", 
        });
    }
    
      setLoading(false)
  });

  }
  return (
    <>
          <ToastContainer />
         <div className='w-3/5 bg-white shadow-2xl rounded-lg  m-auto'>
        <div className='py-16 px-10'>
            <form onSubmit={formik.handleSubmit}> 
                 <label className='font-inter_Regular text-[#484848] text-lg mt-3 block'> 
                  <span className='mt-4'>Enter Email</span>
                <input type="email"   className='w-full border outline-none border-[#D8D8D8] py-1 px-2 rounded-md mt-2' name='email' value={formik.values.email} onChange={formik.handleChange}  /> 
                    {
                      formik.errors.email && formik.touched.email && <p className='font-inter_Regular text-red-500'>{formik.errors.email}</p>
                    }
                                 </label>
                 <label className='font-inter_Regular text-[#484848] text-lg mt-3 block'>
                 Enter Password
                <input type="password"   className='w-full border outline-none border-[#D8D8D8] py-1 px-2 rounded-md mt-2' name='password' value={formik.values.password} onChange={formik.handleChange}  /> 
                {
                  formik.errors.password && formik.touched.password && <p className='font-inter_Regular text-red-500'>{formik.errors.password}</p>
                }
                 </label>   
                <button className='w-full bg-[#313131] text-[#FFFFFF] px-2 py-2 rounded-md mt-5 font-inter_medium font-[18px]'>{loading ? <SyncLoader size={12} color='#ffffff'/> : "Sing In"}</button>
            </form>
            <p className='font-inter_Regular font-[16px] text-[#4A4A4A] my-5 underline'>forgot password?</p>
            <p className='font-inter_Regular text-[#000000] font-[16px] mt-5'>Don’t have an account please  <span className='text-[#236DB0] cursor-pointer'>sign up</span></p>
        </div>
    </div> 
    </>
  )
}

export default Loginform