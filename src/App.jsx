import React from 'react'
import './App.css'
import Registration from './pages/Registration'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'
import Rootlayout from './components/rootlayout/Rootlayout'
import Homepage from './pages/Homepage'
import Message from './pages/Message'
import ForgotPassword from './pages/ForgotPassword';
import LoggedInUserRoute from './privateRoute/LoggedInuser';
import NotLoggedInUserRoute from './privateRoute/NotLoggedInUser';
import "cropperjs/dist/cropper.css";

function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoggedInUserRoute />}>
          <Route element={<Rootlayout />}>
            <Route path='/' element={<Homepage />}></Route>
            <Route path='/message' element={<Message />}></Route>
          </Route>
        </Route>

        <Route element={<NotLoggedInUserRoute />}>
          <Route path='/Registration' element={<Registration />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
        </Route>
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
