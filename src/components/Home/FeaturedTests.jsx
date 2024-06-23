import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Container from '../Shared/Container';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const FeaturedTests = () => {
  const axiosPublic = useAxiosPublic();
  const { data: appointments, error, isLoading } = useQuery({
    queryKey: ['featured-tests'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/appointmentss');
      return data;
    }
  });

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5">Error: {error.message}</div>;

  // Group appointments by service name and find most booked appointments
  const serviceCount = {};
  appointments.forEach(appointment => {
    const serviceName = appointment.test_name;
    if (serviceCount[serviceName]) {
      serviceCount[serviceName].push(appointment);
    } else {
      serviceCount[serviceName] = [appointment];
    }
  });

  // Convert to array of objects
  const mostBookedServices = Object.keys(serviceCount).map(serviceName => {
    const appointmentsForService = serviceCount[serviceName];
    // Find the most booked appointment for the service
    const mostBookedAppointment = appointmentsForService.reduce((prev, current) => (prev.total_slots > current.total_slots) ? prev : current, {});

    return {
      id: mostBookedAppointment.testId,
      test_name: serviceName,
      date: mostBookedAppointment.date,
      total_slots: mostBookedAppointment.total_slots,
      details: mostBookedAppointment.details,
      image: mostBookedAppointment.image, // Assuming image is part of the appointment data
      bookings: appointmentsForService.length // Count of bookings
    };
  });

  // Sort most booked services by total_slots (descending)
  mostBookedServices.sort((a, b) => b.total_slots - a.total_slots);
  // console.log(mostBookedServices);

  return (
    <Container>
      <div className="text-center mb-10">
        <h1 className="text-heading text-2xl md:text-4xl font-bold mb-4">Our Featured Tests</h1>
        <p className="md:w-2/3 text-xs md:text-sm mx-auto text-paragraph">
          Explore our featured tests, handpicked for their popularity and high demand. These tests are essential for diagnosing various conditions and ensuring your health is monitored accurately.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {mostBookedServices.slice(0, 6).map((test, index) => (
          <Link to={`/test-details/${test.id}`} key={index} className="group">
            <div className="shadow-custom p-4 mt-2 bg-white rounded-lg">
              <div className="aspect-square relative overflow-hidden rounded-xl border shadow-custom group-hover:shadow-lg transition duration-300">
                {test.image && (
                  <img
                    className="object-cover h-full w-full group-hover:scale-110 transition duration-300"
                    src={test.image}
                    alt={test.test_name}
                  />
                )}
              </div>
              <div className="mt-2 w-auto h-36">
                <div className="font-semibold text-lg text-heading">{test.test_name}</div>
                <div className="font-light text-neutral-500">Date: {new Date(test.date).toLocaleDateString()}</div>
                <div className="font-light text-paragraph" title={test.details}>
                  {test.details.slice(0, 50)}...
                </div>
                <div className='flex justify-between'>
                  <div className="font-semibold text-subheading text-xs">Total Slots: {test.total_slots}</div>
                  <div className="font-semibold text-subheading text-xs">Bookings: {test.bookings}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default FeaturedTests;
