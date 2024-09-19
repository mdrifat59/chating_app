import React from 'react' 
import Loginform from '../components/login'

const Login = () => {
  return (
     <>
         <h1 className='font-jotione_Regular text-5xl text-center my-10 '>TalkNest</h1> 
       <div className='w-3/6 m-auto'> 
          <Loginform/>
       </div> 
     </>
  )
}

export default Login