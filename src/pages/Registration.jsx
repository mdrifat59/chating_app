import React from 'react'
import Registrationform from '../components/registration'
import { Helmet } from 'react-helmet'

const Registration = () => {
  return (
    <>
    <Helmet>
      <title>Registration </title>
    </Helmet>
    <h1 className='font-jotione_Regular text-[80px] text-center my-4'>TalkNest</h1> 
       <div className='w-3/6 m-auto'> 
        <Registrationform/> 
       </div> 
    </>
  )
}

export default Registration