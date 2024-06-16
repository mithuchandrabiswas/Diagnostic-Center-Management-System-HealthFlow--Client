import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useState } from 'react';
import UpdateUserModal from '../../../components/Modal/User/UpdateUserProfile';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const MyProfile = () => {
    const { user, loading } = useAuth();
    const [role, isLoading] = useRole();
    const axiosPublic = useAxiosPublic();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {data: userInfo = {}} = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/user/${user.email}`)
            return data
        }
    })

    console.log(userInfo);

    const { mutateAsync, isError, error } = useMutation({
        mutationFn: async ({ role, status }) => {
            const { data } = await axiosPublic.patch(
                `/users/update/${user?.email}`,
                { role, status }
            );
            return data;
        },
        onSuccess: () => {
            toast.success('User information updated successfully!');
            setIsModalOpen(false);
        },
        onError: (error) => {
            toast.error(`Update failed: ${error.message}`);
        }
    });

    const handleProfileUpdate = async (selectedStatus) => {
        try {
            await mutateAsync({ role: user.role, status: selectedStatus });
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (loading || isLoading) return <LoadingSpinner />;

    const { displayName, email, photoURL, phoneNumber, uid } = user;

    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100 p-4'>
            <Helmet>
                <title>My Profile</title>
            </Helmet>
            <div className='w-full max-w-4xl bg-white shadow-lg rounded-lg p-6'>
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    <div className='flex flex-col items-center md:flex-row md:items-start space-x-0 md:space-x-4'>
                        <img
                            alt='profile'
                            src={photoURL}
                            className='object-cover rounded-full h-24 w-24 border-4 border-white'
                        />
                        <div className='text-center md:text-left mt-4 md:mt-0'>
                            <h2 className='text-2xl font-bold'>{displayName}</h2>
                            <p className='text-gray-600'>{email}</p>
                            <p className='text-gray-600'>{phoneNumber}</p>
                            <p className='text-gray-600 mt-2'>User Id: {uid}</p>
                            {role && (
                                <p className='bg-blue-500 text-white text-xs font-semibold py-1 px-3 rounded-full mt-2'>
                                    {role}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2'>
                        <button
                            className='bg-blue-500 text-white px-4 py-2 rounded'
                            onClick={() => setIsModalOpen(true)}
                        >
                            Update Profile
                        </button>
                        
                        <UpdateUserModal
                            isOpen={isModalOpen}
                            setIsOpen={setIsModalOpen}
                            modalHandler={handleProfileUpdate}
                            userInfo={userInfo}
                        />
                    </div>
                </div>
                {isError && (
                    <p className='text-red-500 text-center mt-4'>
                        {error.message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
