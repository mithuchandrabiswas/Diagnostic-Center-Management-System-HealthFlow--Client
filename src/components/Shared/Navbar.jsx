import Container from '../Shared/Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { BiUserCircle } from 'react-icons/bi'
import { Helmet } from 'react-helmet-async'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='fixed w-full z-10 shadow-sm bg-primary-lightGray bg-opacity-95'>
      <Helmet>
        <title>
          HealthFlow | Navbar
        </title>
      </Helmet>
      <div className='p-2 border-b border-neutral-200'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <div className='items-start'>
              <Link to='/'>
                <img
                  src='https://i.ibb.co/v3dJqsQ/642e77986d7e2c3fab722722-Health-Flow-Logo-Text.png'
                  alt='logo'
                  width='150'
                  height='150'
                />
              </Link>
            </div>
            <div className='hidden md:block'>
              <NavLink
                to='/'
                className='px-4 py-3 transition font-semibold text-accent-darkGray hover:bg-primary-blue hover:bg-opacity-10'
              >
                Home
              </NavLink>
              {user && (
                <>
                  <NavLink
                    to='/all-tests'
                    className='px-4 py-3 transition font-semibold text-accent-darkGray hover:bg-primary-blue hover:bg-opacity-10'
                  >
                    All Tests
                  </NavLink>
                </>
              )}
              <NavLink
                to='/team'
                className='px-4 py-3 transition font-semibold text-accent-darkGray hover:bg-primary-blue hover:bg-opacity-10'
              >
                Doctors Team
              </NavLink>
              <NavLink
                to='/contact-us'
                className='px-4 py-3 transition font-semibold text-accent-darkGray hover:bg-primary-blue hover:bg-opacity-10'
              >
                Contact Us
              </NavLink>
              <NavLink
                to='/about-us'
                className='px-4 py-3 transition font-semibold text-accent-darkGray hover:bg-primary-blue hover:bg-opacity-10'
              >
                About Us
              </NavLink>
            </div>
            <div className='flex flex-row items-end gap-3'>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className='p-2 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center justify-end gap-3 rounded-full cursor-pointer hover:shadow-md transition text-primary-blue'
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
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[15vw] bg-background-white overflow-hidden right-5 top-8 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block lg:hidden px-4 py-3 transition font-semibold text-accent-darkGray hover:bg-primary-blue hover:bg-opacity-10'
                    >
                      Home
                    </Link>
                    <NavLink
                      to='/all-tests'
                      className='block md:hidden px-4 py-3 transition font-semibold text-accent-darkGray hover:bg-primary-blue hover:bg-opacity-10'
                    >
                      All Tests
                    </NavLink>
                    <NavLink
                      to='/team'
                      className='block md:hidden px-4 py-3 transition font-semibold text-accent-darkGray hover:bg-primary-blue hover:bg-opacity-10'
                    >
                      Doctors Team
                    </NavLink>
                    <NavLink
                      to='/contact-us'
                      className='block md:hidden px-4 py-3 transition font-semibold text-accent-darkGray hover:bg-primary-blue hover:bg-opacity-10'
                    >
                      Contact Us
                    </NavLink>
                    <NavLink
                      to='/about-us'
                      className='block md:hidden px-4 py-3 transition font-semibold text-accent-darkGray hover:bg-primary-blue hover:bg-opacity-10'
                    >
                      About Us
                    </NavLink>

                    {user ? (
                      <>
                        <Link
                          to='/dashboard'
                          className='block px-4 py-3 transition font-semibold text-accent-darkGray hover:bg-primary-blue hover:bg-opacity-10'
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className='px-4 py-3 transition font-semibold text-accent-darkGray hover:bg-primary-blue hover:bg-opacity-10 cursor-pointer'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 transition font-semibold text-accent-darkGray hover:bg-primary-blue hover:bg-opacity-10'
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 transition font-semibold text-accent-darkGray hover:bg-primary-blue hover:bg-opacity-10'
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
