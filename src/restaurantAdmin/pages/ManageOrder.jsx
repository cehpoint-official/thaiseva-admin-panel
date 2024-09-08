//Linked with the firebase

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebaseConfig.js"; // Firestore instance
import { collection, getDocs, doc, getDoc } from "firebase/firestore"; // Firestore methods

const ManageOrder = () => {
  const [toggles, setToggles] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, "orders"); // 'orders' is your collection in Firestore
      const orderSnapshot = await getDocs(ordersCollection);
      const ordersList = await Promise.all(
        orderSnapshot.docs.map(async (docSnap) => {
          const orderData = docSnap.data();
          // Fetch restaurant details from the 'restaurants' collection using Restro_Id
          const restroDoc = await getDoc(
            doc(db, "restaurants", orderData.Restro_Id)
          );
          const restroName = restroDoc.exists()
            ? restroDoc.data().name
            : "Unknown Restaurant"; // Default if restaurant not found

          return {
            OrderId: orderData.OrderId,
            OrderItems: orderData.OrderItems,
            RestroName: restroName, // Restaurant name from Firestore
            Status: orderData.Status,
            delivered_by: orderData.delivered_by,
            discount: orderData.discount,
            paymentMode: orderData.paymentMode,
            total_price: orderData.total_price,
            user: orderData.user, // Customer details
          };
        })
      );
      setOrderDetails(ordersList);
    };

    fetchOrders();
  }, []); // Fetch data only on component mount

  return (
    <div className='bg-slate-100 px-6 py-10'>
      <div className='flex justify-between items-center'>
        <p className='lg:text-3xl md:text-2xl font-bold text-blue-600'>
          Order Details
        </p>
        <div className='relative'>
          <div
            onClick={() => setToggles(!toggles)}
            className='flex cursor-pointer gap-1 px-2 border border-blue-400 p-1 rounded-lg font-semibold'>
            <i className='bi bi-filter-left text-blue-600 text-xl'></i>
            <p className='text-blue-600'>Sort by</p>
          </div>
          <div
            onMouseLeave={() => setToggles(false)}
            className={`absolute w-48 right-0 top-12 p-6 bg-white border shadow-lg rounded-lg ${
              !toggles ? "hidden" : "block"
            }`}>
            <p className='py-2 text-slate-800 font-semibold'>Sort by A-Z</p>
            <p className='py-2 text-slate-800 font-semibold'>Sort by Z-A</p>
            <p className='py-2 text-slate-800 font-semibold'>
              Sort by New First
            </p>
            <p className='py-2 text-slate-800 font-semibold'>
              Sort by Old First
            </p>
          </div>
        </div>
      </div>

      <div className='flex justify-around mt-8'>
        <div className='overflow-x-scroll w-[35rem] lg:w-full bg-white rounded-lg'>
          <div>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Restaurant Name
                  </th>
                  <th scope='col' className='px-3 py-3'>
                    Order ID
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Total Price
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Discount
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Customer Name
                  </th>
                  <th scope='col' className='px-3 py-3'>
                    Status
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Delivered By
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Payment Mode
                  </th>
                  <th scope='col' className='px-8 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((order, index) => (
                  <tr
                    key={index}
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {order.RestroName}
                    </th>
                    <td className='px-3 py-4'>{order.OrderId}</td>
                    <td className='px-6 py-4'>
                      <span>&#3647;</span>
                      {order.total_price}
                    </td>
                    <td className='px-6 py-4'>{order.discount}</td>
                    <td className='px-6 py-4'>{order.user.name}</td>
                    <td className='px-3 py-4'>
                      <div>
                        <p
                          className={`border p-1 text-center rounded-md ${
                            order.Status === "New"
                              ? "border-blue-600 text-blue-600"
                              : ""
                          } 
                                                ${
                                                  order.Status === "On delivery"
                                                    ? "border-yellow-500 text-yellow-500"
                                                    : ""
                                                } 
                                                ${
                                                  order.Status === "Cancelled"
                                                    ? "border-red-600 text-red-600"
                                                    : ""
                                                } 
                                                ${
                                                  order.Status === "Delivered"
                                                    ? "border-green-600 text-green-600"
                                                    : ""
                                                }`}>
                          {order.Status}
                        </p>
                      </div>
                    </td>
                    <td className='px-6 py-4'>{order.delivered_by}</td>
                    <td className='px-6 py-4'>{order.paymentMode}</td>
                    <td className='px-6 py-4'>
                      <Link
                        to={`/manageOrder/orderView/${order.OrderId}`}
                        className='text-white bg-blue-600 border p-1 px-2 rounded-lg'>
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
};

export default ManageOrder;
