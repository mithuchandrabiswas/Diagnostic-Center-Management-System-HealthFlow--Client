import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const UpcommingAppointmentsTableRow = ({ appointment, refetch }) => {
    const axiosPublic = useAxiosPublic();
    const appointmentDate = new Date(appointment.date).toLocaleDateString();

    const deleteAppointment = async (id) => {
        try {
            await axiosPublic.delete(`/appointment/${id}`);
            toast.success('Appointment cancelled successfully');
            refetch();
        } catch (error) {
            toast.error('Error cancelling appointment');
        }
    };

    const handleDelete = () => {
        confirmAlert({
            title: 'Confirm to cancel',
            message: 'Are you sure you want to cancel this appointment?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteAppointment(appointment._id),
                },
                {
                    label: 'No',
                },
            ],
        });
    };

    return (
        <>
            <tr className='text-center'>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{appointment?.test_name}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{appointmentDate}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{appointment?.time}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{appointment?.total_slots}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{appointment?.report_status}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <button
                        onClick={handleDelete}
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
        </>
    );
};

UpcommingAppointmentsTableRow.propTypes = {
    appointment: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default UpcommingAppointmentsTableRow;
