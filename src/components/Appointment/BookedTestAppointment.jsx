import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Button from '../Shared/Button';
import BookingAppointmentModal from '../Modal/Appointment/BookingAppointmentModal';
import { format } from 'date-fns';

const BookedTestAppointment = ({ test, refetch }) => {
    console.log(test);
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [slotOptions, setSlotOptions] = useState([]);

    const closeModal = () => {
        setIsOpen(false);
    };

    const formattedBookingTime = format(new Date(), 'MMMM dd, yyyy HH:mm:ss');
    const formattedTestDate = test?.date ? format(new Date(test.date), 'MMMM dd, yyyy') : 'N/A';

    const handleSlotSelection = (event) => {
        setSelectedSlot(event.target.value);
    };

    useEffect(() => {
        if (test?.test_name === 'CT Scan') {
            setSlotOptions(['09:00 AM - 10:00 AM', '11:00 AM - 12:00 PM', '02:00 PM - 03:00 PM']);
        } else if (test?.test_name === 'Endoscopy') {
            setSlotOptions(['09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '03:00 PM - 04:00 PM', '04:00 PM - 05:00 PM']);
        } else if (test?.test_name === 'Ultrasonography') {
            setSlotOptions(['09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM', '03:00 PM - 04:00 PM']);
        } else if (test?.test_name === 'Xray') {
            setSlotOptions(['09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM', '03:00 PM - 04:00 PM', '04:00 PM - 05:00 PM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM']);
        } else {
            setSlotOptions([]);
        }
    }, [test?.test_name]);

    return (
        <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white">
            <div className="flex items-center justify-between gap-1 p-4">
                <div className="font-light text-neutral-600">{test?.test_name || 'Test Name'}</div>
                <div className="text-xl">BDT-{test?.price}</div>
            </div>
            <hr />
            <div className="flex justify-center p-4">
                Appointment Date: {formattedTestDate}
            </div>
            <hr />
            {/* Slots Selection */}
            <div className="p-4">
                <div className="font-semibold mb-2">Select a Slot:</div>
                <select
                    value={selectedSlot}
                    onChange={handleSlotSelection}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={!slotOptions.length}
                >
                    <option value="" disabled>Select a slot</option>
                    {slotOptions.map((slot, index) => (
                        <option key={index} value={slot} disabled={selectedSlot === slot}>
                            {slot} {selectedSlot === slot && '(Selected)'}
                        </option>
                    ))}
                </select>
            </div>
            <hr />
            <div className="p-4">
                {test?.total_slots < 0 ? (
                    <p className='text-red-500'> Sorry all slots already book today </p>
            ) : (
            <Button
                disabled={test?.booked || !selectedSlot || test?.total_slots < 1}
                onClick={() => setIsOpen(true)}
                label="Book Now"
            />
                )}
        </div>

            {/* Modal */ }
            <BookingAppointmentModal
                isOpen={isOpen}
                refetch={refetch}
                closeModal={closeModal}
                bookingInfo={{
                    ...test,
                    price: test?.price,
                    booking_date: formattedBookingTime,
                    time: selectedSlot,
                    report_status: 'pending',
                    bookerInfo: {
                        name: user?.displayName || 'Anonymous',
                        email: user?.email || 'No email provided',
                        image: user?.photoURL || '',
                    },
                }}
            />
            <hr />
            <div className="p-4 flex items-center justify-between font-semibold text-lg">
                <div className='text-text-dark'>Total</div>
                <div className=''>BDT-{test?.price}</div>
            </div>
        </div >
    );
};

BookedTestAppointment.propTypes = {
    test: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        test_name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        booked: PropTypes.bool,
        date: PropTypes.string,
        total_slots: PropTypes.number,

        // Add other properties of `test` as needed
    }).isRequired,
    refetch: PropTypes.func.isRequired,
};

export default BookedTestAppointment;
