import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Button from '../Shared/Button';
import BookingAppointmentModal from '../Modal/Appointment/BookingAppointmentModal';
import useRole from '../../hooks/useRole';

const BookedTestAppointment = ({ test, refetch }) => {
    const { user } = useAuth();
    const [role] = useRole()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [slotOptions, setSlotOptions] = useState([]);
    // console.log(test);
    // console.log(role);

    const closeModal = () => {
        setIsOpen(false);
    };

    const formattedTestDate = new Date(test?.date).toLocaleDateString()

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
        } else if (test?.test_name === 'Urine test') {
            setSlotOptions(['09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM', '03:00 PM - 04:00 PM', '04:00 PM - 05:00 PM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM', '08:00 PM - 09:00 PM', '09:00 PM - 10:00 PM']);
        } else if (test?.test_name === 'Vitamin D Test') {
            setSlotOptions(['09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM', '03:00 PM - 04:00 PM', '04:00 PM - 05:00 PM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM']);
        } else if (test?.test_name === 'AIDS') {
            setSlotOptions(['09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM']);
        } else if (test?.test_name === 'Pap Smear') {
            setSlotOptions(['10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM']);
        } else if (test?.test_name === 'EKG/ECG (Electrocardiogram)') {
            setSlotOptions(['09:00 AM - 09:30 AM', '09:30 AM - 10:00 AM', '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM', '11:00 AM - 11:30 PM', '11:30 AM - 12:00 PM', '12:00 AM - 12:30 PM', '12:30 PM - 01:00 PM', '03:00 PM - 03:30 PM', '03:30 PM - 04:00 PM', '04:00 PM - 04:30 PM', '04:30 PM - 05:00 PM', '05:00 PM - 05:30 PM', '05:30 PM - 06:00 PM', '06:00 PM - 06:30 PM', '06:30 PM - 07:00 PM', '07:00 PM - 07:30 PM', '07:30 PM - 08:00 PM', '08:00 PM - 08:30 PM', '08:30 PM - 09:00 PM', '09:00 PM - 09:30 PM', '09:30 PM - 10:00 PM', '10:00 PM - 10:30 PM', '10:30 PM - 11:00 PM', '11:00 PM - 11:30 PM']);
        } else if (test?.test_name === 'Bone Density Test') {
            setSlotOptions(['09:00 AM - 09:30 AM', '09:30 AM - 10:00 AM', '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM', '11:00 AM - 11:30 PM', '11:30 AM - 12:00 PM', '12:00 AM - 12:30 PM', '12:30 PM - 01:00 PM', '03:00 PM - 03:30 PM', '03:30 PM - 04:00 PM', '04:00 PM - 04:30 PM', '04:30 PM - 05:00 PM', '05:00 PM - 05:30 PM', '05:30 PM - 06:00 PM', '06:00 PM - 06:30 PM', '06:30 PM - 07:00 PM', '07:00 PM - 07:30 PM', '07:30 PM - 08:00 PM', '08:00 PM - 08:30 PM', '08:30 PM - 09:00 PM', '09:00 PM - 09:30 PM', '09:30 PM - 10:00 PM']);
        } else if (test?.test_name === 'PSA Test') {
            setSlotOptions(['09:00 AM - 09:30 AM', '09:30 AM - 10:00 AM', '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM', '11:00 AM - 11:30 PM', '11:30 AM - 12:00 PM', '12:00 AM - 12:30 PM', '12:30 PM - 01:00 PM', '03:00 PM - 03:30 PM', '03:30 PM - 04:00 PM', '04:00 PM - 04:30 PM', '04:30 PM - 05:00 PM', '05:00 PM - 05:30 PM', '05:30 PM - 06:00 PM', '06:00 PM - 06:30 PM', '06:30 PM - 07:00 PM', '07:00 PM - 07:30 PM', '07:30 PM - 08:00 PM', '08:00 PM - 08:30 PM', '08:30 PM - 09:00 PM'])
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
                {role === 'admin' ?
                    (
                        <p className='text-red-500'> Sorry, you are the owner of this website so you can't book any appointments </p>
                    )
                    :
                    (
                        test?.total_slots < 1 ?
                            (
                                <p className='text-red-500'> Sorry, all slots are already booked today </p>
                            )
                            :
                            (
                                <Button
                                    disabled={test?.booked || !selectedSlot || test?.total_slots < 1}
                                    onClick={() => setIsOpen(true)}
                                    label="Book Now"
                                />
                            )
                    )}
            </div>


            {/* Modal */}
            <BookingAppointmentModal
                isOpen={isOpen}
                refetch={refetch}
                closeModal={closeModal}
                bookingInfo={{
                    ...test,
                    price: test?.price,
                    booking_date: formattedTestDate,
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
    }).isRequired,
    refetch: PropTypes.func.isRequired,
};

export default BookedTestAppointment;
