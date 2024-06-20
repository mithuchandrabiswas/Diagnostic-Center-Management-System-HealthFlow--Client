
import PropTypes from 'prop-types';

const PromotionCard = ({ promotion }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-custom m-2">
      <img className="w-full h-48 object-cover" src={promotion.imageUrl} alt={promotion.title} />
      <div className="p-3 space-y-2">
        <div className="font-bold text-lg text-heading">{promotion.title}</div>
        <p className="text-paragraph text-sm">{promotion.description}</p>
        <p className="text-paragraph text-sm font-bold">Valid till: {promotion.validTill}</p>
      </div>
    </div>
  );
};

PromotionCard.propTypes = {
  promotion: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    validTill: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

const PromotionCards = () => {
  const promotions = [
    {
      title: "Summer Health Check-up Package",
      description: "Get a comprehensive health check-up at a discounted rate this summer. Includes blood tests, X-rays, and specialist consultations.",
      validTill: "August 31, 2024",
      imageUrl: "https://i.ibb.co/9crdJgf/images.jpg"
    },
    {
      title: "Free Diabetes Screening",
      description: "Avail free diabetes screening for the month of June. Early detection can help in managing diabetes better.",
      validTill: "June 30, 2024",
      imageUrl: "https://i.ibb.co/X4hNGpy/images-2.jpg"
    },
    {
      title: "Women's Health Week",
      description: "Special discounts on gynecological exams, breast screenings, and bone density tests. Celebrate Women's Health Week with us!",
      validTill: "July 15, 2024",
      imageUrl: "https://i.ibb.co/ZNyNtbv/images-3.jpg"
    },
    {
      title: "Cardiac Health Camp",
      description: "Join our Cardiac Health Camp and get free ECG, cholesterol tests, and heart health consultations.",
      validTill: "July 31, 2024",
      imageUrl: "https://i.ibb.co/rbYGLm2/images-4.jpg"
    },
    {
      title: "Child Health Month",
      description: "Ensure your child's health with our special pediatric health package, including vaccinations, growth assessments, and nutritional guidance.",
      validTill: "August 15, 2024",
      imageUrl: "https://i.ibb.co/6PmPmDx/Childrens-Environmental-Health-Day-ATSDR-2.jpg"
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-heading text-2xl md:text-4xl font-bold mb-4">Promotion</h1>
        <p className="w-2/3 mx-auto text-paragraph">
          Explore our featured tests, handpicked for their popularity and high demand. These tests are essential for diagnosing various conditions and ensuring your health is monitored accurately. Each test is conducted with state-of-the-art equipment and administered by experienced professionals.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10">
        {promotions.map((promotion, index) => (
          <PromotionCard key={index} promotion={promotion} />
        ))}
      </div>
    </div>
  );
};

export default PromotionCards;
