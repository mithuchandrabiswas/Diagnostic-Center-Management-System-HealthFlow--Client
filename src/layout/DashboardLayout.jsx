import { Outlet } from "react-router-dom";
import SideBar from "../components/Dashboard/SideBar/SideBarLayout/SideBar";

const DashboardLayout = () => {
    return (
        <div className="relative min-h-screen min-w-72 md:flex">
            {/* 1) SideBar --> Always Fix and Same */}
            <SideBar />

            {/* 2) Outlet --> Not Fix and As like MainLayout */}
            <div className="flex-1 ml-64">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;