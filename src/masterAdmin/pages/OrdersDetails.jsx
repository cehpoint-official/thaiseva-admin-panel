import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../../firebaseConfig';

const OrdersDetails = () => {
    const [toggles, setToggles] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const ordersRef = collection(db, 'orders');
                const snapshot = await getDocs(ordersRef);

                if (!snapshot.empty) {
                    const ordersList = snapshot.docs.map(doc => ({
                        OrderID: doc.id, // document ID as OrderID
                        ...doc.data(),   // spread the rest of the order details
                    }));

                    setOrderDetails(ordersList);
                } else {
                    setError("No orders found.");
                }
            } catch (error) {
                console.error("Error fetching orders: ", error);
                setError("Failed to fetch orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const getValueOrNA = (value) => value || 'N/A';

    return (
        <div className='bg-slate-100 px-6 py-10 w-full'>
            <div className="flex justify-between items-center">
                <p className="lg:text-3xl md:text-2xl font-bold text-blue-600">
                    Order Details
                </p>
                <div className='relative'>
                    <div onClick={() => setToggles(!toggles)} className='flex cursor-pointer gap-1 px-2 border border-blue-400 p-1 rounded-lg font-semibold'>
                        <i className="bi bi-filter-left text-blue-600 text-xl"></i>
                        <p className='text-blue-600'>Sort by</p>
                    </div>

                    <div onMouseLeave={() => setToggles(false)} className={`absolute w-48 right-0 top-12 p-6 bg-white border shadow-lg rounded-lg ${!toggles ? "hidden" : "block"}`}>
                        <p className='py-2 text-slate-800 font-semibold'>Sort by A-Z</p>
                        <p className='py-2 text-slate-800 font-semibold'>Sort by Z-A</p>
                        <p className='py-2 text-slate-800 font-semibold'>Sort by New First</p>
                        <p className='py-2 text-slate-800 font-semibold'>Sort by Old First</p>
                    </div>
                </div>
            </div>

            <div className='flex justify-around mt-8'>
                <div className='overflow-x-scroll w-[35rem] lg:w-full bg-white rounded-lg'>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Restaurant Name</th>
                                <th className="px-3 py-3">Order ID</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Customer Name</th>
                                <th className="px-2 py-3">Location</th>
                                <th className="px-3 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-8 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.map((item) => (
                                <tr key={item.OrderID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {getValueOrNA(item.RestaurantName)}
                                    </td>
                                    <td className="px-3 py-4">
                                        {getValueOrNA(item.OrderID)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getValueOrNA(item.Date)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getValueOrNA(item.CustomerName)}
                                    </td>
                                    <td className="px-2 py-4">
                                        {getValueOrNA(item.Location)}
                                    </td>
                                    <td className="px-3 py-4">
                                        <span>&#3647;</span>{getValueOrNA(item.Amount)}
                                    </td>
                                    <td className="px-1 py-4">
                                        <div className={`border p-1 text-center rounded-md 
                                            ${item.Status?.[item.Status.length - 1]?.status === "New Order" ? "border-blue-600 text-blue-600" : ""} 
                                            ${item.Status?.[item.Status.length - 1]?.status === "On delivery" ? "border-yellow-500 text-yellow-500" : ""} 
                                            ${item.Status?.[item.Status.length - 1]?.status === "Cancelled" ? "border-red-600 text-red-600" : ""} 
                                            ${item.Status?.[item.Status.length - 1]?.status === "Delivered" ? "border-green-600 text-green-600" : ""}`}>
                                            {getValueOrNA(item.Status?.[item.Status.length - 1]?.status)} {/* Render the last status */}
                                        </div>
                                    </td>
                                    <td className="px-1 py-4">
                                        <Link to={`/foodAdmin/ordersDetails/ordersDetView/${item.OrderID}`} className="text-white bg-blue-600 border p-1 px-2 rounded-lg">
                                            View Order
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrdersDetails;
