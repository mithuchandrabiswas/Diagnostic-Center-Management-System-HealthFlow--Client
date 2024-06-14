import PropTypes from 'prop-types'
import { Fragment, useState, useEffect } from 'react'
import {
    Dialog,
    Listbox,
    Transition,
    TransitionChild,
    DialogTitle,
    DialogPanel,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react'
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { imageUpload } from "../../../Utils/imageUrl";
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import useAuth from '../../../hooks/useAuth'
import { TbFidgetSpinner } from 'react-icons/tb'
import ReactDatePicker from 'react-datepicker'

const UpdateTestModal = ({ setIsOpen, isOpen, modalHandler, test }) => {
    const axiosPublic = useAxiosPublic();
    const { loading, setLoading, user } = useAuth();
    const [imagePreview, setImagePreview] = useState();
    const [imageText, setImageText] = useState('Upload Image');
    const [startDate, setStartDate] = useState(new Date());
    const queryClient = useQueryClient();

    // Fetch specific test data
   

    const { mutateAsync } = useMutation({
        mutationFn: async (testData) => {
            const { data } = await axiosPublic.put(`/test/${test._id}`, testData);
            return data;
        },
        onSuccess: () => {
            toast.success('Test updated successfully!');
            setLoading(false);
            queryClient.invalidateQueries('tests');
            setIsOpen(false);
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
            const image_url = image ? await imageUpload(image) : test.image;
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

    if (loading) return <div>Loading...</div>;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={() => setIsOpen(false)}>
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle as='h3' className='text-lg font-medium text-center leading-6 text-gray-900'>
                                    Update Test
                                </DialogTitle>
                                <div className='mt-4 w-full'>
                                    <Listbox>
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
                                                                defaultValue={test.test_name}
                                                                placeholder='Test Name...'
                                                                required
                                                            />
                                                        </div>

                                                        <div className='space-y-1'>
                                                            <label htmlFor='date' className='block text-gray-600'>
                                                                Select Date
                                                            </label>
                                                            <ReactDatePicker
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
                                                                    defaultValue={test.price}
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
                                                                    defaultValue={test.total_slots}
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
                                                                defaultValue={test.details}
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
                                                        'Update Test'
                                                    )}
                                                </button>
                                            </form>
                                        </div>
                                    </Listbox>
                                </div>
                                <hr className='mt-16 ' />

                                {/* <div className='flex mt-2 justify-center gap-5'>
                                    <button
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                                        onClick={() => modalHandler(test)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div> */}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

UpdateTestModal.propTypes = {
    user: PropTypes.object,
    modalHandler: PropTypes.func,
    setIsOpen: PropTypes.func,
    isOpen: PropTypes.bool,
    test: PropTypes.object,
}

export default UpdateTestModal
