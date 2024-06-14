import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import UpdateUserStatusModal from '../Modal/User/UpdateUserStatusModal';
import UpdateUserRoleModal from '../Modal/User/UpdateUserRoleModal';
import UserModal from '../Modal/UserModal'; // Assuming you have a modal for user details

const UpcommingAppointmentsTableRow = ({ appointment, refetch }) => {
    const { user } = useAuth();

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    // const axiosPublic = useAxiosPublic();


    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        doc.text(`User Details`, 10, 10);
        doc.autoTable({
            startY: 20,
            head: [['Field', 'Value']],
            body: [
                ['Email', user.email],
                ['Role', user.role],
                ['Status', user.status],
                // Add other fields here
            ],
        });
        doc.save(`${user.email}-details.pdf`);
    };

    return (
        <>
            <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{appointment?.test_name}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{appointment?.date}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{appointment?.booking_time}</p>
                </td>
                
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <button
                        onClick={handleDownloadPdf}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-red-500 opacity-50 rounded-full'
                        ></span>
                        <span className='relative'>Cancel</span>
                    </button>
                </td>
            </tr>
            <UserModal
                isOpen={isUserModalOpen}
                onRequestClose={() => setIsUserModalOpen(false)}
                user={user}
            />
        </>
    );
};

UpcommingAppointmentsTableRow.propTypes = {
    appointment: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default UpcommingAppointmentsTableRow;
