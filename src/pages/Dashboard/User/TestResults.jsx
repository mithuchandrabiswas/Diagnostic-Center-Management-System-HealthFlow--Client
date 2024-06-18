import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import TestResultTableRow from "../../../components/TableRow/TestResultTableRow";

const TestResults = () => {
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

    const deliveredAppointments = appointments?.filter(appointment => appointment.report_status === 'delivery');

    return (
        <div>
            <Helmet>
                <title>My Test Results</title>
            </Helmet>
            <div className='container mx-auto px-2 sm:px-4'>
                <h1 className="text-base md:text-xl font-semibold text-center">My all Test Results({deliveredAppointments?.length})</h1>
                <div>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            {deliveredAppointments?.length > 0 ? (
                                <table className='min-w-full leading-normal'>
                                    <thead>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-[10px] md:text-xs font-normal uppercase'
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
                                                className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-xs font-normal col-span-2'
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {deliveredAppointments.map(appointment => (
                                            <TestResultTableRow
                                                key={appointment._id}
                                                appointment={appointment}
                                                refetch={refetch}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>You have no test results</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestResults;
