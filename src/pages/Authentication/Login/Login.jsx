import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { Helmet } from 'react-helmet-async'

const Login = () => {
  const { signIn, loading, setLoading, resetPassword } = useAuth()
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
      toast.success('User sign in successfully')
      navigate('/dashboard/my-profile')
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

  return (
    <div className='flex justify-center items-center'>
      <Helmet>
        <title>Di || Login</title>
      </Helmet>
      <div className='flex flex-col max-w-md p-6 rounded-md  bg-gray-100 text-gray-900'>
        <div className='mb-2 text-center'>
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
                className='input-xs w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
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
                className='input-xs w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={loading}
              className='btn btn-xs bg-rose-500 w-full rounded-md'
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
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <p className='text-xs text-gray-400'>
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
