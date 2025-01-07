import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const ManageOrder = () => {
  const restaurantIdInit = useParams();
  const restaurantId = restaurantIdInit["id"];
  const [toggles, setToggles] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Thaiseva | Order";
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersRef = collection(db, `restaurants/${restaurantId}/orders`);
        const ordersSnapshot = await getDocs(ordersRef);

        let orderIds = [];
        if (!ordersSnapshot.empty) {
          ordersSnapshot.docs.forEach((orderDoc) => {
            const orderId = orderDoc.id;
            const numericOrderId = Number(orderId);

            if (!isNaN(numericOrderId)) {
              orderIds.push(orderId);
            }
          });

          let orderDetailsList = [];
          for (const orderId of orderIds) {
            const orderDetailsRef = doc(db, `orders/${orderId}`);
            const orderDetailsSnapshot = await getDoc(orderDetailsRef);

            if (orderDetailsSnapshot.exists()) {
              const orderData = orderDetailsSnapshot.data();

              // Fetch the last status and its timestamp
              const statusArray = orderData.Status || [];
              const lastStatus = statusArray[statusArray.length - 1]; // Get the last status
              const status = lastStatus ? lastStatus.status : "Unknown"; // Default to 'Unknown' if empty
              const date = orderData.timestamp.toDate().toLocaleString(); // Convert timestamp to a readable date

              orderDetailsList.push({
                OrderID: orderId,
                Date: date, // Date of the last status
                CustomerName: orderData.CustomerName || "N/A",
                Location: orderData.Location || "N/A",
                Amount: orderData.Amount || "0.00",
                Status: status, // Current status from the last entry
              });
            }
          }

          setOrderDetails(orderDetailsList);
        } else {
          setError("No orders found for this restaurant.");
        }
      } catch (error) {
        // console.error("Error fetching orders: ", error);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [restaurantId]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <>
        <div className="bg-slate-100 px-8 pt-10 h-[80vh]">
          <div className="bg-white py-28 mb-20 h-[80%] rounded-lg shadow-blue-900 flex items-center justify-center mt-10">
            <div className="text-center">
              <p className="text-slate-500 mb-6 text-lg">{error}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-slate-100 px-6 py-10">
      <div className="flex justify-between items-center">
        <p className="lg:text-3xl md:text-2xl font-bold text-blue-600">
          Order Details
        </p>
        <div className="relative">
          <div
            onClick={() => setToggles(!toggles)}
            className="flex cursor-pointer gap-1 px-2 border border-blue-400 p-1 rounded-lg font-semibold"
          >
            <i className="bi bi-filter-left text-blue-600 text-xl"></i>
            <p className="text-blue-600">Sort by</p>
          </div>

          {toggles && (
            <div
              onMouseLeave={() => setToggles(false)}
              className="absolute w-48 right-0 top-12 p-6 bg-white border shadow-lg rounded-lg"
            >
              <p className="py-2 text-slate-800 font-semibold">Sort by A-Z</p>
              <p className="py-2 text-slate-800 font-semibold">Sort by Z-A</p>
              <p className="py-2 text-slate-800 font-semibold">
                Sort by New First
              </p>
              <p className="py-2 text-slate-800 font-semibold">
                Sort by Old First
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-around mt-8">
        <div className="overflow-x-scroll w-[35rem] lg:w-full bg-white rounded-lg">
          <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-3 py-3">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Customer Name
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-8 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((item) => (
                  <tr
                    key={item.OrderID}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-3 py-4">{`#${item.OrderID}`}</td>{" "}
                    {/* Add '#' back for display */}
                    <td className="px-6 py-4">{item.Date}</td>
                    <td className="px-6 py-4">{item.CustomerName}</td>
                    <td className="px-2 py-4">{item.Location}</td>
                    <td className="px-3 py-4">
                      <span>&#3647;</span>
                      {item.Amount}
                    </td>
                    <td className="px-1 py-4">
                      <div>
                        <p
                          className={`border p-1 text-center rounded-md 
                                                    ${
                                                      item.Status ===
                                                      "New Order"
                                                        ? "border-blue-600 text-blue-600"
                                                        : ""
                                                    } 
                                                    ${
                                                      item.Status ===
                                                      "On Delivery"
                                                        ? "border-yellow-500 text-yellow-500"
                                                        : ""
                                                    } 
                                                    ${
                                                      item.Status ===
                                                      "Cancelled"
                                                        ? "border-red-600 text-red-600"
                                                        : ""
                                                    } 
                                                    ${
                                                      item.Status ===
                                                      "Delivered"
                                                        ? "border-green-600 text-green-600"
                                                        : ""
                                                    }`}
                        >
                          {item.Status}
                        </p>
                      </div>
                    </td>
                    <td className="px-1 py-4">
                      <Link
                        to="orderView"
                        className="text-white bg-blue-600 border p-1 px-2 rounded-lg"
                      >
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
