import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import UpcommingAppointmentsTableRow from "../../../components/TableRow/UpcommingAppointmentsTableRow";

const MyUpcomingAppointments = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: appointments, isLoading, isError, refetch } = useQuery({
        queryKey: ['appointments', user?.email],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/appointments/${user?.email}`);
            return data;
        },
        enabled: !!user?.email
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading appointments</div>;
    }

    const pendingAppointments = appointments?.filter(appointment => appointment.report_status === 'pending');

    return (
        <div>
            <Helmet>
                <title> || My Upcoming Appointments</title>
            </Helmet>
            <div className='container mx-auto px-2 sm:px-4'>
                <h1 className="text-base md:text-xl font-semibold text-center">My all upcomming Appointments ({pendingAppointments?.length})</h1>
                <div>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            {pendingAppointments?.length > 0 ? (
                                <table className='min-w-full'>
                                    <thead>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-xs font-normal uppercase'
                                            >
                                                Test Name
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-xs font-normal uppercase'
                                            >
                                                Appointment Date
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-xs font-normal uppercase'
                                            >
                                                Appointment Time
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-xs font-normal uppercase'
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-xs font-normal uppercase'
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {pendingAppointments.map(appointment => (
                                            <UpcommingAppointmentsTableRow
                                                key={appointment._id}
                                                appointment={appointment}
                                                refetch={refetch}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>You have no upcoming appointments</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyUpcomingAppointments;
