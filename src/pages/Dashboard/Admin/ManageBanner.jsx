import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import BannerTableRow from '../../../components/TableRow/BannerTableRow'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

const ManageBanner = () => {
    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth()

    const { data: banners = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['banners', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            if (!user?.email) return []; 
            const { data } = await axiosPrivate.get(`/banners/${user.email}`);
            return data;
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    // console.log(banners);

    return (
        <>
            <Helmet>
                <title>HealthFlow | Manage Banner</title>
            </Helmet>
            <div className='container mx-auto px-4 sm:px-8'>
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Image
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Description
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Coupon Code
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Coupon Rate
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Banner Status
                                        </th>
                                        <th
                                            scope='col'
                                            className=' bg-white  border-b border-gray-200 text-gray-800 font-bold  text-center text-xs uppercase'
                                        >
                                            Update
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Room row data */}
                                    {
                                        banners.map(banner => <BannerTableRow
                                            key={banner?._id}
                                            bannerInfo={banner}
                                            refetch={refetch}
                                        />
                                        )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageBanner