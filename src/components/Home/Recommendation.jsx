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
        <div className="container mx-auto px-4 py-10">
            <div className="text-center mb-10">
                <h1 className="text-heading text-2xl md:text-4xl font-bold mb-4">Recommendations</h1>
                <p className="md:w-2/3 text-xs md:text-sm mx-auto text-paragraph">
                    Discover personalized health recommendations based on advanced diagnostics, tailored for your well-being and peace of mind.
                </p>
            </div>
            <Swiper
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
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
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
