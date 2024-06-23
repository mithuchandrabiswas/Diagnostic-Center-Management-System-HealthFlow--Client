
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import Container from '../../components/Shared/Container'
import BookedTestAppointment from '../../components/Appointment/BookedTestAppointment'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const TestDetails = () => {
  const { id } = useParams()
  // console.log(id);
  const axiosPrivate = useAxiosPrivate()
  const { data: test = [], isLoading, refetch } = useQuery({
    queryKey: ['test', id],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(`/test-details/${id}`)
      return data
    },
  })

  if (isLoading) return <LoadingSpinner />
  // console.log(test);

  return (
    <Container>
      <Helmet>
        <title>{test?.title}</title>
      </Helmet>
      {test && (
        <div className='mx-auto border flex flex-col md:flex-row p-2'>
          {/* Header */}
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            {/* test Info */}
            <div className='col-span-4 flex flex-col gap-2'>
              <img className='object-contain' src={test.image} alt='header image' />
              <div className='flex flex-col gap-2'>
                <div className='text-xl font-semibold flex flex-row items-center gap-2'>
                  <div className='text-sm'>Hosted by {test?.adminInfo?.name}</div>
                  <img className='rounded-full' height='30' width='30' alt='Avatar' referrerPolicy='no-referrer' src={test?.adminInfo?.image} />
                </div>
                <div className='flex flex-col md:flex-row items-center gap-4 font-light text-neutral-500'>

                  <div className='text-xs md:text-base'>
                    <div>Date: {test?.date} </div>
                    <div>Name: {test?.test_name} </div>
                  </div>
                  <div className='text-xs md:text-base'>
                    <div>Price: {test?.price} </div>
                    <div>Total Slot: {test?.total_slots} </div>
                  </div>

                </div>
              </div>

              <hr />
              <div className='text-xs font-light text-neutral-500'>
                {test?.details}
              </div>
              <hr />
            </div>

            <div className='md:col-span-3 order-first md:order-last mb-10'>
              {/* TestAppointments */}
              <BookedTestAppointment refetch={refetch} test={test} />
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

export default TestDetails