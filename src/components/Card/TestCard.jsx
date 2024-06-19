import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TestCard = ({ test }) => {
  const testDate = new Date(test.date).toLocaleDateString();
  return (
    <Link to={`/test-details/${test?._id}`} className='col-span-1 cursor-pointer group'>
      <div className='flex flex-col w-full'>
        <div className='aspect-square relative overflow-hidden rounded-xl border'>
          {test?.image && (
            <img
              className='object-cover h-full w-full group-hover:scale-110 transition duration-300'
              src={test?.image}
              alt='Test'
            />
          )}
        </div>
        <div className='shadow-custom p-2'>
          <div className='font-semibold text-lg text-heading'>{test?.title}</div>
          <div className='font-light text-neutral-500'>{testDate}</div>
          <div className='font-light text-neutral-500'>{test?.test_name}</div>
          <div className='font-semibold'>Remaining Slots: {test?.total_slots}</div>
          <div className='flex flex-row items-center gap-1'>
            <div className='font-light text-paragraph' title={test?.details}>
              {test?.details.slice(0, 50)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

TestCard.propTypes = {
  test: PropTypes.object.isRequired,
};

export default TestCard;
