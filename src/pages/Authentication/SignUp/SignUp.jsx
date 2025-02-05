import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { imageUpload } from "../../../Utils/imageUrl";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { createUser, updateUserProfile, setLoading } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedDistrictName, setSelectedDistrictName] = useState('');
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [selectedUpazilaName, setSelectedUpazilaName] = useState('');

    // Get all District data from Database
    const { data: allDistrict = [], isLoading } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/districts');
            return data;
        }
    });

    // Get all Upazila data from Database
    const { data: allUpazila = [] } = useQuery({
        queryKey: ['upazilas'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/upazilas');
            return data;
        }
    });

    // Update filtered upazilas when selected district changes
    const handleDistrictChange = (event) => {
        const districtId = event.target.value;
        const districtName = event.target.options[event.target.selectedIndex].text;
        setSelectedDistrict(districtId);
        setSelectedDistrictName(districtName);
        setFilteredUpazilas(allUpazila.filter(upazila => upazila.district_id === districtId));

    };
    // Update filtered upazilas when selected district changes
    const handleUpazilasChange = (event) => {
        const upazilaName = event.target.options[event.target.selectedIndex].text;
        setSelectedUpazilaName(upazilaName);

    };
    // console.log(filteredUpazilas);
    // console.log(selectedUpazilaName);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };


    const handleSignUpSubmit = async (data) => {
        const { name, email, password, confirm_password, image, blood_group, upazila } = data;
        if (password !== confirm_password) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            // 1) Upload image and get image URL link
            setLoading(true);
            const image_url = await imageUpload(image[0])
            // console.log(image_url);
            // 2) Create User or Registration
            const result = await createUser(email, password);
            // 3) Send User Name and image to Firebase
            await updateUserProfile(name, image_url);

            // 4) Save user data in DB with default status "active"
            const userData = {
                name,
                email,
                image_url,
                blood_group,
                district: selectedDistrictName, // Use the selected district name
                upazila: selectedUpazilaName,
                status: "active",
                role: 'user',
            };
            await axiosPublic.post('/user', userData);

            navigate('/dashboard/my-profile');
            toast.success('User registered successfully');
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (user) return navigate('/')

    return (
        <>
            <Helmet>
                <title>HealthFlow | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
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
                                    className="input input-sm input-bordered"
                                />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label htmlFor='image' className='label'>
                                    <span className="label-text">Select Image</span>
                                </label>
                                <input
                                    type='file'
                                    className="border p-1 rounded-md"
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
                                    className="input input-sm input-bordered"
                                />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Blood Group</span>
                                </label>
                                <select {...register("blood_group", { required: true })} className="select select-sm select-bordered">
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                                {errors.blood_group && <span className="text-red-600">Blood group is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">District</span>
                                </label>
                                <select
                                    {...register("district", { required: true })}
                                    className="select select-sm select-bordered"
                                    onChange={handleDistrictChange}
                                >
                                    <option value="">Select District</option>
                                    {allDistrict.map((district) => (
                                        <option key={district.id} value={district.id}>{district.name}</option>
                                    ))}
                                </select>
                                {errors.district && <span className="text-red-600">District is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Upazila</span>
                                </label>
                                <select {...register("upazila", { required: true })} className="select select-sm select-bordered" onChange={handleUpazilasChange}>
                                    <option value="">Select Upazila</option>
                                    {filteredUpazilas.map((upazila) => (
                                        <option key={upazila.id} value={upazila.name}>{upazila.name}</option>
                                    ))}
                                </select>
                                {errors.upazila && <span className="text-red-600">Upazila is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                        })}
                                        placeholder="password"
                                        className="input input-sm input-bordered w-full"
                                    />
                                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        {showPassword ? (
                                            <FaEyeSlash
                                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                                onClick={togglePassword}
                                            />
                                        ) : (
                                            <FaEye
                                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                                onClick={togglePassword}
                                            />
                                        )}
                                    </span>
                                </div>
                                {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be at least 6 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-red-600">Password must be less than 20 characters</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-600">Password must have one uppercase letter, one lowercase letter, one number, and one special character.</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("confirm_password", {
                                            required: true,
                                            validate: value => value === watch("password") || "Passwords do not match",
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                        })}
                                        placeholder="Confirm Password"
                                        className="input input-sm input-bordered w-full"
                                    />
                                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        {showPassword ? (
                                            <FaEyeSlash
                                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                                onClick={togglePassword}
                                            />
                                        ) : (
                                            <FaEye
                                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                                onClick={togglePassword}
                                            />
                                        )}
                                    </span>
                                </div>
                                {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be at least 6 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-red-600">Password must be less than 20 characters</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-600">Password must have one uppercase letter, one lowercase letter, one number, and one special character.</span>}
                                {errors.confirm_password && <span className="text-red-600">{errors.confirm_password.message}</span>}
                            </div>
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
