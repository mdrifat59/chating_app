import React from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Closeicons } from '../svg/Close';

const ForgotPassword = () => {
    const auth = getAuth();
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: () => {
            createnewpassword()
        }
    })

    let createnewpassword = () => {
        sendPasswordResetEmail(auth, formik.values.email)
            .then(() => {
                toast.warn('Please chack your email', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                let time = setTimeout(() => {
                    navigate('/login')
                }, 3000)

                return () => clearTimeout(time)
            })
            .catch((error) => {
                console.log(error.message);

            });

    }
    let handleClose = () => {
        navigate("/login")
    }
    return (
        <>
            <ToastContainer />
            <div className='w-full h-screen bg-slate-400 flex justify-center items-center'>
                <div className='w-1/4  bg-white flex flex-col p-5 rounded-lg relative'>
                    <h2 className='font-inter_Regular text-3xl'>Forgot Password</h2>
                    <div className='absolute top-5 right-3 cursor-pointer' onClick={handleClose}>
                        <Closeicons />
                    </div>
                    <form onSubmit={formik.handleSubmit} className='flex flex-col'>
                        <input type="text" className='p-2 border outline-none rounded-lg my-5' placeholder='Enter your Email' name='email' value={formik.values.email} onChange={formik.handleChange} />
                        <button className='bg-[#236DB0] text-white py-1 rounded-lg' >Confirm</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword