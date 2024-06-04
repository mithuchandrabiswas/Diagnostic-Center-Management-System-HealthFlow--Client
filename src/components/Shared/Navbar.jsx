import Container from '../Shared/Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { BiUserCircle } from 'react-icons/bi'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row  items-center xl:justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <div className='items-start'>
              <Link to='/'>
                <img
                  // className='hidden md:block'
                  src='https://i.ibb.co/4ZXzmq5/logo.png'
                  alt='logo'
                  width='100'
                  height='100'
                />
              </Link>
            </div>
            <div className='hidden xl:block'>
              <NavLink
                to='/'
                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
              >
                Home
              </NavLink>
              {user && (
                <>
                  <NavLink
                    to='/all-tests'
                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                  >
                    All Tests
                  </NavLink>
                </>
              )}
              <NavLink
                to='/team'
                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
              >
                Doctors Team
              </NavLink>
              <NavLink
                to='/contact-us'
                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
              >
                Contact Us
              </NavLink>
              <NavLink
                to='/about-us'
                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
              >
                About Us
              </NavLink>
            </div>
            <div className='flex flex-row items-end gap-3'>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
              >
                <AiOutlineMenu />
                <div className='hidden md:block'>
                  {/* Avatar */}
                  <img
                    className='rounded-full'
                    referrerPolicy='no-referrer'
                    src={user && user.photoURL ? user.photoURL : <BiUserCircle />}
                    alt='profile'
                    height='30'
                    width='30'
                  />
                </div>
              </div>
            </div>

            {/* Dropdown Menu */}
            <div className='relative'>
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[15vw] bg-white overflow-hidden right-5 top-8 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Home
                    </Link>
                    <NavLink
                      to='/all-tests'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      All Tests
                    </NavLink>
                    <NavLink
                      to='/team'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Doctors Team
                    </NavLink>
                    <NavLink
                      to='/contact-us'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Contact Us
                    </NavLink>
                    <NavLink
                      to='/about-us'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      About Us
                    </NavLink>

                    {user ? (
                      <>
                        <Link
                          to='/dashboard'
                          className='block px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
