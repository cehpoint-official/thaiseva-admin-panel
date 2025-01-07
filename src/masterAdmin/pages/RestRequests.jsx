import React, { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig"; // Import your configured Firebase database
import RestaOne from "../../assets/masterAdmin/restReuqest1.png";
import { Link } from "react-router-dom";

// Helper function to format Firestore timestamp
const formatDate = (timestamp) => {
  if (timestamp) {
    const date = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date
    return date.toLocaleDateString(); // Format the date as needed
  }
  return "";
};

const RestRequests = () => {
  const [toggle, setToggle] = useState(true); // true for active requests, false for rejected requests
  const [activeOrders, setActiveOrders] = useState([]);
  const [rejectedOrders, setRejectedOrders] = useState([]);

  useEffect(() => {
    document.title = "Thaiseva | Food Admin - Requested Restaurants";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (toggle) {
          // Fetch active requests from restroRequests
          const q = query(collection(db, "restroRequests"));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setActiveOrders(data);
        } else {
          // Fetch rejected requests from rejectedRestaurants
          const q = query(collection(db, "rejectedRestaurants"));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(data);
          setRejectedOrders(data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [toggle]);

  const ordersToDisplay = toggle ? activeOrders : rejectedOrders;

  return (
    <div className="bg-slate-100 px-6 pt-10 pb-20">
      <div>
        <p className="lg:text-3xl md:text-2xl font-bold text-blue-600">
          Restaurant Requests
        </p>
      </div>

      <div className="bg-white p-4 py-10 mt-10 rounded-lg">
        <div className="mb-10">
          <button
            type="button"
            onClick={() => setToggle(true)}
            className={`focus:text-white hover:text-white ring-1 ring-slate-100 focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 ${
              toggle ? "bg-blue-600 text-white" : "text-blue-600"
            }`}
          >
            Restaurants Requests
          </button>
          <button
            type="button"
            onClick={() => setToggle(false)}
            className={`focus:text-white hover:text-white ring-1 ring-slate-100 focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 ${
              !toggle ? "bg-blue-600 text-white" : "text-blue-600"
            }`}
          >
            Rejected Restaurants
          </button>
        </div>

        <div>
          {ordersToDisplay.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 mt-6 shadow-xl p-1 py-2 rounded-lg"
            >
              <div className="lg:col-span-4 md:col-span-6 col-span-8">
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl || item.photo || RestaOne}
                    className=" rounded-lg w-24 aspect-[4/3] object-cover"
                    alt={item.name || "Restaurant"}
                  />
                  <div>
                    <p title={item.name} className="text-xl mb-1 text-slate-700">{item.name?.length>18?`${item.name.substring(0,18)}...`:item.name}</p>
                    <span title={item.location} className="text-sm">{item.location?.length>25?`${item.location?.substring(0,25)}...`:item.location}</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 md:col-span-3 col-span-4">
                <div className="px-6 py-4">
                  <p className="text-center">ID</p>
                  <p className="text-black text-sm font-bold text-center" title={item.id}>{item.id?.length>10?`${item.id?.substring(0,10)}...`:item.id}</p>
                </div>
              </div>
              <div className="lg:col-span-1 md:col-span-3 col-span-4">
                <div className="py-4">
                  <p className="text-center">Date</p>
                  <p className="font-bold text-sm text-center">{formatDate(item.date)}</p>
                </div>
              </div>
              <div className="lg:col-span-3 md:col-span-3 col-span-4">
                <div className="md:ps-6 lg:px-6 py-4">
                  <p className="text-center">Email</p>
                  <p title={item.emailId} className="text-black font-bold text-sm text-center">{item.emailId?.length>15?`${item.emailId?.substring(0,15)}...`:item.emailId}</p>
                </div>
              </div>
              <div className="lg:col-span-2 md:col-span-4 col-span-4 md:col-start-10">
                <div className="py-4 mt-3">
                  <Link
                    to={`/foodAdmin/restaReuest/restaurantReqDet/${item.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline border-blue-400 border p-1 px-2 rounded-lg"
                  >
                    <i className="bi bi-eye-fill"></i>View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestRequests;
