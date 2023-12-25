import React from 'react'
import About from '../pages/About/About'
import Home from '../pages/Home/Home'
import Jobs from '../pages/Job/Job'
import MainLayout from '../pages/Layout/MainLayout'
import AddJob from '../pages/Provider/AddJob'
import JobDetails from '../pages/JobDetails/JobDetails'

const loginRoutes = [
    {
        path: "/",
        element: <MainLayout />,
        children:[      
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/jobs",
        element:<Jobs/>
    },
    {
        path: "/about",
        element:<About/>
    },
    {
        path: "/jobs/add",
        element:<AddJob/>
    },
    {
        path: "/job/details/:id",
        element:<JobDetails/>
    },
    
        ]
    }
    
    
]

export default loginRoutes