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

    return (
        <div>
            <Helmet>
                <title>My Upcoming Appointments</title>
            </Helmet>
            <h1 className="text-2xl">My All Booked Appointments ({appointments?.length})</h1>
            <div className='container mx-auto px-4 sm:px-8'>
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                        >
                                            Test Name
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                        >
                                            Appointment Date
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                        >
                                            Appointment Time
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments?.map(appointment => (
                                        <UpcommingAppointmentsTableRow
                                            key={appointment?._id}
                                            appointment={appointment}
                                            refetch={refetch}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyUpcomingAppointments;
