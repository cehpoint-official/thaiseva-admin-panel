import React, { useState } from 'react'
import RestaImg from "../../../assets/masterAdmin/restaurant.png"
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RestaurantReqDet = () => {

    const handleAccept = () => {
        toast.success("Request Accepted");
    };

    const handleReject = () => {
        toast.error("Request Rejected");
    };



    return <>
        <div className='bg-slate-100 px-8 pt-10'>
            <div className="flex justify-between items-center">
                <Link
                    to="/foodAdmin/restaReuest"
                    className="lg:text-3xl md:text-2xl font-bold text-blue-600">
                    <i class="bi bi-arrow-left me-2"></i>
                    Back
                </Link>

            </div>

            <div className='grid grid-cols-12 bg-white p-6 gap-4 mt-10 rounded-lg'>
                <div className='col-span-12 md:col-span-5 p-2 md:mt-14'>
                    <img src={RestaImg} alt="" />
                </div>
                <div className='col-span-12 md:col-span-7 p-2'>
                    <div className='text-end'>
                        <p className='text-slate-700 font-semibold'>Restaurant ID</p>
                        <p className='text-xl text-blue-700 font-semibold'>RE125678890</p>
                    </div>
                    <p className='mt-2 text-slate-800 text-3xl font-bold'>Club Central</p>
                    <p className='mt-1 text-slate-500 text-sm'>Fast food . Chinese</p>
                    <p className='mt-6 text-slate-800 text-xl font-semibold'>Description</p>
                    <p className='text-slate-500 mt-2 text-lg'>
                        La Pizzario: Authentic Italian flavors served with a dash of elegance. Indulge in our handcrafted pizzas, made from the finest ingredients and baked to perfection. Experience Italy on a plate.
                    </p>

                    <p className='mt-6 text-slate-800 text-xl font-semibold'>Location</p>
                    <p className='text-slate-500 mt-2 text-lg'>Bang Lamung District, Chon Buri 20150, Thailand</p>
                    <div className='grid grid-cols-12 gap-2 mt-6'>
                        <div className='lg:col-span-5 col-span-12 '>
                            <p className=' text-slate-800 text-xl font-semibold'>Phone Number</p>
                            <p className='text-slate-500 mt-1 text-lg'>+66 9667788788</p>
                        </div>
                        <div className='col-span-2 border-s hidden lg:block border-slate-400'></div>
                        <div className='lg:col-span-5 col-span-12'>
                            <p className=' text-slate-800 text-xl font-semibold'>Email ID</p>
                            <p className='text-slate-500 mt-1 text-lg'>email@gmail.com</p>
                        </div>
                    </div>
                    <div className='flex justify-end mt-10 gap-4'>
                        <ToastContainer />
                        <button
                            onClick={handleReject}
                            className='bg-gray-400 px-3 p-2 text-lg text-white font-semibold rounded-lg'>Reject  Request</button>
                        <button
                            onClick={handleAccept}
                            className='bg-blue-700 px-3 p-2 text-lg text-white font-semibold rounded-lg'>Accept  Request</button>
                    </div>
                </div>
            </div>


        </div>
    </>
}


export default RestaurantReqDet