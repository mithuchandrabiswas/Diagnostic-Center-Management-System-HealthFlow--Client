import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TestCard = ({ test }) => {
  return (
    <Link to={`/test-details/${test?._id}`} className='col-span-1 cursor-pointer group'>
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            '
        >
          {test?.image && (
            <img
              className='
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              '
              src={test?.image}
              alt='Test'
            />
          )}
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        <div className='font-semibold text-lg'>{test?.title}</div>
        <div className='font-light text-neutral-500'>{test?.date}</div>
        <div className='font-light text-neutral-500'>{test?.test_name}</div>
        <div className='font-semibold'>Remaining Slots: {test?.total_slots}</div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-light' title={test?.details}>{test?.details.slice(0, 50)}</div>
        </div>
      </div>
    </Link>
  );
};

TestCard.propTypes = {
  test: PropTypes.object,
};

export default TestCard;
