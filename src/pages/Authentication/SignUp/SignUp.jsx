import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, setLoading } = useAuth();
    const navigate = useNavigate();

    // User Create by Email and Password
    const handleSignUpSubmit = async (data) => {
        const { name, email, password, image } = data;
        const formData = new FormData();
        formData.append('image', image[0]); // image[0] because the input returns an array of files

        try {
            // 1) Upload image and get image URL link
            setLoading(true);
            const response = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
            const imageURL = response.data.data.display_url;

            // 2) Create User or Registration
            const result = await createUser(email, password);

            // 3) Send User Name and image to Firebase
            await updateUserProfile(name, imageURL);
            navigate('/dashboard');
            toast.success('User registered successfully');
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(handleSignUpSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    placeholder="Name"
                                    className="input input-bordered"
                                />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label htmlFor='image' className='label'>
                                    <span className="label-text">Select Image</span>
                                </label>
                                <input
                                    type='file'
                                    id='image'
                                    accept='image/*'
                                    {...register("image", { required: true })}
                                />
                                {errors.image && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    placeholder="email"
                                    className="input input-bordered"
                                />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })}
                                    placeholder="password"
                                    className="input input-bordered"
                                />
                                {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be at least 6 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-red-600">Password must be less than 20 characters</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-600">Password must have one uppercase letter, one lowercase letter, one number, and one special character.</span>}
                            </div>
                            {/* ====> */}
                            {/* <div className='space-y-1 text-sm'>
                                <label htmlFor='category' className='block text-gray-600'>
                                    Category
                                </label>
                                <select
                                    required
                                    className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
                                    name='category'
                                >
                                    {categories.map(category => (
                                        <option value={category.label} key={category.label}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div> */}


                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className="px-6"><small>Already have an account? <Link to="/login">Login</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
