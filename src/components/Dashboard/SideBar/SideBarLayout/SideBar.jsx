import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import useRole from '../../../../hooks/useRole'
import MenuItem from '../Menu/MenuItem'
import { FcSettings } from 'react-icons/fc'
import UserMenu from '../Menu/UserMenu'
import AdminMenu from '../Menu/AdminMenu'

const SideBar = () => {
    const { logOut } = useAuth()
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false)
    const [role] = useRole()
    // console.log(role);

    const handleLogOutUser = () => {
        logOut()
        navigate('/')
    }

    // Change toggle checked value
    const toggleHandler = (e) => {
        console.log(e.target.checked);
        setToggle(!toggle)  // or
        // setToggle(e.target.checked) 
    }

    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden z-40'>
                <div className='p-2 font-bold'>
                    <Link to='/'>
                        <img
                            src='https://i.ibb.co/v3dJqsQ/642e77986d7e2c3fab722722-Health-Flow-Logo-Text.png'
                            alt='logo'
                            width='100'
                            height='100'
                        />
                    </Link>
                </div>

                <button
                    onClick={toggleHandler}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-36 md:w-52 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${toggle ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out`}
            >
                <div>
                    <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
                        <Link to='/'>
                            <img
                                src='https://i.ibb.co/v3dJqsQ/642e77986d7e2c3fab722722-Health-Flow-Logo-Text.png'
                                alt='logo'
                                width='150'
                                height='150'
                            />
                        </Link>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6 text-xs md:text-sm'>
                        {/* Menu Items */}
                        <nav>
                            {role === 'user' && <UserMenu />}
                            {role === 'admin' && <AdminMenu />}
                            
                        </nav>
                    </div>
                </div>

                <div>
                    <hr />

                    {/* Profile Menu */}
                    <MenuItem
                        label='Profile'
                        address='/dashboard/my-profile'
                        icon={FcSettings}
                    />

                    <button
                        onClick={handleLogOutUser}
                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default SideBar
