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
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 bg-blue-200 rounded-md p-6 mb-10">
                        <div className='w-1/2'>
                            <img className='w-full' src={activeBanner.image_url} alt="" />
                        </div>
                        <div className="max-w-md space-y-4">
                            <h1 className="text-base md:text-2xl font-bold">{activeBanner.banner_title}</h1>
                            <h3 className="text-xs md:text-xl font-bold text-subheading">{activeBanner.banner_name}</h3>
                            <p className="text-sm text-paragraph">{activeBanner.banner_description}</p>
                            <div className='flex justify-between text-subheading'>
                                <span>Coupon: {activeBanner.coupon_code}</span>
                                <span>Off: {activeBanner.coupon_rate}%</span>
                            </div>
                            <Link to='/all-tests'><button className="btn bg-buttonBg btn-sm mt-4 hover:bg-blue-400">All Tests</button></Link>
                        </div>
                    </div>
            }
        </>
    );
};

export default Banner;