import PropTypes from 'prop-types'
import { useState } from 'react'
import { DateRange } from 'react-date-range'
import { differenceInCalendarDays } from 'date-fns'
import useAuth from '../../hooks/useAuth'
import Button from '../Shared/Button'
import BookingAppointmentModal from '../Modal/BookingAppointmentModal'
const BookedTestAppointment = ({ test, refetch }) => {
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [state, setState] = useState([
        {
            startDate: new Date(test.from),
            endDate: new Date(test.to),
            key: 'selection',
        },
    ])

    const closeModal = () => {
        setIsOpen(false)
    }

    // total days * price
    const totalPrice =
        parseInt(differenceInCalendarDays(new Date(test.to), new Date(test.from))) *
        test?.price
    console.log(totalPrice)
    return (
        <div className='rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white'>
            <div className='flex items-center gap-1 p-4'>
                <div className='text-2xl font-semibold'>$ {test?.price}</div>
                <div className='font-light text-neutral-600'>/night</div>
            </div>
            <hr />
            <div className='flex justify-center'>
                {/* Calender */}
                <DateRange
                    showDateDisplay={false}
                    rangeColors={['#F6536D']}
                    onChange={item => {
                        console.log(item)
                        setState([
                            {
                                startDate: new Date(test.from),
                                endDate: new Date(test.to),
                                key: 'selection',
                            },
                        ])
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                />
            </div>
            <hr />
            <div className='p-4'>
                <Button
                    disabled={test?.booked}
                    onClick={() => setIsOpen(true)}
                    label='Book Now'
                />
            </div>

            {/* Modal */}
            <BookingAppointmentModal
                isOpen={isOpen}
                refetch={refetch}
                closeModal={closeModal}
                bookingInfo={{
                    ...test,
                    price: totalPrice,
                    bookerInfo: {
                        name: user?.displayName,
                        email: user?.email,
                        image: user?.photoURL,
                    },
                }}
            />
            <hr />
            <div className='p-4 flex items-center justify-between font-semibold text-lg'>
                <div>Total</div>
                <div>${totalPrice}</div>
            </div>
        </div>
    )
}

BookedTestAppointment.propTypes = {
    test: PropTypes.object,
    refetch: PropTypes.func,
}

export default BookedTestAppointment