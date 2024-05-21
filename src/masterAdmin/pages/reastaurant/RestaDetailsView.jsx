import React, { useEffect, useRef, useState } from 'react'
import RestaImg from "../../../assets/masterAdmin/restaurant.png"
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactApexChart from 'react-apexcharts';

const RestaDetailsView = () => {

    const [toggle, setToggle] = useState(false)
    const [active, setActive] = useState(false)

    const parentRef = useRef(); // Ref to the parent element

    const handleClickOutside = event => {
        if (parentRef.current && !parentRef.current.contains(event.target)) {
            setToggle(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const [options] = useState({
        chart: {
            height: 350,
            type: 'area',
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            categories: [
                "2024-01-01T00:00:00.000Z", "2024-02-01T00:00:00.000Z",
                "2024-03-01T00:00:00.000Z", "2024-04-01T00:00:00.000Z",
                "2024-05-01T00:00:00.000Z", "2024-06-01T00:00:00.000Z",
                "2024-07-01T00:00:00.000Z", "2024-08-01T00:00:00.000Z",
                "2024-09-01T00:00:00.000Z", "2024-10-01T00:00:00.000Z",
                "2024-11-01T00:00:00.000Z", "2024-12-01T00:00:00.000Z"
            ],
        },
        tooltip: {
            x: {
                format: 'MMM yyyy',
            },
        },
    });

    const [series] = useState([{
        name: 'Earning from platform',
        data: [190, 200, 150, 180, 250, 200, 170, 150, 200, 180, 250, 200],  // 12 data points for each month
    }]);


    return <>
        <div className='bg-slate-100 px-6 pt-10'>
            <div className="flex justify-between items-center">
                <Link
                    to="/foodAdmin/restaDetails"
                    className="lg:text-3xl md:text-2xl font-bold text-blue-600">
                    <i class="bi bi-arrow-left me-2"></i>
                    Back
                </Link>
                <div ref={parentRef} className='relative'>
                    <i onClick={e => {
                        e.stopPropagation()
                        setToggle(!toggle)
                    }
                    } class="bi bi-three-dots-vertical cursor-pointer bg-white px-3 py-2 rounded-full text-2xl"></i>
                    <div onMouseLeave={e => setToggle(false)} className={`absolute w-48 right-0 top-12 p-6 bg-white border shadow-lg rounded-lg ${!toggle ? "hidden" : "block"} `}>
                        <p className='py-2 text-slate-800 font-semibold'>View all Menus</p>
                        <p className='py-2 text-slate-800 font-semibold'>View Sales  Record</p>
                        <p className='py-2 text-slate-800 font-semibold'>Edit Restaurant</p>
                        <p onClick={e => setActive(!active)} className='py-2 cursor-pointer text-slate-800 font-semibold'>Mark as {active ? "Active" : "Inactive"} </p>
                    </div>
                </div>


            </div>

            <div className='mt-10 rounded-lg bg-white p-6'>

                <div className='grid grid-cols-12   gap-4 '>
                    <div className='col-span-12 md:col-span-5 p-2 md:mt-14'>
                        <img src={RestaImg} alt="" />
                    </div>
                    <div className='col-span-12 md:col-span-7 p-2'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <span class="bg-green-100 text-green-800  font-medium me-2 px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-300">Active</span>
                            </div>
                            <div>
                                <p className='text-slate-700 font-semibold'>Restaurant ID</p>
                                <p className='text-xl text-blue-700 font-semibold'>RE125678890</p>
                            </div>
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

                    </div>
                </div>

                <div className='mt-20 pt-16 border-t-2 flex justify-between items-center'>
                    <div className=''>
                        <span className='text-xl font-semibold'>Total sales</span>
                        <span className='ms-4 py-2 px-4 bg-blue-100 border border-blue-400 rounded-lg font-semibold text-blue-600'>View Sales record</span>
                    </div>
                    <div className="flex justify-between text-blue-600 border border-blue-600 rounded-lg items-center p-2 gap-4 bg-blue-100">
                        <i class="bi bi-calendar4 text-xl"></i>
                        <div >
                            <p className="text-xl">Time period</p>

                            <div class="md:flex gap-1 text-sm">
                                <input
                                    className='bg-blue-100'
                                    type="date"
                                    placeholder="Select date"
                                />
                                <p>to</p>
                                <input
                                    className='bg-blue-100'
                                    type="date"
                                    placeholder="Select date"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-16 mx-10' id="chart">
                    <ReactApexChart options={options} series={series} type="area" height={350} />
                    <p className='flex justify-center items-center gap-3'><div className='bg-blue-500 h-4 w-4 rounded-sm'></div> Total sales</p>
                </div>

            </div>


        </div >
    </>
}



export default RestaDetailsView