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
            console.log(image_url);

            const banner_title = form.banner_title.value;
            const banner_description = form.banner_description.value;
            const coupon_code = form.coupon_code.value;
            const coupon_rate = form.coupon_rate.value;
            const adminInfo = {
                email: user?.email,
                name: user?.displayName,
            };
            const isActive = 'false';
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
            console.table(bannerData);

            const { data } = await axiosPublic.post(`/banner`, bannerData);
            console.log(data);
            toast.success("Banner added successfully");
            navigate('manage-banner');
        } catch (err) {
            console.log(err);
            toast.error("Failed to add banner");
        }
    };

    return (
        <div className="my-4 p-1 rounded-md mt-16">
            <Helmet>
                <title>CareOX | Add Banner</title>
            </Helmet>
            <div className='py-2 md:py-4 space-y-1'>
                <h1 className='text-center text-lg md:text-2xl font-bold text-[#a95757]'>Add Banner</h1>
                <p className="text-xs md:text-md text-center w-full md:w-2/3 md:mx-auto text-[#8f8484]">
                    If you're ready to make a difference and join our team, please send a resume and brief cover letter outlining your interest in the position to [contact email or phone number]. We look forward to hearing from you!
                </p>
            </div>
            <div className="card shrink-0 my-2 md:my-5 shadow-2xl bg-[#d2d7d7e6] w-full md:w-5/6 mx-auto">
                <form onSubmit={handleBanner} className="card-body p-4">
                    {/* row-1 */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Banner Name<span className="text-red-600">*</span></span>
                            </label>
                            <input type="text" name="banner_name" placeholder="name..." required className="input input-sm input-bordered placeholder:text-xs" />
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Banner Title<span className="text-red-600">*</span></span>
                            </label>
                            <input type="text" name="banner_title" placeholder="Banner title..." required className="input input-sm input-bordered placeholder:text-xs" />
                        </div>
                    </div>
                    {/* Row 2 */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Banner Description<span className="text-red-600">*</span></span>
                            </label>
                            <textarea name="banner_description" rows={2} cols={4} className="p-2 rounded-md placeholder:text-xs" placeholder="Description..." required></textarea>
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Image<span className="text-red-600">*</span></span>
                            </label>
                            <input type="file" name="image" required />
                        </div>
                    </div>

                    {/* Row 4 */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Coupon Code<span className="text-red-600">*</span></span>
                            </label>
                            <input type="text" name="coupon_code" placeholder="Coupon Code..." required className="input input-sm input-bordered placeholder:text-xs" />
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Coupon Rate<span className="text-red-600">*</span></span>
                            </label>
                            <input type="number" name="coupon_rate" placeholder="Coupon Rate..." required className="input input-sm input-bordered placeholder:text-xs" />
                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-sm btn-primary">Add Banner</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBanner;
