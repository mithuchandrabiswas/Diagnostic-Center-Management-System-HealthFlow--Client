import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import TestTableRow from "../../../components/TableRow/TestTableRow";
import ReservationTableRow from "../../../components/TableRow/ReservationTableRow";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const ManageTests = () => {
    const axiosPrivate = useAxiosPrivate();

    // Fetch tests data
    const {
        data: tests = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const { data } = await axiosPrivate.get(`/tests`);
            return data;
        },
    });

    // All reservation
    const {
        data: reservations = [],
    } = useQuery({
        queryKey: ['reservations'],
        queryFn: async () => {
            const { data } = await axiosPrivate.get(`/appointments`);
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <>
            <div className="container mx-auto px-4 sm:px-8">
                <Helmet>
                    <title>HealthFlow | All Tests</title>
                </Helmet>
                <div className="py-8">
                    <h1>All Tests ({tests.length}) </h1>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal text-center">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-background-white border-b border-primary-lightGray text-accent-darkGray text-left text-sm uppercase font-normal"
                                        >
                                            Image
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-background-white border-b border-primary-lightGray text-accent-darkGray text-left text-sm uppercase font-normal"
                                        >
                                            Test Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-background-white border-b border-primary-lightGray text-accent-darkGray text-left text-sm uppercase font-normal"
                                        >
                                            Test Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-background-white border-b border-primary-lightGray text-accent-darkGray text-left text-sm uppercase font-normal"
                                        >
                                            Slot Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-background-white border-b border-primary-lightGray text-accent-darkGray text-left text-sm uppercase font-normal"
                                        >
                                            Remaining Slot
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-background-white border-b border-primary-lightGray text-accent-darkGray text-left text-sm uppercase font-normal"
                                        >
                                            Admin Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-background-white border-b border-primary-lightGray text-accent-darkGray text-left text-sm uppercase font-normal"
                                        >
                                            Update
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-background-white border-b border-primary-lightGray text-accent-darkGray text-left text-sm uppercase font-normal"
                                        >
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tests.map((test) => (
                                        <TestTableRow
                                            key={test?._id}
                                            test={test}
                                            refetch={refetch}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="py-8">
                    <h1>All reservations ({reservations.length}) </h1>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal text-center">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-background-white border-b border-primary-lightGray text-accent-darkGray text-left text-sm uppercase font-normal"
                                        >
                                            Image
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-background-white border-b border-primary-lightGray text-accent-darkGray text-left text-sm uppercase font-normal"
                                        >
                                            Test Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-background-white border-b border-primary-lightGray text-accent-darkGray text-left text-sm uppercase font-normal"
                                        >
                                            Test Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-background-white border-b border-primary-lightGray text-accent-darkGray text-left text-sm uppercase font-normal"
                                        >
                                            Discount Amount
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-background-white border-b border-primary-lightGray text-accent-darkGray text-left text-sm uppercase font-normal"
                                        >
                                            Slot Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-background-white border-b border-primary-lightGray text-accent-darkGray text-left text-sm uppercase font-normal"
                                        >
                                            Time
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-background-white border-b border-primary-lightGray text-accent-darkGray text-left text-sm uppercase font-normal"
                                        >
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map((reservation) => (
                                        <ReservationTableRow
                                            key={reservation?._id}
                                            reservation={reservation}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageTests;
