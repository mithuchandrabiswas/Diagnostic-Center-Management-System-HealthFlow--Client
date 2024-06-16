
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import TestCard from '../../components/Card/TestCard'
import Container from '../../components/Shared/Container'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'

const AllTests = () => {
    const axiosPublic = useAxiosPublic()
    // eslint-disable-next-line no-unused-vars
    const [params, setParams] = useSearchParams()

    const { data: tests = [], isLoading } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/tests`)

            return data
        },
    })


    if (isLoading) return <LoadingSpinner />
    // console.log(tests);

    return (
        <Container>
            {tests && tests.length > 0 ? (
                <div className='pt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                    {tests.map(test => (
                        <TestCard key={test._id} test={test} />
                    ))}
                </div>
            ) : (
                <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
                    <h1>Add some test for booking or appointment</h1>
                </div>
            )}
        </Container>
    )
}

export default AllTests





// import { useSearchParams } from "react-router-dom";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import Container from "../../components/Shared/Container";
// import TestCard from '../../components/Card/TestCard'

// const AllTests = () => {
//     const axiosPublic = useAxiosPublic();
//     const [params, setParams] = useSearchParams();
//     const [page, setPage] = useState(1);
//     const [dateFilter, setDateFilter] = useState('');
//     const { data, isLoading, isError } = useQuery({
//         queryKey: ['tests', page, dateFilter],
//         queryFn: async () => {
//             try {
//                 const { data } = await axiosPublic.get(`/tests`, {
//                     params: {
//                         page,
//                         date: dateFilter,
//                     },
//                 });
//                 return data;
//             } catch (error) {
//                 throw new Error(`Error fetching tests: ${error.message}`);
//             }
//         },
//     });

//     useEffect(() => {
//         const date = params.get('date') || '';
//         const page = params.get('page') || 1;
//         setDateFilter(date);
//         setPage(Number(page));
//     }, [params]);

//     const handleDateChange = (event) => {
//         const date = event.target.value;
//         setParams({ date, page: 1 });
//     };

//     const handlePageChange = (newPage) => {
//         setParams({ date: dateFilter, page: newPage });
//     };

//     if (isLoading) return <LoadingSpinner />;
//     if (isError) return <div>Error: {isError.message}</div>;

//     const { tests = [], totalPages = 1, currentPage = 1 } = data || {};

//     console.log("Data received:", data);

//     return (
//         <Container>
//             <div className="flex justify-between items-center py-4">
//                 <input
//                     type="date"
//                     value={dateFilter}
//                     onChange={handleDateChange}
//                     className="border rounded px-2 py-1"
//                 />
//             </div>
//             {tests.length > 0 ? (
//                 <div className='pt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
//                     {tests.map(test => (
//                         <TestCard key={test._id} test={test} />
//                     ))}
//                 </div>
//             ) : (
//                 <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
//                     <h1>Add some tests for booking or appointment</h1>
//                 </div>
//             )}
//             <div className="flex justify-center py-4">
//                 <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage <= 1}
//                     className="px-4 py-2 mx-2 bg-gray-300 rounded"
//                 >
//                     Previous
//                 </button>
//                 <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage >= totalPages}
//                     className="px-4 py-2 mx-2 bg-gray-300 rounded"
//                 >
//                     Next
//                 </button>
//             </div>
//         </Container>
//     );
// };

// export default AllTests;
