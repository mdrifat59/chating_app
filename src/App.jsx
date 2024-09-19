import React from 'react' 
import './App.css'
import Registration from './pages/Registration'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'

function App() { 
  let router =createBrowserRouter(
    createRoutesFromElements(
      <Route>
           <Route path='/' element={<Registration/>}></Route>
           <Route path='/login' element={<Login/>}></Route>
      </Route>
    )
  )

  return (
    <> 
    <RouterProvider router={router} />
    </>
  )
}

export default App
