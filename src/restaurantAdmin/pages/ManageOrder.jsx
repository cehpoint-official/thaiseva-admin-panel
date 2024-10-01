import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../../firebaseConfig'; 
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const ManageOrder = () => {
    const restaurantIdInit = useParams();
    const restaurantId = restaurantIdInit['id'];
    const [toggles, setToggles] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title ='Thaiseva | Order'
      }, [])

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const ordersRef = doc(db, `restaurants/${restaurantId}/orders/orders`);
                console.log(ordersRef)
                const snapshot = await getDoc(ordersRef);
        
                // console.log("Snapshot data: ", snapshot.data());
        
                if (snapshot.exists()) {
                    const ordersData = snapshot.data();
                    // console.log("Orders data structure: ", ordersData);
        
                    // Convert the orders into a list while also including originalOrderId
                    const ordersList = Object.keys(ordersData).map(orderId => ({
                        OrderID: orderId, // This will be the key (without #)
                        ...ordersData[orderId],
                    }));
        
                    // console.log("Orders list: ", ordersList);
        
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
    }, [restaurantId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='bg-slate-100 px-6 py-10'>
            <div className="flex justify-between items-center">
                <p className="lg:text-3xl md:text-2xl font-bold text-blue-600">Order Details</p>
                <div className='relative'>
                    <div onClick={() => setToggles(!toggles)} className='flex cursor-pointer gap-1 px-2 border border-blue-400 p-1 rounded-lg font-semibold'>
                        <i className="bi bi-filter-left text-blue-600 text-xl"></i>
                        <p className='text-blue-600'>Sort by</p>
                    </div>

                    {toggles && (
                        <div onMouseLeave={() => setToggles(false)} className='absolute w-48 right-0 top-12 p-6 bg-white border shadow-lg rounded-lg'>
                            <p className='py-2 text-slate-800 font-semibold'>Sort by A-Z</p>
                            <p className='py-2 text-slate-800 font-semibold'>Sort by Z-A</p>
                            <p className='py-2 text-slate-800 font-semibold'>Sort by New First</p>
                            <p className='py-2 text-slate-800 font-semibold'>Sort by Old First</p>
                        </div>
                    )}
                </div>
            </div>

            <div className='flex justify-around mt-8'>
                <div className='overflow-x-scroll w-[35rem] lg:w-full bg-white rounded-lg'>
                    <div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-3 py-3">Order ID</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Customer Name</th>
                                    <th scope="col" className="px-2 py-3">Location</th>
                                    <th scope="col" className="px-3 py-3">Amount</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-8 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.map((item) => (
                                    <tr key={item.OrderID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-3 py-4">{`#${item.OrderID}`}</td> {/* Add '#' back for display */}
                                        <td className="px-6 py-4">{item.Date}</td>
                                        <td className="px-6 py-4">{item.CustomerName}</td>
                                        <td className="px-2 py-4">{item.Location}</td>
                                        <td className="px-3 py-4">
                                            <span>&#3647;</span>
                                            {item.Amount}
                                        </td>
                                        <td className="px-1 py-4">
                                            <div>
                                                <p className={`border p-1 text-center rounded-md 
                                                    ${item.Status === "New Order" ? "border-blue-600 text-blue-600" : ""} 
                                                    ${item.Status === "On delivery" ? "border-yellow-500 text-yellow-500" : ""} 
                                                    ${item.Status === "Cancelled" ? "border-red-600 text-red-600" : ""} 
                                                    ${item.Status === "Delivered" ? "border-green-600 text-green-600" : ""}`}>
                                                    {item.Status}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-1 py-4">
                                            <Link to="orderView" className="text-white bg-blue-600 border p-1 px-2 rounded-lg">
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
        </div>
    );
}

export default ManageOrder;
