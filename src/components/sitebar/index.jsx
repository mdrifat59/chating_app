import React, { useState } from 'react'
import { Homeicons } from '../../svg/HomeIcon'
import { Messageicons } from '../../svg/MessageIcons'
import { Backicons } from '../../svg/Back'
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { loggedOutUser } from '../../features/slice/Loginslice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ProfileimgIcon } from '../../svg/Profileimg'
import { createPortal } from 'react-dom';
import Modal from '../Modals';
import avaterimg from '../../../public/avater.png'

const Sitebar = () => {
   const auth = getAuth();
   let dispatch = useDispatch();
   let user = useSelector((state) => state.login.loggedIn);
   let navigate = useNavigate();
   let location = useLocation();
   let [show, setShow] = useState(false);
   let [hovered, setHovered] = useState(false);

   const handleLogout = () => {
      signOut(auth).then(() => {
         localStorage.removeItem("user");
         dispatch(loggedOutUser());
         navigate('/login');
      }).catch((error) => {
         console.log(error.message);
      });
   };


   return (
      <>
         <div className='w-[166px] h-screen bg-[#5E3493] flex flex-col justify-between items-center pt-5 pb-5 '>
            <div className='text-center text-[#FFFFFF]'>
               <div className={`w-[106px] h-[106px] rounded-full bg-white relative ${hovered ? 'bg-opacity-25 cursor-pointer bg-red-500' : ''}`}
                  onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setShow(true)} >
                  {hovered && (
                     <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white z-10'>
                        <ProfileimgIcon />
                     </div>
                  )}
                  <img src={user.photoURL || avaterimg} className='w-full h-full rounded-full object-cover overflow-hidden' alt="" />
               </div>
               <h3 className='font-inter_semibold mt-3 text-xl'>{user.displayName}</h3>
            </div>
            {show &&
               createPortal(
                  <Modal setShow={setShow} />, document.body
               )
            }

            <div className='flex flex-col gap-12'>
               <div className='w-full grid grid-cols-3 text-center'>
                  <div></div>
                  <div>
                     <Link to='/' >
                        <Homeicons />
                     </Link>
                  </div>
                  {
                     location.pathname === "/" ? (
                        <div className='text-end bg-white w-1 h-14 text-white ml-auto mr-0'></div>
                     ) : (
                        <div></div>
                     )
                  }
               </div>
               <div className='w-full grid grid-cols-3 text-center'>
                  <div></div>
                  <div>
                     <Link to='/message' >
                        <Messageicons />
                     </Link>
                  </div>
                  {
                     location.pathname === "/message" ? (
                        <div className='text-end bg-white w-1 h-14 text-white ml-auto mr-0'></div>
                     ) : (
                        <div></div>
                     )
                  }
               </div>

            </div>

            <div onClick={handleLogout} >
               <button className='flex gap-2  items-center'>
                  <Backicons />
                  <h4 className='font-inter_semibold text-[#FFFFFF] text-xl'> Log Out</h4>
               </button>
            </div>
         </div>
      </>
   );
};

export default Sitebar; 