import PropTypes from 'prop-types';;

const ReservationTableRow = ({ reservation }) => {

    const discountAmount = reservation?.price - reservation?.discountedPrice

    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <img
                    alt='profile'
                    src={reservation?.image}
                    className='mx-auto object-cover rounded h-10 w-15'
                />
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{reservation?.test_name}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{reservation?.price}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {discountAmount}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{reservation?.booking_date}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{reservation?.time}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{reservation?.report_status}</p>
            </td>
            
        </tr>
    );
};

ReservationTableRow.propTypes = {
    reservation: PropTypes.object.isRequired,
};

export default ReservationTableRow;
