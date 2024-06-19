import { NavLink, Outlet } from "react-router-dom";
import SideBar from "../components/Dashboard/SideBar/SideBarLayout/SideBar";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const DashboardLayout = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: userInfo = {} } = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/user/${user.email}`)
            return data
        }
    })
    // console.log(userInfo);
    
    return (
        <div className="relative min-h-screen md:flex">
            <Helmet>
                <title>HealthFlow | Dashboard</title>
            </Helmet>
            {
                userInfo.status === 'active' ?
                    (<>

                        {/* 1) SideBar --> Always Fix and Same */}
                        < SideBar />

                        {/* 2) Outlet --> Not Fix and As like MainLayout */}
                        < div className="flex-1 md:ml-52">
                            <Outlet />
                        </div></>
                    )
                    :
                    (
                        <div className="flex flex-col justify-center items-center space-y-4">
                            <p className="text-red-600 md:w-1/2 mx-auto text-center p-2">Sorry you are a blocked by admin. Please communicate with admin</p>
                            <NavLink to={'/'} className='btn btn-sm'>Go Back</NavLink>
                        </div>
                    )
            }
        </div >
    );
};

export default DashboardLayout;