import PropTypes from 'prop-types';
import 'react-confirm-alert/src/react-confirm-alert.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TestResultTableRow = ({ appointment, refetch }) => {
    const appointmentDate = new Date(appointment.date).toLocaleDateString();

    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        doc.text(`User Details`, 10, 10);
        doc.autoTable({
            startY: 20,
            head: [['Field', 'Value']],
            body: [
                ['Test Name', appointment?.test_name],
                ['Appointment Date', appointmentDate],
                ['Appointment Time', appointment?.time],
                ['Appointment Status', appointment?.report_status],
                // Add other fields here
            ],
        });
        doc.save(`${appointment.test_name}-details.pdf`);
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
                    <p className='text-gray-900 whitespace-no-wrap'>{appointment?.report_status}</p>
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
                        <span className='relative'>Download</span>
                    </button>
                </td>
            </tr>
        </>
    );
};

TestResultTableRow.propTypes = {
    appointment: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default TestResultTableRow;
