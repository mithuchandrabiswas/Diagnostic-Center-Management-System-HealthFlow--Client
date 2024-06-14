import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Profile = () => {
    const { user, loading } = useAuth();
    const [role] = useRole();
    const axiosPublic = useAxiosPublic()

    const {data: userp = [], isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/user/${user.email}`)
            return data
        }
    })
    console.log(userp);

    if (loading || isLoading) return <LoadingSpinner />;

    console.log(user);
    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100 p-4'>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className='w-full max-w-4xl bg-white shadow-lg rounded-lg p-6'>
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    <div className='flex flex-col items-center md:flex-row md:items-start space-x-0 md:space-x-4'>
                        <img
                            alt='profile'
                            src={user.photoURL}
                            className='object-cover rounded-full h-24 w-24 border-4 border-white'
                        />
                        <div className='text-center md:text-left mt-4 md:mt-0'>
                            <h2 className='text-2xl font-bold'>{user.displayName}</h2>
                            <p className='text-gray-600'>{user.email}</p>
                            <p className='text-gray-600'>{user.phoneNumber}</p>
                            <p className='text-gray-600 mt-2'>User Id: {user.uid}</p>
                            <p className='bg-blue-500 text-white text-xs font-semibold py-1 px-3 rounded-full mt-2'>
                                {role}
                            </p>
                        </div>
                    </div>
                    <div className='mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2'>
                        <button className='bg-blue-500 text-white px-4 py-2 rounded'>
                            Update Profile
                        </button>
                        {/* {Update Profile Modal} */}

                        <button className='bg-blue-500 text-white px-4 py-2 rounded'>
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
