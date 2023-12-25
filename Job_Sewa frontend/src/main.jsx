import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import loginRoutes from './components/routes/LoginRoutes'
import guestRoutes from './components/routes/GuestRoutes'


const router = createBrowserRouter([...guestRoutes,...loginRoutes])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
