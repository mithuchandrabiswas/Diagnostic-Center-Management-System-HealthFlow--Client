import { useState } from 'react';
import { CgWebsite } from 'react-icons/cg';
import { CiLocationOn } from 'react-icons/ci';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Helmet } from 'react-helmet-async';

const ContactUs = () => {
    const [position, setPosition] = useState([40.744268, -73.988928]);

    return (
        <>
            <Helmet>
                <title>HospitalityHub | Contact Us</title>
            </Helmet>
            <h1 className='bg-gray-400 py-2 md:py-3 text-center text-base sm:text-lg font-bold rounded-md'>Contact Us</h1>
            <div className='flex md:items-center flex-col md:flex-row my-4 gap-5'>
                <div className='w-full md:w-1/2 border bg-cyan-100 md:p-4 rounded-md'>
                    <h1 className='px-2 pt-4 md:px-4 font-bold text-red-500'>Get In Touch</h1>
                    <form className="px-2 md:px-4">
                        <div className='flex flex-col md:flex-row gap-2'>
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text font-bold">First Name</span>
                                </label>
                                <input type="text" placeholder="first name" className="input input-bordered input-sm text-xs" />
                            </div>
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text font-bold">Last Name</span>
                                </label>
                                <input type="text" placeholder="last name" className="input input-bordered input-sm text-xs" />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Email</span>
                            </label>
                            <input type="email" placeholder="Input your email..." className="input input-bordered input-sm text-xs" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Subject</span>
                            </label>
                            <input type="text" className="input input-bordered input-sm text-xs" placeholder='Write your subject' />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text font-bold">Message</span>
                            </label>
                            <textarea cols={5} rows={4} className='border outline-none p-1 text-xs rounded-xl' placeholder='Write your message'></textarea>

                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary btn-sm">Send</button>
                        </div>
                    </form>
                </div>

                <div className='flex flex-col w-full'>
                    <div className='mb-5 border p-1 sm:p-2 space-y-2'>
                        <h1 className='pt-4 font-bold text-red-400 text-base md:text-lg'>Contact Details</h1>
                        <div className='flex items-center gap-3'>
                            <CiLocationOn className='text-orange-600 text-xl'></CiLocationOn>
                            <div className='w-5/6'>
                                <p className='font-bold text-xs md:text-base'>Location</p>
                                <address className='text-xs md:text-sm'>
                                    198 West 21th street, Suit 721 USA NY-10016
                                </address>
                            </div>
                        </div>

                        <div className='flex items-center gap-3'>
                            <FaPhoneAlt className='text-orange-600 text-lg'></FaPhoneAlt>
                            <div className='w-5/6'>
                                <p className='font-bold text-xs md:text-base'>Call Us</p>
                                <span className='text-xs md:text-sm'> +1234 5678 90</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-3'>
                            <MdEmail className='text-orange-600 text-xl w-5 h-5'></MdEmail>
                            <div className='w-5/6'>
                                <p className='font-bold text-xs md:text-base'>Email Us</p>
                                <span className='text-xs md:text-sm'>hospitalityhub@info.com</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-3'>
                            <CgWebsite className='text-orange-600 text-xl w-5 h-5'></CgWebsite>
                            <div className='w-5/6'>
                                <p className='font-bold text-xs md:text-base'>Visit our Website</p>
                                <span className='text-xs md:text-sm'>www.huspitalityhub.com</span>
                            </div>
                        </div>

                    </div>
                    {/* React leaflet */}
                    <div className='border p-1 md:-2'>
                        <h1 className='text-base md:text-lg font-bold text-red-500'>Find Us</h1>
                        <div className='overflow-hidden'>
                            <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>
                                        198 West 21th street, Suit 721 USA NY-10016
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
};

export default ContactUs;