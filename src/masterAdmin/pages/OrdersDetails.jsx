import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const OrdersDetails = () => {

    const [toggles, setToggles] = useState(false)

    const orderDetails = [
        {
            RestaurantName: "Siam Deligh",
            OrderID: "#68780",
            Date: "02 Jan, 2024",
            CustomerName: "Tithi Mondal",
            Location: "Chon Buri 20150, Thailand",
            Amount: "177.60",
            Status: "New Order",
        },
        {
            RestaurantName: "Bangkok Bistro",
            OrderID: "#99780",
            Date: "09 Jan, 2024",
            CustomerName: "Tithi Mondal",
            Location: "Chon Buri 20150, Thailand",
            Amount: "437.10",
            Status: "New Order",
        },
        {
            RestaurantName: "Thai Spice",
            OrderID: "#22780",
            Date: "04 Jan, 2024",
            CustomerName: "Mery Marlo",
            Location: "Chon Buri 20150, Thailand",
            Amount: "217.60",
            Status: "On delivery",
        },
        {
            RestaurantName: "Golden Orchid",
            OrderID: "#68780",
            Date: "07 Feb, 2024",
            CustomerName: "Ross Rock",
            Location: "Chon Buri 20150, Thailand",
            Amount: "377.60",
            Status: "Cancelled",
        },
        {
            RestaurantName: "Chaiyo Thai Kitchen",
            OrderID: "#44280",
            Date: "01 Feb, 2024",
            CustomerName: "John Deu",
            Location: "Chon Buri 20150, Thailand",
            Amount: "188.20",
            Status: "Delivered",
        },
    ]


    return <div className='bg-slate-100 px-6 py-10'>
        <div className="flex justify-between items-center">
            <p
                className="lg:text-3xl md:text-2xl font-bold text-blue-600">
                Order Details
            </p>
            <div className='relative'>
                <div onClick={e => setToggles(!toggles)} className='flex  gap-1 px-2 border border-blue-400 p-1 rounded-lg font-semibold'>
                    <i class="bi bi-filter-left text-blue-600 text-xl"></i>
                    <p className='text-blue-600'>Sort by</p>
                </div>

                <div onMouseLeave={e => setToggles(false)} className={`absolute w-48 right-0 top-12 p-6 bg-white border shadow-lg rounded-lg ${!toggles ? "hidden" : "block"} `}>
                    <p className='py-2 text-slate-800 font-semibold'>
                        sort by  A-Z
                    </p>
                    <p className='py-2 text-slate-800 font-semibold'>
                        sort by  Z-A
                    </p>
                    <p className='py-2 text-slate-800 font-semibold'>
                        sort by  New First
                    </p>
                    <p className='py-2 cursor-pointer text-slate-800 font-semibold'>
                        sort by  Old First
                    </p>
                </div>
            </div>
        </div>

        <div className='flex justify-around mt-8'>
            <div className='overflow-x-scroll w-[35rem] lg:w-full bg-white  rounded-lg  '>

                <div class=" ">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                            <tr>

                                <th scope="col" class="px-6 py-3">
                                    Restaurant Name
                                </th>
                                <th scope="col" class="px-3  py-3">
                                    Order ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Customer Name
                                </th>
                                <th scope="col" class="px-2 py-3 ">
                                    Location
                                </th>
                                <th scope="col" class="px-3  py-3">
                                    Amount
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-8  py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                orderDetails && orderDetails.map((item) => <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.RestaurantName}
                                    </th>
                                    <td class="px-3  py-4">
                                        {item.OrderID}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.Date}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.CustomerName}
                                    </td>
                                    <td class="px-2 py-4">
                                        {item.Location}
                                    </td>
                                    <td class="px-3 py-4">
                                        <span>&#3647;</span>
                                        {item.Amount}
                                    </td>
                                    <td class="px-1 py-4">
                                        <div>
                                            <p className={`border p-1 text-center rounded-md     ${item.Status === "New Order" ? "border-blue-600 text-blue-600" : ""} 
                                     ${item.Status === "On delivery" ? "border-yellow-500 text-yellow-500" : ""} 
                                     ${item.Status === "Cancelled" ? "border-red-600 text-red-600" : ""} 
                                     ${item.Status === "Delivered" ? "border-green-600 text-green-600" : ""} 
                                    `}>
                                                {item.Status}
                                            </p>
                                        </div>
                                    </td>
                                    <td class=" px-1 py-4  ">
                                        <Link
                                            to="/foodAdmin/ordersDetails/ordersDetView"
                                            class=" text-white bg-blue-600 border  p-1 px-2 rounded-lg"   >
                                            {/* <i class="bi bi-eye-fill pe-1  text-white"></i> */}
                                            View Order
                                        </Link>

                                    </td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    </div >
}

export default OrdersDetails