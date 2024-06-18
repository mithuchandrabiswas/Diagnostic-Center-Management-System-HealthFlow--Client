import { Outlet } from "react-router-dom";
import SideBar from "../components/Dashboard/SideBar/SideBarLayout/SideBar";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
    return (
        <div className="relative min-h-screen md:flex">
            <Helmet>
                <title>HealthFlow | Dashboard</title>
            </Helmet>
            {/* 1) SideBar --> Always Fix and Same */}
            <SideBar />

            {/* 2) Outlet --> Not Fix and As like MainLayout */}
            <div className="flex-1 md:ml-52">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;