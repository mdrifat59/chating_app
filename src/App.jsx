import React from 'react' 
import './App.css'
import Registration from './pages/Registration'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Sitebar from './components/sitebar'
import Rootlayout from './components/rootlayout/Rootlayout'
import Homepage from './pages/Homepage'
import Message from './pages/Message'

function App() { 
  let router =createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Rootlayout/>}>
           <Route path='/' element={<Homepage/>}></Route>
           <Route path='/message' element={<Message/>}></Route>
        </Route>
           <Route path='/Registration' element={<Registration/>}></Route>
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
