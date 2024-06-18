import { Helmet } from "react-helmet-async";
import Banner from "../../components/Home/Banner";
import PromotionCards from "../../components/Home/Promotions";
import Recommendation from "../../components/Home/Recommendation";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>HealthFlow | Home</title>
            </Helmet>
            <Banner />
            <PromotionCards />
            <Recommendation />

        </div>
    );
};

export default Home;