import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="relative min-h-screen min-w-72 md:flex">
            {/* 1) SideBar --> Always Fix and Same */}
            <Sidebar />

            {/* 2) Outlet --> Not Fix and As like MainLayout */}
            <div className="flex-1 ml-64">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;