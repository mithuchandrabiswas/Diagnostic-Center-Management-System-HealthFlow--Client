import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar'
const Main = () => {
  return (
    <div>
      <Navbar />
      <div className='pt-11 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Main
