/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutFormCss.css';
import { ImSpinner9 } from 'react-icons/im';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ closeModal, bookingInfo, refetch, banners }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState(null);
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    if (bookingInfo?.price && bookingInfo.price > 1) {
      fetchClientSecret(bookingInfo.price);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingInfo.price]);

  useEffect(() => {
    const activeBanner = banners.find(banner => banner.isActive === true);
    if (activeBanner) {
      setCouponCode(activeBanner.coupon_code);
      setDiscount(activeBanner.coupon_rate);
    }
  }, [banners]);

  const fetchClientSecret = async (price) => {
    try {
      const { data } = await axiosPublic.post('/create-payment-intent', { price });
      setClientSecret(data.clientSecret);
    } catch (error) {
      toast.error('Failed to initialize payment.');
    }
  };

  const handleApplyCoupon = () => {
    const activeBanner = banners.find(banner => banner.isActive === true);
    if (activeBanner && couponCode === activeBanner.coupon_code) {
      setDiscount(activeBanner.coupon_rate);
      setCouponApplied(true);
      toast.success('Coupon applied successfully!');
    } else {
      toast.error('Invalid coupon code.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setCardError('');

    if (!stripe || !elements) {
      setProcessing(false);
      toast.error('Stripe.js has not loaded yet.');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      toast.error('Card Element not found.');
      return;
    }

    try {
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        const discountedPrice = calculateDiscountedPrice(bookingInfo.price, couponApplied ? discount : 0);
        const paymentInfo = {
          ...bookingInfo,
          transactionId: paymentIntent.id,
          date: new Date(),
          discountedPrice,
          testId: bookingInfo._id,
        };
        delete paymentInfo._id;

        try {
          await axiosPublic.post('/appointment', paymentInfo);
          refetch();
          closeModal();
          toast.success('Appointment Booked Successfully');
          navigate('/dashboard/my-upcoming-appointments');
        } catch (error) {
          console.error('Failed to send payment info to server:', error.response || error.message);
          toast.error('Failed to save appointment data. Please try again.');
        }
      }
    } catch (error) {
      setCardError(error.message);
      toast.error(`Failed to process payment: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };

  const calculateDiscountedPrice = (price, discountPercent) => {
    return price - (price * discountPercent) / 100;
  };

  return (
    <form onSubmit={handleSubmit} className='w-full space-y-3'>
      <div className='flex mt-2 justify-around w-full'>
        <div className='w-full flex items-center relative'>
          <input
            type='text'
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder='Enter coupon code'
            className='w-full p-2 border border-gray-300 rounded-md'
          />
          <button
            type='button'
            onClick={handleApplyCoupon}
            className='btn btn-sm rounded-md absolute right-2'
          >
            Apply Coupon
          </button>
        </div>
      </div>
      <div className='w-full'>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <div className='flex justify-between'>
        <button
          disabled={!stripe || !clientSecret || processing}
          type='submit'
          className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
        >
          {processing ? (
            <ImSpinner9 className='animate-spin m-auto' size={24} />
          ) : (
            `Pay ${calculateDiscountedPrice(bookingInfo?.price, couponApplied ? discount : 0).toFixed(2)} BDT`
          )}
        </button>
        <button
          onClick={closeModal}
          type='button'
          className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
        >
          Cancel
        </button>
      </div>
      {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
    </form>
  );
};

CheckoutForm.propTypes = {
  bookingInfo: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  banners: PropTypes.array.isRequired,
};

export default CheckoutForm;
