import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'

const Login = () => {
  const { signIn, googleSignIn, loading, setLoading, resetPassword } = useAuth()
  const navigate = useNavigate();
  const [email, setEmail] = useState('')

  // User Create by  Email and Password
  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // setEmail(email)
    try {
      setLoading(true)
      await signIn(email, password)
      navigate('/')
      toast.success('User sign in successfully')
    }
    catch (error) {
      // console.log(error);
      toast.error(error.message)
      setLoading(false)
    }
  }

  // Password Reset
  const handleResetPassword = async () => {
    // console.log(email);
    if (!email) return toast.error("Please write your email first than press password reset button")
    try {
      setLoading(true)
      await resetPassword(email)
      toast.success("Request send successfully. Please check your email")
      setLoading(false)
      // console.log(email);
    }
    catch (error) {
      // console.log(error);
      toast.error(error.message)
      setLoading(false)
    }

  }

  // User Sign in by Google
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
      navigate('/')
      toast.success('Google sign in successfully')
    }
    catch (error) {
      // console.log(error);
      toast.error(error.message)
    }
  }


  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form onSubmit={handleSignIn}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                onBlur={(e) => setEmail(e.target.value)}
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={loading}
              className='bg-rose-500 w-full rounded-md py-3 text-white'
            >
              {/* Continue */}
              {loading ? <TbFidgetSpinner className='animate-spin' /> : 'Log in'}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button onClick={handleResetPassword} className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <button onClick={handleGoogleSignIn} disabled={loading} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer disabled:cursor-not-allowed'>
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login
