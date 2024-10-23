import React from 'react' 
import Loginform from '../components/login'
import { Helmet } from 'react-helmet'

const Loginpage = () => {
  return (
     <>
     <Helmet>
      <title>Login</title>
     </Helmet>
         <h1 className='font-jotione_Regular text-[80px] text-center my-10 '>TalkNest</h1> 
       <div className='w-3/6 m-auto'> 
          <Loginform/>
       </div> 
     </>
  )
}

export default Loginpage