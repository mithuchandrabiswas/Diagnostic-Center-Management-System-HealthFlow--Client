
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
                <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                    {tests.map(test => (
                        <TestCard key={test._id} test={test} />
                    ))}
                </div>
            ) : (
                <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
                    <h1>Hello</h1>
                </div>
            )}
            <h1>hello</h1>
        </Container>
    )
}

export default AllTests