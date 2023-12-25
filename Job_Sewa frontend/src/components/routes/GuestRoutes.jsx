
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register.jsx"
import RootPage from "../pages/RootPage/RootPage"

const guestRoutes = [
    {
        path: "/",
        element:<RootPage/>
    },
    {
        path: "/register",
        element:<Register/>
    },
    {
        path: "/login",
        element:<Login/>
    },
    
]

export default guestRoutes