import PropTypes from 'prop-types';

const Slider = ({ recommendation }) => {
    return (
        <div className='relative bg-white rounded-lg overflow-hidden shadow-lg group hover:shadow-2xl transition-shadow duration-300 w-full h-full'>
            <div className='relative'>
                <img
                    className='object-cover h-64 w-full group-hover:scale-110 transition-transform duration-300'
                    src={recommendation?.image}
                    alt='Recommendation'
                />
                <div className='absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full'>
                    <div className='font-bold text-xs'>{recommendation?.text}</div>
                </div>
            </div>
            <div className='p-4'>
                <div className='font-semibold text-lg'>{recommendation?.recommendedBy}</div>
                <div className='text-neutral-500'>{recommendation?.tags?.join(', ')}</div>
            </div>
        </div>
    );
};

Slider.propTypes = {
    recommendation: PropTypes.shape({
        image: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        recommendedBy: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
    }),
};

export default Slider;
