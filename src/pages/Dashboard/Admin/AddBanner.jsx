import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import { imageUpload } from "../../../Utils/imageUrl";

const AddBanner = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleBanner = async (e) => {
        e.preventDefault();
        const form = e.target;
        const banner_name = form.banner_name.value;
        const image = form.image.files[0];

        try {
            // Upload the image and get the URL
            const image_url = await imageUpload(image);

            const banner_title = form.banner_title.value;
            const banner_description = form.banner_description.value;
            const coupon_code = form.coupon_code.value;
            const coupon_rate = form.coupon_rate.value;
            const adminInfo = {
                email: user?.email,
                name: user?.displayName,
            };
            const isActive = false;
            const bannerData = {
                banner_name,
                image_url,
                banner_title,
                banner_description,
                coupon_code,
                coupon_rate,
                adminInfo,
                isActive,
            };

            // Post bannerData to backend API
            const { data } = await axiosPublic.post(`/banner`, bannerData);

            // Display success message
            toast.success("Banner added successfully");

            // Navigate to manage-banner page
            navigate('/dashboard/manage-banner');
        } catch (err) {
            console.error("Error adding banner:", err);
            toast.error("Failed to add banner: " + err.message);
        }
    };

    return (
        <div className="my-4 p-1 rounded-md mt-16">
            <Helmet>
                <title>HealthFlow | Add Banner</title>
            </Helmet>
            <div className='py-2 md:py-4 space-y-1'>
                <h1 className='text-center text-lg md:text-2xl font-bold text-blue-600'>Add Banner</h1>
            </div>
            <div className="card shrink-0 my-2 md:my-5 shadow-2xl bg-gray-200 w-full md:w-5/6 mx-auto">
                <form onSubmit={handleBanner} className="card-body p-4">
                    {/* Row 1: Banner Name, Banner Title */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-gray-700">Banner Name<span className="text-red-600">*</span></span>
                            </label>
                            <input type="text" name="banner_name" placeholder="Banner name..." required className="input input-sm input-bordered placeholder-gray-500" />
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-gray-700">Banner Title<span className="text-red-600">*</span></span>
                            </label>
                            <input type="text" name="banner_title" placeholder="Banner title..." required className="input input-sm input-bordered placeholder-gray-500" />
                        </div>
                    </div>

                    {/* Row 2: Banner Description */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-700">Banner Description<span className="text-red-600">*</span></span>
                            </label>
                            <textarea name="banner_description" rows={2} cols={4} className="p-2 rounded-md placeholder-gray-500" placeholder="Description..." required></textarea>
                        </div>
                    </div>

                    {/* Row 3: Image Upload */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-700">Image<span className="text-red-600">*</span></span>
                            </label>
                            <input type="file" name="image" required />
                        </div>
                    </div>

                    {/* Row 4: Coupon Code, Coupon Rate */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-gray-700">Coupon Code<span className="text-red-600">*</span></span>
                            </label>
                            <input type="text" name="coupon_code" placeholder="Coupon Code..." required className="input input-sm input-bordered placeholder-gray-500" />
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-gray-700">Coupon Rate<span className="text-red-600">*</span></span>
                            </label>
                            <input type="number" name="coupon_rate" placeholder="Coupon Rate..." required className="input input-sm input-bordered placeholder-gray-500" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-sm btn-primary">Add Banner</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBanner;
