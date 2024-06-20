
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import Container from '../Shared/Container';

const FeaturedTests = () => {
  const axiosPublic = useAxiosPublic();

  const { data: tests, error, isLoading } = useQuery({
    queryKey: ['featured-tests'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/featured-tests');
      return data;
    }
  });

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5">Error: {error.message}</div>;

  return (
    <div>
      <Container>
        <div className="text-center mb-10">
          <h1 className="text-heading text-2xl md:text-4xl font-bold mb-4">Our Featured Tests</h1>
          <p className="w-2/3 mx-auto text-paragraph">
            Explore our featured tests, handpicked for their popularity and high demand. These tests are essential for diagnosing various conditions and ensuring your health is monitored accurately. Each test is conducted with state-of-the-art equipment and administered by experienced professionals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {tests.map(test => (
            <Link to={`/test-details/${test._id}`} key={test._id} className="group">
              <div className="aspect-square relative overflow-hidden rounded-xl border shadow-custom group-hover:shadow-lg transition duration-300">
                {test.image && (
                  <img
                    className="object-cover h-full w-full group-hover:scale-110 transition duration-300"
                    src={test.image}
                    alt={test.test_name}
                  />
                )}
              </div>
              <div className="shadow-custom p-4 mt-2 bg-white rounded-lg">
                <div className="font-semibold text-lg text-heading">{test.test_name}</div>
                <div className="font-light text-neutral-500">{new Date(test.date).toLocaleDateString()}</div>
                <div className="font-light text-neutral-500">{test.test_name}</div>
                <div className="font-semibold text-subheading">Remaining Slots: {test.total_slots}</div>
                <div className="flex flex-row items-center gap-1 mt-2">
                  <div className="font-light text-paragraph" title={test.details}>
                    {test.details.slice(0, 50)}...
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FeaturedTests;
