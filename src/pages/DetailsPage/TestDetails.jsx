
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import Container from '../../components/Shared/Container'
import BookedTestAppointment from '../../components/Appointment/BookedTestAppointment'

const TestDetails = () => {
  const { id } = useParams()
  console.log(id);
  const axiosPublic = useAxiosPublic()
  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams()

  const { data: test = [], isLoading, refetch } = useQuery({
      queryKey: ['test', id],
      queryFn: async () => {
          const { data } = await axiosPublic.get(`/test-details/${id}`)
          return data
      },
  })


  if (isLoading) return <LoadingSpinner />
  console.log(test);

  return (
    <Container>
      <Helmet>
        <title>{test?.title}</title>
      </Helmet>
      {test && (
        <div className='max-w-screen-lg mx-auto'>
          {/* Header */}
          <div className='flex flex-col gap-6'>
            <div>
              
              <div className='w-full md:h-[60vh] overflow-hidden rounded-xl'>
                <img
                  className='object-cover w-full'
                  src={test.image}
                  alt='header image'
                />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            {/* test Info */}
            <div className='col-span-4 flex flex-col gap-8'>
              <div className='flex flex-col gap-2'>
                <div
                  className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
                >
                  <div>Hosted by {test?.adminInfo?.name}</div>

                  <img
                    className='rounded-full'
                    height='30'
                    width='30'
                    alt='Avatar'
                    referrerPolicy='no-referrer'
                    src={test?.adminInfo?.image}
                  />
                </div>
                <div
                  className='
                flex 
                flex-row 
                items-center 
                gap-4 
                font-light
                text-neutral-500
              '
                >
                  <div>{test?.from} Date</div>
                  <div>{test?.test_name} Name</div>
                  <div>{test?.price} Price</div>
                  <div>{test?.total_slots} Slot</div>
                </div>
              </div>

              <hr />
              <div
                className='
          text-lg font-light text-neutral-500'
              >
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