import React from 'react'
import Sitebar from '../sitebar'
import { Outlet } from 'react-router-dom'

const Rootlayout = () => {
  return (
    <>
    <div className='flex'>
        <Sitebar/>
        <Outlet/>
    </div>
    </>
  )
}

export default Rootlayout