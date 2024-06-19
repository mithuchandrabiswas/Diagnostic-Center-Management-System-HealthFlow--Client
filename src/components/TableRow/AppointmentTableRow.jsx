import PropTypes from 'prop-types';
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { confirmAlert } from 'react-confirm-alert';

const AppointmentTableRow = ({ appointment, refetch }) => {
    const axiosPublic = useAxiosPublic();
    const appointmentDate = new Date(appointment.date).toLocaleDateString();

    const deleteAppointment = async (id) => {
        try {
            await axiosPublic.delete(`/appointment/${id}`);
            toast.success('Appointment cancelled successfully');
            refetch(); // Refetch appointments data after successful deletion
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

    const submitReport = async (id) => {
        try {
            console.log(`Submitting report for appointment ID: ${id}`);
            const response = await axiosPublic.put(`/appointment/${id}`, { report_status: 'delivery' });
            console.log('API response:', response);
            if (response.status === 200) {
                toast.success('Report status updated to delivery');
                refetch();
            } else {
                toast.error('Error updating report status');
            }
        } catch (error) {
            console.error('Error updating report status:', error);
            toast.error('Error updating report status');
        }
    };

    return (
        <tr>
            {/* Table data */}
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <img
                    alt='profile'
                    src={appointment?.image}
                    className='mx-auto object-cover rounded h-10 w-15 '
                />
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{appointment?.test_name}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{appointment?.price}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{appointmentDate}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{appointment?.report_status}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{appointment?.total_slots}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{appointment?.bookerInfo.email}</p>
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
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button
                    onClick={() => submitReport(appointment._id)}
                    className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                >
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Submit Report</span>
                </button>
            </td>
        </tr>
    );
};

AppointmentTableRow.propTypes = {
    appointment: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default AppointmentTableRow;
