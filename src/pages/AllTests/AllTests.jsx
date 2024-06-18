import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import TestCard from '../../components/Card/TestCard';
import Container from '../../components/Shared/Container';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

const AllTests = () => {
    const axiosPublic = useAxiosPublic();
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [filter, setFilter] = useState('');

  

    const { data: allTest = [], isLoading: isLoadingTests, isError: isErrorTests, error: errorTests } = useQuery({
        queryKey: ['tests', currentPage, itemsPerPage, filter],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/tests?page=${currentPage}&size=${itemsPerPage}&filter=${filter}`);
            return data;
        },
        keepPreviousData: true,
    });

    const { data: testsCount, isLoading: isLoadingCount, isError: isErrorCount, error: errorCount } = useQuery({
        queryKey: ['count', filter],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/tests-count?filter=${filter}`);
            return data;
        },
        keepPreviousData: true,
    });

    useEffect(() => {
        if (testsCount) {
            setCount(testsCount.count);
        }
    }, [testsCount]);

    if (isLoadingTests || isLoadingCount) return <LoadingSpinner />;
    if (isErrorTests) return <p>Error: {errorTests.message}</p>;
    if (isErrorCount) return <p>Error: {errorCount.message}</p>;

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1);

    const handlePaginationButton = value => {
        setCurrentPage(value);
    };

    return (
        <Container>
            <Helmet>
                <title>
                    HealthFlow || AllTests
                </title>
            </Helmet>
            <div className="flex justify-center items-center py-4">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    value={filter}
                    type="date"
                    className="border rounded px-2 py-1 mt-10"
                />
            </div>
            {allTest.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                    {allTest.map(test => (
                        <TestCard key={test._id} test={test} />
                    ))}
                </div>
            ) : (
                <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
                    <h1 className="text-gray-600">No tests available for booking or appointment</h1>
                </div>
            )}
            {/* Pagination Section */}
            <div className='flex justify-center mt-12'>
                {/* Previous Button */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePaginationButton(currentPage - 1)}
                    className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'
                >
                    <div className='flex items-center -mx-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M7 16l-4-4m0 0l4-4m-4 4h18'
                            />
                        </svg>

                        <span className='mx-1'>previous</span>
                    </div>
                </button>
                {/* Numbers */}
                {pages.map(btnNum => (
                    <button
                        onClick={() => handlePaginationButton(btnNum)}
                        key={btnNum}
                        className={`hidden ${currentPage === btnNum ? 'bg-blue-500 text-white' : ''
                            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}
                {/* Next Button */}
                <button
                    disabled={currentPage === numberOfPages}
                    onClick={() => handlePaginationButton(currentPage + 1)}
                    className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'
                >
                    <div className='flex items-center -mx-1'>
                        <span className='mx-1'>Next</span>

                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </Container>
    );
};

export default AllTests;
