import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../pages/Error/ErrorPage'
import Main from '../layout/Main'
import Home from '../pages/Home/Home'
import DashboardLayout from '../layout/DashboardLayout'
import Login from '../pages/Authentication/Login/Login'
import SignUp from '../pages/Authentication/SignUp/SignUp'
import MyProfile from '../pages/Dashboard/User/MyProfile'
import TestResults from '../pages/Dashboard/User/TestResults'
import MyUpcomingAppointments from '../pages/Dashboard/User/MyUpcomingAppointments'
import AddTest from '../pages/Dashboard/Admin/AddTest'
import AddBanner from '../pages/Dashboard/Admin/AddBanner'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import ManageAppointments from '../pages/Dashboard/Admin/ManageAppointments'
import Statistics from '../pages/Dashboard/Admin/Statistics'
import ManageTests from '../pages/Dashboard/Admin/ManageTests'
import PrivateRoute from './PrivateRoute'
import Profile from '../pages/Dashboard/Common/Profile'



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
    element: <DashboardLayout />,
    children: [
      // Common Routes
      {
        path: 'profile',
        element: <PrivateRoute><Profile /></PrivateRoute>,
      },
      //User Routes
      {
        path: 'my-profile',
        element: <MyProfile />,
      },
      {
        path: 'my-upcoming-appointments',
        element: <MyUpcomingAppointments />,
      },
      {
        path: 'test-results',
        element: <TestResults />,
      },

      //Admin Routes
      {
        path: '/dashboard',
        element: <Statistics />,
      },
      {
        path: 'add-test',
        element: <AddTest />,
      },
      {
        path: 'add-banner',
        element: <AddBanner />,
      },
      {
        path: 'manage-users',
        element: <ManageUsers />,
      },
      {
        path: 'manage-appointments',
        element: <ManageAppointments />,
      },
      {
        path: 'manage-tests',
        element: <ManageTests />,
      },
    ]
  },
])
