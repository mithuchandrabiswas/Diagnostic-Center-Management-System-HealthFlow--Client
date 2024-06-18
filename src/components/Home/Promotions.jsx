
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

const PromotionCard = ({ promotion }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
      <img className="w-full" src={promotion.imageUrl} alt={promotion.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{promotion.title}</div>
        <p className="text-gray-700 text-base">{promotion.description}</p>
        <p className="text-gray-700 text-base">Valid till: {promotion.validTill}</p>
      </div>
    </div>
  );
};

const PromotionCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {promotions.map((promotion, index) => (
        <PromotionCard key={index} promotion={promotion} />
      ))}
    </div>
  );
};

export default PromotionCards;
