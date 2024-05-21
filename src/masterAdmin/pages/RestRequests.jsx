import React, { useEffect, useState } from 'react'
import RestaOne from "../../assets/masterAdmin/restReuqest1.png"
import ItemTwo from "../../assets/itemImg/item2.png"
import PopImg from "../../assets/itemImg/popImg.png"
import { Link } from 'react-router-dom'

const RestRequests = () => {

    const [toggle, setToggle] = useState(true)


    const FoodActiveOrder = [
        { restaImg: RestaOne, restaName: "Club Central", address: "Tourist lodge, Pravat Sarani, opposite to Bolpur..", id: "#4566", date: "02 Jan,2024", Email: "admin@gmail.com" },
        { restaImg: ItemTwo, restaName: " Cake", address: "Tourist lodge, Pravat Sarani, opposite to Bolpur..", id: "#9866", date: "03 Jan,2024", Email: "admin@gmail.com" },

    ]
    const FoodInactiveOrder = [
        { restaImg: RestaOne, restaName: "Neapolitan Chicken", address: "Tourist lodge, Pravat Sarani, opposite to Bolpur..", id: "#3366", date: "02 Jan,2024", Email: "admin@gmail.com" },
    ]

    return <>
        <div className='bg-slate-100 px-6  pt-10 pb-20' >
            <div className=''>
                <p
                    className="lg:text-3xl md:text-2xl font-bold text-blue-600">
                    {/* <i class="bi bi-arrow-left me-2"></i> */}
                    Restaurant Requests
                </p>
            </div>

            <div className='bg-white p-4 py-10 mt-10 rounded-lg relative'>
                <div className=' mb-10'>
                    <button type="button" onClick={e => setToggle(true)} class="focus:text-white hover:text-white ring-1 ring-slate-100  focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Restaurants Requests</button>
                    <button type="button" onClick={e => setToggle(false)} class="focus:text-white hover:text-white ring-1 ring-slate-100  focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Rejected Restaurants</button>
                </div>

                <div >
                    {
                        toggle
                            ? <>
                                {
                                    FoodActiveOrder && FoodActiveOrder.map((item) => <div className='grid grid-cols-12 mt-6 shadow-xl  p-1 py-2 rounded-lg'>
                                        <div className='lg:col-span-4 md:col-span-6 col-span-8 '>
                                            <div className='flex items-center gap-4'>
                                                <img src={item.restaImg} className='h-20' alt="" />
                                                <div className=''>
                                                    <p className='text-xl  mb-1 text-slate-700'>{item.restaName}</p>

                                                    <span className='text-sm'>{item.address} </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-1 md:col-span-3 col-span-4  '>
                                            <div class="px-6 py-4">
                                                <p className='text-black text-sm font-bold'>{item.id}</p>
                                                ID
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4 '>
                                            <div class="px-6 py-4">
                                                <p className="font-bold text-sm">
                                                    {item.date}
                                                </p>
                                                Date
                                            </div>
                                        </div>
                                        <div className='lg:col-span-3 md:col-span-3  col-span-4   '>
                                            <div class="md:ps-6 lg:px-6 py-4">
                                                <p className='text-black font-bold text-sm'>
                                                    {item.Email}
                                                </p>
                                                Email
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-4  col-span-4 md:col-start-10 '>
                                            <div class=" py-4 mt-3">
                                                <Link to="/foodAdmin/restaReuest/restaurantReqDet" class="font-medium  text-blue-600 dark:text-blue-500 hover:underline border-blue-400 border p-1 px-2 rounded-lg"   >
                                                    <i class="bi bi-eye-fill"></i>View Details
                                                </Link>
                                            </div>
                                        </div>

                                    </div>)
                                }

                            </>
                            : <>
                                {
                                    FoodInactiveOrder && FoodInactiveOrder.map((item) => <div className='grid grid-cols-12 mt-6 shadow-xl  p-1 py-2 rounded-lg'>
                                        <div className='lg:col-span-4 md:col-span-6 col-span-8 '>
                                            <div className='flex items-center gap-4'>
                                                <img src={item.restaImg} className='h-20' alt="" />
                                                <div className=''>
                                                    <p className='text-xl  mb-1 text-slate-700'>{item.restaName}</p>

                                                    <span className='text-sm'>{item.address} </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-1 md:col-span-3 col-span-4  '>
                                            <div class="px-6 py-4">
                                                <p className='text-black text-sm font-bold'>{item.id}</p>
                                                ID
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4 '>
                                            <div class="px-6 py-4">
                                                <p className="font-bold text-sm">
                                                    {item.date}
                                                </p>
                                                Date
                                            </div>
                                        </div>
                                        <div className='lg:col-span-3 md:col-span-4  col-span-4   '>
                                            <div class="md:ps-6 px-6 py-4">
                                                <p className='text-black font-bold text-sm'>
                                                    {item.Email}
                                                </p>
                                                Email
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-4   col-span-4  md:col-start-10 '>
                                            <div class="md:ps-6 py-4 mt-3">
                                                <Link to="/foodAdmin/restaReuest/restaurantReqDet" class="font-medium  text-blue-600 dark:text-blue-500 hover:underline border-blue-400 border p-1 px-2 rounded-lg"   >
                                                    <i class="bi bi-eye-fill"></i>View Details
                                                </Link>
                                            </div>
                                        </div>

                                    </div>)
                                }

                            </>
                    }
                </div>

            </div>
        </div>
    </>
}

export default RestRequests