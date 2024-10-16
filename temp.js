import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../../../firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import ImgOrder from "../../../assets/masterAdmin/orderView.png";
import Customer from "../../../assets/masterAdmin/customer.png";

const OrdersDetView = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderIds, setOrderIds] = useState([]);

    useEffect(() => {
        const fetchOrderIds = async () => {
            try {
                const ordersCollection = collection(db, 'orders');
                const orderSnapshots = await getDocs(ordersCollection);
                
                // Extracting order IDs from the fetched documents
                const ids = orderSnapshots.docs.map(orderDoc => orderDoc.id);
                
                setOrderIds(ids); // Setting the order IDs to state
                console.log(ids)
            } catch (error) {
                console.error("Error fetching order IDs: ", error);
            }
        };

        fetchOrderIds();
    }, []);

    if (!orderDetails) return <div>Loading...</div>;

    return (
        <div className='bg-slate-100 px-6 py-10'>
            {/* ... (previous code remains the same) ... */}
            
            <div className='grid grid-cols-12 gap-5 mt-10'>
                <div className='lg:col-span-4 col-span-12 '>
                    <div className='lg:block md:flex block justify-around gap-2'>
                        <div className='bg-white rounded-lg w-full'>
                            <div className='flex gap-4 items-center  p-5'>
                                <img src={ImgOrder} className='md:h-28 md:w-28 h-16 w-16 rounded-lg' alt="" />
                                <div>
                                    <p className='text-lg text-slate-600'>From</p>
                                    <p className='lg:text-3xl md:text-2xl text-xl font-semibold py-1 text-slate-900'>{orderDetails.restaurantName}</p>
                                    <button className='text-lg bg-blue-100 px-2 mt-2 rounded-lg text-blue-600 underline'>View Details</button>
                                </div>
                            </div>
                            <div className='bg-slate-800 rounded-lg p-5 flex mt-4 gap-3'>
                                <div>
                                    <img src={Customer} alt="" />
                                </div>
                                <div className='text-white space-y-1'>
                                    <p className='font-medium text-[1.05rem]'>Ordered by - {orderDetails.name}</p>
                                    <p className='font-medium text-[1.05rem] text-sky-300'>Delivery Location</p>
                                    <p className=''>{orderDetails.deliveryAddress}</p>
                                    <p className='font-medium text-[1.05rem] text-sky-300'>Contact</p>
                                    <p className=''>Ph no. - {orderDetails.phoneNumber}</p>
                                    <p className=''>Email ID - {orderDetails.email}</p>
                                </div>
                            </div>
                        </div>
                        {/* ... (delivery history section remains the same) ... */}
                    </div>
                </div>
                <div className='lg:col-span-8 md:col-span-12 p-5 bg-white rounded-lg col-span-12 '>
                    <span className='bg-green-100 p-2 px-3 text-2xl rounded-lg text-green-600 font-bold '>Order ID #{OrdersDetView.OrderId}</span>
                    <div className='overflow-hidden overflow-x-scroll  mt-10'>
                        <div className='md:w-full w-[35rem] rounded-lg'>
                            <div className="bg-white shadow-xl">
                                <table className="text-sm text-left rtl:text-right w-full">
                                    <thead className="text-xl">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Items</th>
                                            <th scope="col" className="px-3  py-3">Qty</th>
                                            <th scope="col" className="px-6 py-3">Price</th>
                                            <th scope="col" className="px-6 py-3">Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetails.items && orderDetails.items.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <th scope="row" className="px-6 flex gap-3 py-4 font-medium whitespace-nowrap">
                                                    <img src={item.itemImg} alt="" />
                                                    <div>
                                                        <p className='text-blue-500'>{item.label}</p>
                                                        <p className='text-lg'>{item.name}</p>
                                                    </div>
                                                </th>
                                                <td className="px-3  py-4 text-lg font-semibold">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-6 py-4 text-lg font-semibold">
                                                    <span>&#3647;</span>{item.price}
                                                </td>
                                                <td className="px-6 py-4 text-lg  font-semibold">
                                                    <div>
                                                        <span>&#3647;</span>{item.totalPrice}
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