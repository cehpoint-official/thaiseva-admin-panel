import React from 'react'
import { Link } from 'react-router-dom'
import ImgOrder from "../../../assets/masterAdmin/orderView.png"
import Customer from "../../../assets/masterAdmin/customer.png"
import Img1 from "../../../assets/masterAdmin/item1.png"
import Img2 from "../../../assets/masterAdmin/item2.png"

const OrderView = () => {

    const orderDetails = [
        {
            ItemsImg: Img1,
            Label: "Biriyani",
            Items: "Chicken Biriyani",
            Qty: "2x",
            Price: "150",
            TotalPrice: "300",
        },
        {
            ItemsImg: Img2,
            Label: "Pizza",
            Items: "Chees Pizza",
            Qty: "3x",
            Price: "150",
            TotalPrice: "450",
        },

    ]

    return <div className='bg-slate-100 px-6 py-10'>
        <div className='flex justify-between'>
            <Link
                to="/manageOrder"
                className="lg:text-3xl text-2xl font-bold text-blue-600">
                <i className="bi bi-arrow-left me-2"></i>
                Back
            </Link>
            <div>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Status -On delivery
                </button>
            </div>
        </div>
        <div className='grid grid-cols-12 gap-5 mt-10'>
            <div className='lg:col-span-4  col-span-12 '>
                <div className='lg:block md:flex block justify-around gap-2'>
                    <div className='bg-white rounded-lg w-full'>
                        <div className='flex gap-4 items-center  p-5'>
                            <img src={ImgOrder} className='md:h-28 md:w-28 h-16 w-16 rounded-lg' alt="" />
                            <div>
                                <p className='text-lg text-slate-600'>From</p>
                                <p className='lg:text-3xl md:text-2xl text-xl font-semibold py-1 text-slate-900'>la pizzario</p>
                                <button className='text-lg bg-blue-100 px-2 mt-2 rounded-lg text-blue-600 underline'>View Details</button>
                            </div>
                        </div>
                        <div className='bg-slate-800 rounded-lg p-5 flex mt-4 gap-3'>
                            <div>
                                <img src={Customer} alt="" />
                            </div>
                            <div className='text-white space-y-1'>
                                <p className='font-medium text-[1.05rem]'>Ordered by - Tithi Mondal</p>
                                <p className='font-medium text-[1.05rem] text-sky-300'>Delivery Location</p>
                                <p className=''>Chon Buri 20150, Thailand</p>
                                <p className='font-medium text-[1.05rem] text-sky-300'>Contact</p>
                                <p className=''>Ph no. - 8787387940</p>
                                <p className=''>Email ID - email@gmail.com</p>
                            </div>

                        </div>
                    </div>
                    <div className='mt-5 md:mt-0 lg:mt-5 rounded-lg bg-white w-full p-5'>
                        <p className='text-2xl font-bold mb-5'>Deliver History</p>
                        <ol className="relative border-s-2 border-green-200 dark:border-gray-700">

                            <li className="mb-6 ms-6">
                                <span className="absolute flex items-center justify-center w-4 h-4 bg-blue-100 rounded-full -start-2 ring-2 mt-2 ring-white dark:ring-gray-900 dark:bg-blue-900">

                                </span>
                                <h3 className="-pt-2 text-lg font-semibold text-gray-900 dark:text-white">Order Delivered</h3>
                                <p className='text-blue-600'>Wait...</p>

                            </li>
                            <li className="mb-6 ms-6 ">
                                <span className="absolute flex items-center justify-center w-4 h-4 bg-green-600 rounded-full -start-2 mt-2 ring-2 ring-green-300 dark:ring-gray-900 dark:bg-blue-900">

                                </span>
                                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">On Delivery</h3>
                                <p className='text-blue-600'>Sun 02 Jan, 2024, 01:24Pm</p>

                            </li>
                            <li className="mb-6 ms-6">
                                <span className="absolute flex items-center justify-center w-4 h-4 bg-green-600 rounded-full -start-2 mt-2 ring-2 ring-white dark:ring-gray-900 dark:bg-blue-900">

                                </span>
                                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Payment success</h3>
                                <p className='text-blue-600'>Sun 02 Jan, 2024, 12:20Pm</p>

                            </li>
                            <li className=" ms-6">
                                <span className="absolute flex items-center justify-center w-4 h-4 bg-green-600 rounded-full -start-2 mt-2 ring-2 ring-white dark:ring-gray-900 dark:bg-blue-900">

                                </span>
                                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Order Created</h3>
                                <p className='text-blue-600'>Sun 02 Jan, 2024, 12:10Pm</p>

                            </li>

                        </ol>


                    </div>
                </div>
            </div>
            <div className='lg:col-span-8 md:col-span-12 p-5 bg-white rounded-lg col-span-12 '>
                <span className='bg-green-100 p-2 px-3 text-2xl rounded-lg text-green-600 font-bold '>Order ID #5552351</span>
                <div className='overflow-hidden overflow-x-scroll  mt-10'>
                    <div className='   md:w-full w-[35rem]  rounded-lg  '>

                        <div className=" bg-white shadow-xl ">
                            <table className=" text-sm text-left rtl:text-right w-full ">
                                <thead className="text-xl">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Items
                                        </th>
                                        <th scope="col" className="px-3  py-3">
                                            Qty
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total Price
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        orderDetails && orderDetails.map((item) => <tr className="  hover:bg-gray-50 ">
                                            <th scope="row" className="px-6 flex gap-3 py-4 font-medium  whitespace-nowrap e">
                                                <img src={item.ItemsImg} alt="" />
                                                <div>
                                                    <p className='text-blue-500'>{item.Label}</p>
                                                    <p className='text-lg'>{item.Items}</p>
                                                </div>
                                            </th>
                                            <td className="px-3  py-4 text-lg font-semibold">
                                                {item.Qty}
                                            </td>
                                            <td className="px-6 py-4 text-lg font-semibold">
                                                <span>&#3647;</span>{item.Price}
                                            </td>
                                            <td className="px-6 py-4 text-lg  font-semibold">
                                                <div>
                                                    <span>&#3647;</span>{item.TotalPrice}
                                                    <i className="bi ms-8 text-xl bi-x-circle"></i>
                                                </div>
                                            </td>

                                        </tr>)
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
}


export default OrderView