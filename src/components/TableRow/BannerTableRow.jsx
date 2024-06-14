// Import statements...
import PropTypes from 'prop-types'
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import UpdateBaneerActiveStatus from "../Modal/Banner/UpdateBaneerActiveStatus";

const BannerTableRow = ({ bannerInfo, refetch }) => {

    const [isBannerStatusModalOpen, setIsBannerStatusModalOpen] = useState(false);
    const axiosPublic = useAxiosPublic();

    const { mutateAsync } = useMutation({
        mutationFn: async ({ isActive }) => {
            const { data } = await axiosPublic.patch(
                `/banners/update/${bannerInfo._id}`,
                { isActive }
            );
            return data;
        },
        onSuccess: data => {
            refetch();
            toast.success('Banner isActive Status updated successfully!');
            setIsBannerStatusModalOpen(false);
        },
    });

    const handleBannerStatusUpdate = async selectedStatus => {
        const bannerStatus = { isActive: selectedStatus };
        try {
            await mutateAsync(bannerStatus);
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <tr>
            {/* Table data... */}
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <img
                    alt='profile'
                    src={bannerInfo?.image_url}
                    className='mx-auto object-cover rounded h-10 w-15 '
                />
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{bannerInfo?.banner_name}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{bannerInfo?.banner_title}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{bannerInfo?.banner_description}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{bannerInfo?.coupon_code}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{bannerInfo?.coupon_rate}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                {bannerInfo?.isActive ? (
                    <p
                        className={`${bannerInfo.isActive === true ? 'text-green-500' : 'text-yellow-500'
                            } whitespace-no-wrap`}
                    >
                        Active
                    </p>
                ) : (
                    <p className='text-red-500 whitespace-no-wrap'>Inactive</p>
                )}
            </td>


            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative' onClick={() => setIsBannerStatusModalOpen(true)}>Update Status</span>
                </span>
                {/* Update Banner Modal */}
                <UpdateBaneerActiveStatus
                    isOpen={isBannerStatusModalOpen}
                    setIsOpen={setIsBannerStatusModalOpen}
                    modalHandler={handleBannerStatusUpdate}
                    bannerInfo={bannerInfo}
                />
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Delete</span>
                </span>
                {/* Update User Modal */}
                {/* <BannerModal
                    closeModal={closeModal}
                    isOpen={isOpen}
                /> */}
            </td>
        </tr>
    );
};

BannerTableRow.propTypes = {
    bannerInfo: PropTypes.object,
    refetch: PropTypes.func,
};

export default BannerTableRow;