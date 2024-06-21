import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import AppointmentTableRow from "../../../components/TableRow/AppointmentTableRow";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";


const ManageAppointments = () => {
    const axiosPrivate = useAxiosPrivate()
    const [search, setSearch] = useState('')
    const [searchText, setSearchText] = useState('')
    //   Fetch users Data
    const {
        data: appointments = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['appointments', search],
        queryFn: async () => {
            const { data } = await axiosPrivate.get(`/appointments?search=${search}`)
            return data
        },
    })

    const handleSearch = e => {
        e.preventDefault()

        setSearch(searchText)
    }
    const handleReset = () => {
        setSearch('')
        setSearchText('')
    }

    // console.log(search);
    // console.log(appointments)
    if (isLoading) return <LoadingSpinner />

    return (
        <>
            <div className='container mx-auto px-4 sm:px-8'>
                <Helmet>
                    <title>HealthFlow | Reservation</title>
                </Helmet>

                <div className='py-8'>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-5">
                        <form onSubmit={handleSearch}>
                            <div className='flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300 mx-auto'>
                                <input
                                    className='input-sm px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                                    type='text'
                                    onChange={e => setSearchText(e.target.value)}
                                    value={searchText}
                                    name='search'
                                    placeholder='Search by email'
                                    aria-label='Search by email'
                                />

                                <button className='btn-sm text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                                    Search
                                </button>
                            </div>
                        </form>
                        <button onClick={handleReset} className='btn btn-sm'>
                            Reset
                        </button>
                    </div>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal text-center'>
                                <thead>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Image
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Test Name
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Test Price
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Slot Date
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Delivery Status
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Remaining Slot
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Email
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Cancel
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Update Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map(appointment => (
                                        <AppointmentTableRow
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
        </>
    );
};

export default ManageAppointments;