// Import statements...
import PropTypes from 'prop-types'
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { BiEdit } from 'react-icons/bi';
import UpdateTestModal from '../Modal/Test/UpdateTestModal';
import { confirmAlert } from 'react-confirm-alert';

const TestTableRow = ({ test, refetch }) => {
    const [isUpdateTestModalOpen, setIsUpdateTestModalOpen] = useState(false)
    const axiosPublic = useAxiosPublic();

    const deleteBanner = async (id) => {
        try {
            await axiosPublic.delete(`/test/${id}`);
            toast.success('Test delete successfully');
            refetch(); // Refetch Tests data after successful deletion
        } catch (error) {
            toast.error('Error cancelling test');
        }
    };

    const handleDelete = () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this test?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteBanner(test._id),
                },
                {
                    label: 'No',
                },
            ],
        });
    };



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
                <button
                    onClick={handleDelete}
                    className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight'
                >
                    <span className='absolute inset-0 bg-red-500 opacity-50 rounded-full'></span>
                    <span className='relative'>Delete</span>
                </button>
            </td>
        </tr>
    );
};

TestTableRow.propTypes = {
    test: PropTypes.object,
    refetch: PropTypes.func,
};

export default TestTableRow;