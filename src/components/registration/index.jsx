import { useFormik } from 'formik'
import React from 'react'
import { singUp } from '../../validation/RegistrationValidation'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';

const Registrationform = () => {
  const auth = getAuth();
  let initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  }
  let formik = useFormik({
    initialValues,
    onSubmit: () => {
      createNewUsers()
    },
    validationSchema: singUp
  })

  let createNewUsers = () => {
    createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then(() => {
        console.log("sing up");

      })
      .catch((error) => {
        if (error.message.includes('auth/email-already-in-use')) {
          toast.error('Email Already Exists', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

      });
  }

  return (
    <>
      <ToastContainer />
      <div className='w-3/5 bg-white shadow-2xl rounded-lg  m-auto'>
        <div className='py-10 px-5'>
          <form onSubmit={formik.handleSubmit}>
            <label className='font-inter_Regular text-[#484848] text-lg'>
              Enter Your Name
              <input type="text" className='w-full border outline-none border-[#D8D8D8] py-1 px-2 rounded-md mt-2' name='fullName' value={formik.values.fullName} onChange={formik.handleChange} />
              {
                formik.errors.fullName && formik.touched.fullName && <p className='font-inter_Regular text-red-500'>{formik.errors.fullName}</p>
              }
            </label>
            <label className='font-inter_Regular text-[#484848] text-lg mt-3 block'>
              <span className='mt-4'>Enter Email</span>
              <input type="email" className='w-full border outline-none border-[#D8D8D8] py-1 px-2 rounded-md mt-2' name='email' value={formik.values.email} onChange={formik.handleChange} />
              {
                formik.errors.email && formik.touched.email && <p className='font-inter_Regular text-red-500'>{formik.errors.email}</p>
              }
            </label>
            <label className='font-inter_Regular text-[#484848] text-lg mt-3 block'>
              Enter Password
              <input type="password" className='w-full border outline-none border-[#D8D8D8] py-1 px-2 rounded-md mt-2' name='password' value={formik.values.password} onChange={formik.handleChange} />
              {
                formik.errors.password && formik.touched.password && <p className='font-inter_Regular text-red-500'>{formik.errors.password}</p>
              }
            </label>
            <label className='font-inter_Regular text-[#484848] text-lg mt-3 block'>
              Enter Confirm password
              <input type="password" className='w-full border outline-none border-[#D8D8D8] py-1 px-2 rounded-md mt-2' name='confirmPassword' value={formik.values.confirmPassword} onChange={formik.handleChange} />
              {
                formik.errors.confirmPassword && formik.touched.confirmPassword && <p className='font-inter_Regular text-red-500'>{formik.errors.confirmPassword}</p>
              }
            </label>
            <button className='w-full bg-[#313131] text-[#FFFFFF] px-2 py-2 rounded-md mt-5 font-inter_medium'>Sign Up</button>
          </form>
          <p className='font-inter_Regular text-[#000000] font-[16px] mt-5'>Already have an account please <span className='text-[#236DB0] cursor-pointer'>sign in</span></p>
        </div>
      </div>
    </>
  )
}

export default Registrationform