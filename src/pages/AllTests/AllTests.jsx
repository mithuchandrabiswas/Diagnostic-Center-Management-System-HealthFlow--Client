import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import TestCard from '../../components/Card/TestCard';
import Container from '../../components/Shared/Container';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const AllTests = () => {
    const axiosPublic = useAxiosPublic();
    const [params, setParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
        const date = params.get('date') || '';
        const page = params.get('page') || 1;
        console.log('Date Param:', date); // Log date param
        console.log('Page Param:', page); // Log page param
        setDateFilter(date);
        setPage(Number(page));
    }, [params]);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['tests', page, dateFilter],
        queryFn: async () => {
            const response = await axiosPublic.get(`/tests`, {
                params: {
                    page,
                    date: dateFilter,
                },
            });
            console.log('Full API Response:', response); // Enhanced logging
            return response.data;
        },
        keepPreviousData: true,
    });

    const tests = data || [];
    const totalPages = data?.totalPages || 1; // Adjust default total pages
    const currentPage = data?.currentPage || 1;

    console.log('Tests:', tests); // Enhanced logging
    console.log('Current Page:', currentPage); // Enhanced logging
    console.log('Date Filter:', dateFilter); // Enhanced logging
    console.log('Total Pages:', totalPages); // Enhanced logging

    const handleDateChange = (event) => {
        const date = event.target.value;
        setParams(prevParams => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set('date', date);
            newParams.set('page', 1); // Reset page to 1 when date changes
            return newParams;
        });
    };

    const handlePageChange = (newPage) => {
        setParams(prevParams => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set('page', newPage);
            return newParams;
        });
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <Container>
            <div className="flex justify-between items-center py-4">
                <input
                    type="date"
                    value={dateFilter}
                    onChange={handleDateChange}
                    className="border rounded px-2 py-1 mt-10"
                />
            </div>
            {tests.length > 0 ? (
                <div className='pt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                    {tests.map(test => (
                        <TestCard key={test._id} test={test} />
                    ))}
                </div>
            ) : (
                <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
                    <h1 className="text-gray-600">No tests available for booking or appointment</h1>
                </div>
            )}
            <div className="flex justify-center py-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="px-4 py-2 mx-2 bg-gray-300 rounded"
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="px-4 py-2 mx-2 bg-gray-300 rounded"
                >
                    Next
                </button>
            </div>
        </Container>
    );
};

export default AllTests;
