import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import UserTableRow from '../../../components/TableRow/UserTableRow'
const ManageUsers = () => {
    const axiosPublic = useAxiosPublic()
    //   Fetch users Data
    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/users`)
            return data
        },
    })

    console.log(users)
    if (isLoading) return <LoadingSpinner />
    return (
        <>
            <div className='container mx-auto px-4 sm:px-8'>
                <Helmet>
                    <title>Manage Users</title>
                </Helmet>
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
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
                                            Role
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Status
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Update Role
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
                                    {users.map(user => (
                                        <UserTableRow
                                            key={user?._id}
                                            user={user}
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
    )
}

export default ManageUsers