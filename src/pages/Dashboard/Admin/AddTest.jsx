import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { imageUpload } from '../../../Utils/imageUrl';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useMutation } from '@tanstack/react-query';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTest = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const [imagePreview, setImagePreview] = useState();
    const [imageText, setImageText] = useState('Upload Image');
    const [startDate, setStartDate] = useState(new Date());

    const { mutateAsync } = useMutation({
        mutationFn: async (testData) => {
            const { data } = await axiosPublic.post('/test', testData);
            return data;
        },
        onSuccess: () => {
            toast.success('Test Added Successfully!');
            navigate('/dashboard/manage-tests');
            setLoading(false);
        },
        onError: (error) => {
            toast.error(error.message);
            setLoading(false);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const test_name = form.test_name.value;
        const date = startDate.toLocaleDateString();
        const total_slots = parseFloat(form.total_slots.value);
        const price = parseFloat(form.price.value);
        const details = form.details.value;
        const image = form.image.files[0];

        const adminInfo = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
        };

        try {
            const image_url = await imageUpload(image);
            const testData = {
                test_name,
                date,
                price,
                total_slots,
                adminInfo,
                details,
                image: image_url,
            };

            await mutateAsync(testData);
        } catch (err) {
            toast.error(err.message);
            setLoading(false);
        }
    };

    const handleImage = (image) => {
        setImagePreview(URL.createObjectURL(image));
        setImageText(image.name);
    };

    return (
        <>
            <Helmet>
                <title>Add Test | Dashboard</title>
            </Helmet>

            <div>
                <h1 className="text-2xl text-center">Add Test</h1>
                <div className='w-11/12 mx-auto min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 p-4'>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                            <div className='space-y-6'>
                                <div className='space-y-1 text-sm'>
                                    <label htmlFor='test_name' className='block text-gray-600'>
                                        Test Name
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md input-sm'
                                        name='test_name'
                                        id='test_name'
                                        type='text'
                                        placeholder='Test Name...'
                                        required
                                    />
                                </div>

                                <div className='space-y-1'>
                                    <label htmlFor='date' className='block text-gray-600'>
                                        Select Date
                                    </label>
                                    <DatePicker
                                        className='border p-2 border-red-400 rounded-md'
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                    />
                                </div>
                            </div>
                            <div className='space-y-6'>
                                <div className='p-2 bg-white w-full m-auto rounded-lg flex justify-between items-center'>
                                    <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                                        <div className='flex flex-col w-max mx-auto text-center'>
                                            <label>
                                                <input
                                                    className='text-sm cursor-pointer w-36 hidden'
                                                    type='file'
                                                    onChange={e => handleImage(e.target.files[0])}
                                                    name='image'
                                                    id='image'
                                                    accept='image/*'
                                                    hidden
                                                />
                                                <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                                                    {imageText.length > 20
                                                        ? imageText.split('.')[0].slice(0, 15) + '....' + imageText.split('.')[1]
                                                        : imageText}
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='h-16 w-16 object-cover overflow-hidden flex items-center'>
                                        {imagePreview && <img src={imagePreview} alt="Preview" />}
                                    </div>
                                </div>
                                <div className='flex justify-between gap-2'>
                                    <div className='space-y-1 text-sm'>
                                        <label htmlFor='price' className='block text-gray-600'>
                                            Price
                                        </label>
                                        <input
                                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md input-sm'
                                            name='price'
                                            id='price'
                                            type='number'
                                            placeholder='Price'
                                            required
                                        />
                                    </div>

                                    <div className='space-y-1 text-sm'>
                                        <label htmlFor='total_slots' className='block text-gray-600'>
                                            Total Slots
                                        </label>
                                        <input
                                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md input-sm'
                                            name='total_slots'
                                            id='total_slots'
                                            type='number'
                                            placeholder='Total Slots'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='space-y-1 text-sm'>
                                    <label htmlFor='details' className='block text-gray-600'>
                                        Details
                                    </label>
                                    <textarea
                                        id='details'
                                        className='block rounded-md focus:rose-300 w-full h-20 px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500'
                                        name='details'
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type='submit'
                            className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
                        >
                            {loading ? (
                                <TbFidgetSpinner className='animate-spin m-auto' />
                            ) : (
                                'Add Test'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddTest;
