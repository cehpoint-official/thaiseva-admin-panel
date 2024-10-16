import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import ImgOrder from "../../../assets/masterAdmin/orderView.png";
import Customer from "../../../assets/masterAdmin/customer.png";

const OrdersDetView = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const itemidParam = useParams();
    const itemId = decodeURIComponent(itemidParam["orderId"]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderDoc = doc(db, 'orders', itemId);
                const orderSnapshot = await getDoc(orderDoc);

                if (orderSnapshot.exists()) {
                    setOrderDetails(orderSnapshot.data());
                } else {
                    console.log("No such order!");
                }
            } catch (error) {
                console.error("Error fetching order: ", error);
            }
        };

        fetchOrder();
    }, [itemId]);

    if (!orderDetails) return <div>Loading...</div>;

    return (
        <div className='bg-slate-100 px-6 py-10'>
            <div className='grid grid-cols-12 gap-5 mt-10'>
                <div className='lg:col-span-4 col-span-12 '>
                    <div className='lg:block md:flex block justify-around gap-2'>
                        <div className='bg-white rounded-lg w-full'>
                            <div className='flex gap-4 items-center p-5'>
                                <img src={ImgOrder} className='md:h-28 md:w-28 h-16 w-16 rounded-lg' alt="" />
                                <div>
                                    <p className='text-lg text-slate-600'>From</p>
                                    <p className='lg:text-3xl md:text-2xl text-xl font-semibold py-1 text-slate-900'>
                                        {orderDetails.RestaurantName || 'N/A'}
                                    </p>
                                    <button className='text-lg bg-blue-100 px-2 mt-2 rounded-lg text-blue-600 underline'>View Details</button>
                                </div>
                            </div>
                            <div className='bg-slate-800 rounded-lg p-5 flex mt-4 gap-3'>
                                <div>
                                    <img src={Customer} alt="" />
                                </div>
                                <div className='text-white space-y-1'>
                                    <p className='font-medium text-[1.05rem]'>Ordered by - {orderDetails.CustomerName || 'N/A'}</p>
                                    <p className='font-medium text-[1.05rem] text-sky-300'>Delivery Location</p>
                                    <p>{orderDetails.Location || 'N/A'}</p>
                                    <p className='font-medium text-[1.05rem] text-sky-300'>Contact</p>
                                    <p>Ph no. - {orderDetails.PhoneNumber || 'N/A'}</p>
                                    <p>Email ID - {orderDetails.Email || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                        {/* Delivery history section can go here */}
                    </div>
                </div>
                <div className='lg:col-span-8 md:col-span-12 p-5 bg-white rounded-lg col-span-12'>
                    <span className='bg-green-100 p-2 px-3 text-2xl rounded-lg text-green-600 font-bold'>Order ID #{orderDetails.OrderId || 'N/A'}</span>
                    <div className='overflow-hidden overflow-x-scroll mt-10'>
                        <div className='md:w-full w-[35rem] rounded-lg'>
                            <div className="bg-white shadow-xl">
                                <table className="text-sm text-left rtl:text-right w-full">
                                    <thead className="text-xl">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Items</th>
                                            <th scope="col" className="px-3 py-3">Qty</th>
                                            <th scope="col" className="px-6 py-3">Price</th>
                                            <th scope="col" className="px-6 py-3">Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetails.Items && orderDetails.Items.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <th scope="row" className="px-6 flex gap-3 py-4 font-medium whitespace-nowrap">
                                                    <img src={item.ItemImg || ''} alt="" />
                                                    <div>
                                                        <p className='text-blue-500'>{item.ItemName || 'N/A'}</p>
                                                        <p className='text-lg'>{item.Type || 'N/A'}</p>
                                                    </div>
                                                </th>
                                                <td className="px-3 py-4 text-lg font-semibold">{item.Quantity || 'N/A'}</td>
                                                <td className="px-6 py-4 text-lg font-semibold"><span>&#3647;</span>{item.Price || 'N/A'}</td>
                                                <td className="px-6 py-4 text-lg font-semibold">
                                                    <div>
                                                        <span>&#3647;</span>{(item.Price * item.Quantity) || 'N/A'}
                                                        <i className="bi ms-8 text-xl bi-x-circle"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersDetView;
