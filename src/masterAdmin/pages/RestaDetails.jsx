import React, { useEffect, useState } from 'react'
import ItemOne from "../../assets/masterAdmin/restaDetails1.png"
import ItemTwo from "../../assets/masterAdmin/restaDetails2.png"
import ItemThree from "../../assets/masterAdmin/restaDetails3.png"
import ItemFour from "../../assets/masterAdmin/restaDetails4.png"
import PopImg from "../../assets/itemImg/popImg.png"
import { Link } from 'react-router-dom'

const RestaDetails = () => {

    const [toggle, setToggle] = useState(true)
    const [popup, setPopup] = useState(false)
    const [popItem, setPopItem] = useState(false)
    const [active, setActive] = useState(false)

    // useEffect(() => {
    //     document.addEventListener("click", () => {
    //         setPopup(false)
    //         setPopItem(false)
    //     })
    //     return () => {
    //         document.removeEventListener("click", () => {
    //             setPopup(false)
    //             setPopItem(false)
    //         })
    //     }
    // }, [])

    const FoodActiveOrder = [
        { foodImg: ItemOne, restaurantName: "9x9 Restaurant", address: "Tourist lodge, Pravat Sarani, opposite to Bolpur..", id: "#4566", type: "Active", TotalSales: "200" },
        { foodImg: ItemTwo, restaurantName: "Sonajhuri Restaurant", address: "Tourist lodge, Pravat Sarani, opposite to Bolpur..", id: "#9866", type: "Active", TotalSales: "110" },
        { foodImg: ItemThree, restaurantName: "Club Central", address: "Tourist lodge, Pravat Sarani, opposite to Bolpur..", id: "#3366", type: "Active", TotalSales: "80" },
        { foodImg: ItemFour, restaurantName: "Ghore baire restaurant", address: "Tourist lodge, Thailand", id: "#2266", type: "Active", TotalSales: "210" },
    ]
    const FoodInactiveOrder = [
        { foodImg: ItemTwo, restaurantName: "Sonajhuri Restaurant", address: "Tourist lodge, Pravat Sarani, opposite to Bolpur..", id: "#9866", type: "Inactive", TotalSales: "110" },
        { foodImg: ItemThree, restaurantName: "Club Central", address: "Tourist lodge, Pravat Sarani, opposite to Bolpur..", id: "#3366", type: "Inactive", TotalSales: "80" },
        { foodImg: ItemFour, restaurantName: "Ghore baire restaurant", address: "Tourist lodge, Thailand", id: "#2266", type: "Inactive", TotalSales: "210" }
    ]

    return <>
        <div className='bg-slate-100 px-6 pt-10' >
            <div className=''>
                <p
                    className="lg:text-3xl md:text-2xl font-bold text-blue-600">
                    Restaurant Details

                </p>

            </div>

            <div className='bg-white p-6 py-10 mt-8 rounded-lg relative'>
                <div className=' mb-10'>
                    <button type="button" onClick={e => setToggle(true)} class="focus:text-white hover:text-white ring-1 ring-slate-200  focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Active Restaurant</button>
                    <button type="button" onClick={e => setToggle(false)} class="focus:text-white hover:text-white ring-1 ring-slate-200  focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Inactive Restaurant</button>
                </div>

                <div>
                    {
                        toggle
                            ? <>
                                {
                                    FoodActiveOrder && FoodActiveOrder.map((item) => <div className='grid grid-cols-12 mt-6 shadow-lg  p-1 pb-2 rounded-lg'>
                                        <div className='lg:col-span-4 md:col-span-6 col-span-8 '>
                                            <div className='flex items-center gap-4'>
                                                <img src={item.foodImg} className='h-20 mt-2' alt="" />
                                                <div className=''>
                                                    <p className='text-xl  mb-1  text-slate-700'>{item.restaurantName}</p>
                                                    <span>{item.address} </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4  '>
                                            <div class="px-6 py-4">
                                                <p className='text-black font-bold'>{item.id}</p>
                                                ID
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4 '>
                                            <div class="px-6 py-4">
                                                <p className="font-bold text-green-600">
                                                    {item.type}
                                                </p>
                                                Status
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4 md:col-start-4 '>
                                            <div class="md:ps-6 px-6 py-4">
                                                <p className='text-black font-bold text-xl'>
                                                    <i class="bi bi-bar-chart-fill text-blue-600"></i> {item.TotalSales}
                                                </p>
                                                Total sales
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-4 col-span-4 md:col-start-8 '>
                                            <div class="md:ps-6 py-4 mt-3">
                                                <Link to="/foodAdmin/restaDetails/restaDetailsView" class="font-medium  text-blue-600 dark:text-blue-500 hover:underline border-blue-400 border p-1 px-2 rounded-lg"   >
                                                    <i class="bi bi-eye-fill"></i> View Details
                                                </Link>
                                            </div>
                                        </div>

                                    </div>)
                                }

                            </>
                            : <>
                                {
                                    FoodInactiveOrder && FoodInactiveOrder.map((item) => <div className='grid grid-cols-12 mt-6 shadow-lg  p-1 pb-2 rounded-lg'>
                                        <div className='lg:col-span-4 md:col-span-6 col-span-8 '>
                                            <div className='flex items-center gap-4'>
                                                <img src={item.foodImg} className='h-20 mt-2' alt="" />
                                                <div className=''>
                                                    <p className='text-xl  mb-1  text-slate-700'>{item.restaurantName}</p>
                                                    <span>{item.address} </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4  '>
                                            <div class="px-6 py-4">
                                                <p className='text-black font-bold'>{item.id}</p>
                                                ID
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4 '>
                                            <div class="px-6 py-4">
                                                <p className="font-bold text-slate-400">
                                                    {item.type}
                                                </p>
                                                Status
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4 md:col-start-4 '>
                                            <div class="md:ps-6 px-6 py-4">
                                                <p className='text-black font-bold text-xl'>
                                                    <i class="bi bi-bar-chart-fill text-blue-600"></i> {item.TotalSales}
                                                </p>
                                                Total sales
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-4 col-span-4 md:col-start-8 '>
                                            <div class="md:ps-6 py-4 mt-3">
                                                <Link to="/foodAdmin/restaDetails/restaDetailsView" class="font-medium  text-blue-600 dark:text-blue-500 hover:underline border-blue-400 border p-1 px-2 rounded-lg"   >
                                                    <i class="bi bi-eye-fill"></i> View Details
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

export default RestaDetails