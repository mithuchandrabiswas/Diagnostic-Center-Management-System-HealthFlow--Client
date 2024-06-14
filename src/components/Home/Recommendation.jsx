import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import '../../../src/styles.css';

// Import required modules
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import Slider from './Slider';

const Recommendation = () => {
    const axiosPublic = useAxiosPublic();

    // Get all recommendation data from Database
    const { data: recommendations = [], isLoading, isError, error } = useQuery({
        queryKey: ['recommendations'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/recommendations');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                loop={true} // Enable infinite loop
                autoplay={{
                    delay: 3000, // Adjust delay as needed
                    disableOnInteraction: false,
                }}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, FreeMode, Pagination, Navigation]}
                className="mySwiper"
            >
                {recommendations.map(recommendation => (
                    <SwiperSlide key={recommendation._id}>
                        <Slider recommendation={recommendation} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Recommendation;
