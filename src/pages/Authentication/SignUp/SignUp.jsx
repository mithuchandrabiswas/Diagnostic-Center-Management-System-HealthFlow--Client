import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
// import { imageUploadedUrl } from '../../Api/Utils'
import useAuth from '../../hooks/useAuth'

const SignUp = () => {
  const { createUser, signInWithGoogle, updateUserProfile, loading, setLoading } = useAuth()
  const navigate = useNavigate();

  // User Create by  Email and Password
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0]; // input type:file return a Array

    // This code are not need any more because a common function are made for this 
    // const formData = new FormData()
    // formData.append('image', image)
    // console.table(name, email, password, image);
    // console.log(image);
    try {
      // 1) Upload image get imageURL link
      setLoading(true)
      // const { data } = await axiosCus.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, formData)
      // console.log(data.data.display_url);
      // const imageURL = data.data.display_url

      // const image_url = await imageUploadedUrl(image)
      // console.log(image_url);

      // 2) Create User or Registration
      const result = await createUser(email, password)
      // console.log(result);

      // 3) Send User Name and image in firebase
      // await updateUserProfile(name, image_url)
      navigate('/')
      toast.success('User register successfully')
    }
    catch (error) {
      // console.log(error);
      toast.error(error.message)
      setLoading(false)
    }
  }

  // User Sign in by Google
  const handleGoogleSignIn = async (e) => {
    try{
      await signInWithGoogle()
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
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to StayVista</p>
        </div>
        <form onSubmit={handleSignUpSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
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
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
            disabled={loading}
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white text-center'
            >
              {/* Continue */}
              {loading? <TbFidgetSpinner className='animate-spin'/>: 'Continue'}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <button onClick={handleGoogleSignIn} disabled={loading} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer disabled:cursor-not-allowed'>
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
