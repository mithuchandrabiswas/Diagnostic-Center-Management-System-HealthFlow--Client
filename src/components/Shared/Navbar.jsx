import Container from '../Shared/Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const Navbar = () => {
  const { user, logOut } = useAuth()
  // const axiosPrivate = useAxiosPrivate()
  const [isOpen, setIsOpen] = useState(false)
  // const [isModalOpen, setIsModalOpen] = useState(false)

  // //Close isModelOpen
  // const closeModal = async () => {
  //   setIsModalOpen(false)
  // }

  // // Host Modal Handle
  // const handleModal = async () => {
  //   // console.log('i want host');
  //   try {
  //     const userInfo = {
  //       email: user?.email,
  //       name: user?.displayName,
  //       role: 'Guest',
  //       status: 'Requested'
  //     }
  //     const { data } = await axiosPrivate.put(`/user`, userInfo)
  //     console.log(data);
  //     if (data.modifiedCount > 0) {
  //       toast.success("Request send successfully")
  //     } else {
  //       toast.error('PLease Wait for admin approval')
  //     }
  //   }
  //   catch (error) {
  //     console.log(error.message);
  //   }
  //   finally {
  //     closeModal()
  //   }
  // }

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <Link to='/'>
              <img
                // className='hidden md:block'
                src='https://i.ibb.co/4ZXzmq5/logo.png'
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
            {/* Dropdown Menu */}
            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
                {/* Become A Host btn */}

                <div className='hidden md:block'>
                  {/* {!user && ( */}
                  <button
                    // disabled={!user}
                    onClick={() => setIsModalOpen(true)}
                    className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'
                  >
                    Host your home
                  </button>
                  {/* )} */}
                </div>
                {/* Host Modal */}
                {/* <HostRequestModal isModalOpen={isModalOpen} closeModal={closeModal} handleModal={handleModal} /> */}
                {/* Dropdown btn */}
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
                      src={user && user.photoURL ? user.photoURL : 'Not Found'}
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Home
                    </Link>

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