import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'



// import all comonents
import Username from './components/Username'
import Reginster from './components/Reginster'
import Password from './components/Password'
import Reset from './components/Reset'
import Profile from './components/Profile'
import Recovery from './components/Recovery'
import PagenotFound from './components/PagenotFound'

function App() {
  const [count, setCount] = useState(0)


  const routeV5 = createBrowserRouter([
   
    {
      path:'/register',
      element:<Reginster></Reginster>
    },
    {
      path:"/profile",
      element:<Profile></Profile>
    },
    {
      path:"/password",
      element:<Password></Password>
    },
    {
      path:"/reset",
      element:<Reset></Reset>
    },
    {
      path:"/",
      element:<Username></Username>
    },
    {
      path:"*",
      element:<PagenotFound></PagenotFound>
    },
    {
      path:"/recovery",
      element:<Recovery></Recovery>
    }
  ])

  return (
    <>
     
  <main>
    <RouterProvider router={routeV5}></RouterProvider>
  </main>
        
    </>
  )
}

export default App
