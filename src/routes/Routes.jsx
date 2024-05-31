import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../pages/Error/ErrorPage'
import Main from '../layout/Main'
import Home from '../pages/Home/Home'
import DashboardLayout from '../layout/DashboardLayout'
import Login from '../pages/Authentication/Login/Login'
import SignUp from '../pages/Authentication/SignUp/SignUp'



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: <DashboardLayout />
    // children: [
    //   {
    //     path: '/dashboard',
    //     element: <Statistics />,
    //   }, 
    // ]
  },
])
