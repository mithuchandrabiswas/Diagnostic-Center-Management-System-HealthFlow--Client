import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

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
          <img
            className='
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              '
            src={test?.image}
            alt='Room'
          />
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        <div className='font-semibold text-lg'>{test?.title}</div>
        <div className='font-light text-neutral-500'>{test?.from}</div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>{test?.total_slots}</div>
          <div className='font-light'>{test?.details}</div>
        </div>
      </div>
    </Link>
  )
}

TestCard.propTypes = {
  test: PropTypes.object,
}

export default TestCard