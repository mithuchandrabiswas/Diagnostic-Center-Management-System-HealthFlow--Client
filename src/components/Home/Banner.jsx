import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Banner = () => {
    const axiosPublic = useAxiosPublic()

    const { data: banners = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/banners`);
            return data;
        },
    });
    // console.log(banners);
    const activeBanner = banners.find(banner => banner.isActive === true)
    console.log(activeBanner);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;


    return (
        <>
            {
                activeBanner === undefined ? 'Please add a active Banner'
                    :
                    <div className="hero min-h-screen" style={{ backgroundImage: `url(${activeBanner.image_url})` }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md space-y-4">
                                <h1 className="text-3xl font-bold">{activeBanner.banner_title}</h1>
                                <h1 className="text-xl font-bold">{activeBanner.banner_name}</h1>
                                <p className="text-sm">{activeBanner.banner_description}</p>
                                <div className='flex justify-between'>
                                    <span>Coupon: {activeBanner.coupon_code}</span>
                                    <span>Discount: {activeBanner.coupon_rate}</span>
                                </div>
                                <Link to='/all-tests'><button className="btn btn-primary mt-4">All Tests</button></Link>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default Banner;