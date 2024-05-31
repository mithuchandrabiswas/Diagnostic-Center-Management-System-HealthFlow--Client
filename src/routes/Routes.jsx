import { createBrowserRouter } from 'react-router-dom'



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
  // { path: '/login', element: <Login /> },
  // { path: '/signup', element: <SignUp /> },
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
