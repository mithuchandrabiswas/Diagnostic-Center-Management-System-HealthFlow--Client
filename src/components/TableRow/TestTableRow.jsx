// Import statements...
import PropTypes from 'prop-types'
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { BiEdit } from 'react-icons/bi';
import UpdateTestModal from '../Modal/Test/UpdateTestModal';

const TestTableRow = ({ test, refetch }) => {
    const [isUpdateTestModalOpen, setIsUpdateTestModalOpen] = useState(false)

    // const axiosPublic = useAxiosPublic();

    // const { mutateAsync } = useMutation({
    //     mutationFn: async ({ isActive }) => {
    //         const { data } = await axiosPublic.patch(
    //             `/banners/update/${bannerInfo._id}`,
    //             { isActive }
    //         );
    //         return data;
    //     },
    //     onSuccess: data => {
    //         refetch();
    //         toast.success('Banner isActive Status updated successfully!');
    //         setIsBannerStatusModalOpen(false);
    //     },
    // });



    return (
        <tr>
            {/* Table data... */}
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <img
                    alt='profile'
                    src={test?.image}
                    className='mx-auto object-cover rounded h-10 w-15 '
                />
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{test?.test_name}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{test?.price}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{test?.date}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{test?.total_slots}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{test?.adminInfo.email}</p>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 opacity-50 rounded-full'
                    ></span>
                    <span className='relative' onClick={() => setIsUpdateTestModalOpen(true)}><BiEdit /></span>
                </span>
                {/* Update Test Modal */}
                <UpdateTestModal
                    isOpen={isUpdateTestModalOpen}
                    setIsOpen={setIsUpdateTestModalOpen}
                    // modalHandler={handleTestUpdate}
                    test={test}
                />
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Delete</span>
                </span>
                {/* Update User Modal */}
                {/* <BannerModal
                    closeModal={closeModal}
                    isOpen={isOpen}
                /> */}
            </td>
        </tr>
    );
};

TestTableRow.propTypes = {
    test: PropTypes.object,
    refetch: PropTypes.func,
};

export default TestTableRow;