import PropTypes from 'prop-types';
import { useState, Fragment } from 'react';
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../Form/CheckoutForm';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

const BookingAppointmentModal = ({ closeModal, isOpen, bookingInfo, refetch }) => {
    const axiosPublic = useAxiosPublic();

    const { data: banners = [], isLoading, isError, error } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/banners');
            return data;
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Review Info Before Appointment
                                </DialogTitle>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Test Name: {bookingInfo.test_name}
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Booker Name: {bookingInfo.bookerInfo.name}
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Price: $ {bookingInfo.price}
                                    </p>
                                    <p className='text-sm text-gray-500'>
                                        Slot Date:{bookingInfo.booking_date}
                                    </p>
                                    <p className='text-sm text-gray-500'>
                                        Slot Time:{bookingInfo.time}
                                    </p>
                                </div>

                                <Elements stripe={stripePromise}>
                                    <CheckoutForm
                                        bookingInfo={bookingInfo}
                                        closeModal={closeModal}
                                        refetch={refetch}
                                    />
                                </Elements>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

BookingAppointmentModal.propTypes = {
    bookingInfo: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default BookingAppointmentModal;
