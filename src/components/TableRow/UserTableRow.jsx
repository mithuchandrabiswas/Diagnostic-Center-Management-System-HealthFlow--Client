import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import UpdateUserStatusModal from '../Modal/User/UpdateUserStatusModal';
import UpdateUserRoleModal from '../Modal/User/UpdateUserRoleModal';
import SeeUserInfoModal from '../Modal/User/SeeUserInfoModal';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const UserTableRow = ({ user, refetch }) => {
    const axiosPrivate = useAxiosPrivate();
    const { user: loggedInUser } = useAuth();
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isSeeUserInfoModalOpen, setSeeUserInfoModalOpen] = useState(false);
    const axiosPublic = useAxiosPublic();

    const { mutateAsync } = useMutation({
        mutationFn: async ({ role, status }) => {
            const { data } = await axiosPublic.patch(
                `/users/update/${user?.email}`,
                { role, status }
            );
            return data;
        },
        onSuccess: data => {
            refetch();
            toast.success('User information updated successfully!');
            setIsRoleModalOpen(false);
            setIsStatusModalOpen(false);
        },
    });

    const handleRoleUpdate = async selectedRole => {
        if (loggedInUser.email === user.email) {
            toast.error('Action Not Allowed');
            return setIsRoleModalOpen(false);
        }

        const userRole = { role: selectedRole };
        try {
            await mutateAsync({ role: userRole.role, status: user.status });
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleStatusUpdate = async selectedStatus => {
        if (loggedInUser.email === user.email) {
            toast.error('Action Not Allowed');
            return setIsStatusModalOpen(false);
        }

        const userStatus = { status: selectedStatus };
        try {
            await mutateAsync({ role: user.role, status: userStatus.status });
        } catch (err) {
            toast.error(err.message);
        }
    };

    const {
        data: appointments = [],
    } = useQuery({
        queryKey: ['appointments'],
        queryFn: async () => {
            const { data } = await axiosPrivate.get(`/appointments`);
            return data;
        },
        onError: error => {
            console.error('Error fetching appointments:', error);
        }
    });

    const filteredAppointments = appointments.filter(
        appointment => appointment.bookerInfo.email === user?.email
    );

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
                ['Booked Appointments', filteredAppointments.length],
            ],
            headStyles: { halign: 'center' },
            bodyStyles: { halign: 'center' },
        });

        if (filteredAppointments.length > 0) {
            doc.text('Booked Appointments', 10, doc.lastAutoTable.finalY + 10);
            doc.autoTable({
                startY: doc.lastAutoTable.finalY + 20,
                head: [['Test', 'Delivery Status', 'Date', 'Time', 'Price']],
                body: filteredAppointments.map(appt => [
                    appt.test_name,
                    appt.report_status,
                    appt.date,
                    appt.time,
                    appt.price,
                ]),
                headStyles: { halign: 'center' },
                bodyStyles: { halign: 'center' },
            });
        }

        doc.save(`${user.email}-details.pdf`);
    };

    return (
        <>
            <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    {user?.status ? (
                        <p className={`${user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'} whitespace-no-wrap`}>
                            {user.status}
                        </p>
                    ) : (
                        <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
                    )}
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <button
                        onClick={() => setIsRoleModalOpen(true)}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative'>Update Role</span>
                    </button>
                    <UpdateUserRoleModal
                        isOpen={isRoleModalOpen}
                        setIsOpen={setIsRoleModalOpen}
                        modalHandler={handleRoleUpdate}
                        user={user}
                    />
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <button
                        onClick={() => setIsStatusModalOpen(true)}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative'>Update Status</span>
                    </button>
                    <UpdateUserStatusModal
                        isOpen={isStatusModalOpen}
                        setIsOpen={setIsStatusModalOpen}
                        modalHandler={handleStatusUpdate}
                        user={user}
                    />
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <button
                        onClick={() => setSeeUserInfoModalOpen(true)}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative'>See Info</span>
                    </button>
                    <SeeUserInfoModal
                        isOpen={isSeeUserInfoModalOpen}
                        setIsOpen={setSeeUserInfoModalOpen}
                        user={user}
                    />
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <button
                        onClick={handleDownloadPdf}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-blue-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative'>Download Details</span>
                    </button>
                </td>
            </tr>
        </>
    );
};

UserTableRow.propTypes = {
    user: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default UserTableRow;
