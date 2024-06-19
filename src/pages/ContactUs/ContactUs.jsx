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
                <title>HealthFlow | Contact Us</title>
            </Helmet>
            <div className="container mx-auto p-4">
                <h1 className='bg-buttonBg py-2 md:py-3 text-center text-base sm:text-lg font-bold text-background-white rounded-md'>Contact Us</h1>
                <div className='flex flex-col md:flex-row md:items-start my-4 gap-5'>
                    <div className='w-full md:w-1/2 border bg-background-white md:p-6 p-4 rounded-md shadow-custom'>
                        <h1 className='font-bold text-heading mb-4'>Get In Touch</h1>
                        <form className="space-y-4">
                            <div className='flex flex-col md:flex-row gap-2'>
                                <div className="form-control w-full md:w-1/2">
                                    <label className="label">
                                        <span className="label-text font-bold text-paragraph">First Name</span>
                                    </label>
                                    <input type="text" placeholder="First Name" className="input input-bordered input-sm text-xs" />
                                </div>
                                <div className="form-control w-full md:w-1/2">
                                    <label className="label">
                                        <span className="label-text font-bold text-paragraph">Last Name</span>
                                    </label>
                                    <input type="text" placeholder="Last Name" className="input input-bordered input-sm text-xs" />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-paragraph">Email</span>
                                </label>
                                <input type="email" placeholder="Input your email..." className="input input-bordered input-sm text-xs" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-paragraph">Subject</span>
                                </label>
                                <input type="text" className="input input-bordered input-sm text-xs" placeholder='Write your subject' />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-paragraph">Message</span>
                                </label>
                                <textarea cols={5} rows={4} className='border outline-none p-1 text-xs rounded-xl' placeholder='Write your message'></textarea>
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary btn-sm bg-buttonBg hover:bg-blue-700 text-buttonText">Send</button>
                            </div>
                        </form>
                    </div>

                    <div className='flex flex-col w-full'>
                        <div className='mb-5 border p-4 space-y-4 bg-background-white rounded-md shadow-custom'>
                            <h1 className='font-bold text-heading text-base md:text-lg'>Contact Details</h1>
                            <div className='flex items-start gap-3'>
                                <CiLocationOn className='text-subheading text-xl' />
                                <div className='w-5/6'>
                                    <p className='font-bold text-xs md:text-base text-paragraph'>Location</p>
                                    <address className='text-xs md:text-sm text-paragraph'>
                                        198 West 21th street, Suit 721 USA NY-10016
                                    </address>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <FaPhoneAlt className='text-subheading text-lg' />
                                <div className='w-5/6'>
                                    <p className='font-bold text-xs md:text-base text-paragraph'>Call Us</p>
                                    <span className='text-xs md:text-sm text-paragraph'> +1234 5678 90</span>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <MdEmail className='text-subheading text-xl' />
                                <div className='w-5/6'>
                                    <p className='font-bold text-xs md:text-base text-paragraph'>Email Us</p>
                                    <span className='text-xs md:text-sm text-paragraph'>hospitalityhub@info.com</span>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <CgWebsite className='text-subheading text-xl' />
                                <div className='w-5/6'>
                                    <p className='font-bold text-xs md:text-base text-paragraph'>Visit our Website</p>
                                    <span className='text-xs md:text-sm text-paragraph'>www.hospitalityhub.com</span>
                                </div>
                            </div>
                        </div>
                        <div className='border p-4 bg-background-white rounded-md shadow-custom'>
                            <h1 className='text-base md:text-lg font-bold text-heading'>Find Us</h1>
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
            </div>
        </>
    );
};

export default ContactUs;
