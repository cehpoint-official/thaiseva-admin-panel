import { Link, Outlet, useParams } from "react-router-dom";
import "../../../src/index.css";
import Taco from "../../assets/Taco.png";
import TacoTwo from "../../assets/Taco2.png";
import Item from "../../assets/item1.png";
import ItemTwo from "../../assets/item2.png";
import ItemThree from "../../assets/item3.png";
import ChartPage from "./ChartPage";
import ChartTwo from "./ChartTwo";
import { useEffect, useRef, useState } from "react";
import BikeLogo from "../../assets/notification/bike.png";
import NewLogo from "../../assets/notification/newOrder.png";
import { useAuth } from "../../AuthContext";
import FoodStats from "./FoodStats";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const Dashboard = ({ toggle }) => {
  useEffect(() => {
    document.title ='Thaiseva | Dashboard'
  }, [])
  return (
    <div className="w-full">
      <TopNav toggle={toggle} />
      <Outlet />
    </div>
  );
};

const TopNav = ({ toggle }) => {
  const [profileToggle, setProfileToggle] = useState(false);
  const [notification, setNotification] = useState(false);
  const parentRef = useRef(); // Ref to the parent element

  useEffect(() => {
    document.title ='Thaiseva | Dashboard'
  }, [])

  const handleClickOutside = (event) => {
    if (parentRef.current && !parentRef.current.contains(event.target)) {
      setProfileToggle(false);
    }
    if (parentRef.current && !parentRef.current.contains(event.target)) {
      setNotification(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const { currentUser } = useAuth();

  if (!currentUser) {
    return <p>No user is logged in.</p>;
  }
  return (
    <>
      <div className="w-full   py-2  z-50">
        <div className="justify-between   items-center flex  p-2 ">
          <div className="flex  md:mx-5  w-[50%] ">
            <button onClick={toggle} className="">
              <i className="bi text-2xl bi-menu-button-wide-fill"></i>
            </button>

            <form className="w-full lg:ms-14 ms-4 ">
              <label
                for="default-search"
                className=" text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border  border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search here..."
                  required
                />
              </div>
            </form>
          </div>
          <div className="flex gap-6 items-center my-2">
            <div ref={parentRef}>
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  setNotification(!notification);
                  setProfileToggle(false);
                }}
                className="bi text-2xl bi-bell-fill text-blue-700 relative lg:me-10"
              >
                <div className="bg-red-500 absolute text-[15px] flex justify-center items-center w-4 h-4 text-white rounded-full top-0 -right-2">
                  2
                </div>
              </i>
              <div
                className={`p-3 z-10 py-4 top-24 right-20 bg-slate-50 rounded-xl shadow-2xl w-[23rem] absolute  ${
                  !notification ? "hidden" : "block"
                }`}
              >
                <div className="flex justify-between items-center  w-full">
                  <p className="text-slate-600 font-semibold">Notification</p>
                  <form className="">
                    <label
                      for="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        className="block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search here"
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="flex gap-4 mt-6">
                  <img src={BikeLogo} className="h-[4rem]" alt="" />
                  <div>
                    <p className="text-xl text-slate-800">
                      Successfully Delivered!
                    </p>
                    <p className="mt-1 text-slate-500">
                      Your order has been successfully delivered!”; we all know
                      this subject line a little too well
                    </p>
                    <p className="text-end text-sm text-slate-500 mt-1">Now</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <img src={NewLogo} className="h-[4rem]" alt="" />
                  <div>
                    <p className="text-xl text-slate-800">New Order!</p>
                    <p className="mt-1 text-slate-500">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Facere, in.
                    </p>
                    <p className="text-end text-sm text-slate-500 mt-1">
                      10/04/2024
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div ref={parentRef}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileToggle(!profileToggle);
                  setNotification(false);
                }}
                className="gap-2 cursor-pointer flex relative items-center bg-blue-200 rounded-lg rounded-e-2xl"
              >
                {currentUser.displayName && (
                  <p className=" text-blue-700 me-8 p-1  md:px-8 px-4 md:text-lg font-semibold">
                    {" "}
                    {currentUser.displayName}
                  </p>
                )}
                <p className="bg-blue-700 absolute right-0  md:h-12 md:w-12 h-8 w-8 flex justify-center items-center md:text-3xl text-lg text-white rounded-full font-semibold">
                  H
                </p>
              </div>

              <div
                className={`p-4 z-10 py-10 top-24 right-10 bg-slate-50 rounded-xl shadow-2xl w-[18rem]  flex justify-center absolute ${
                  !profileToggle ? "hidden" : "block"
                }  `}
              >
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    User Profile
                  </h2>
                  <p className="text-gray-600 mb-2">
                    <strong>Email:</strong> {currentUser.email}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>UID:</strong> {currentUser.uid}
                  </p>
                  {/* Display other user information here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Stat = () => {
  const restaurantIdInit = useParams();
  const restaurantId = restaurantIdInit["id"];
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalOrder, setTotalOrder] = useState(0);
  const [completeOrder, setCompleteOrder] = useState(0);
  const [pending, setPending] = useState(0);
  const [canceled, setCanceled] = useState(0);
  const [countCustomer, setCountCustomer] = useState(0);
  const [newOrder, setNewOrder] = useState(0);
  const [onDelivery, setOnDelivery] = useState(0);
  const [delivered, setDelivered] = useState(0);

  useEffect(() => {
    document.title ='Thaiseva | Dashboard'
  }, [])

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersRef = doc(db, `restaurants/${restaurantId}/orders/orders`);
        console.log(ordersRef);
        const snapshot = await getDoc(ordersRef);

        console.log("Snapshot data: ", snapshot.data());

        if (snapshot.exists()) {
          const ordersData = snapshot.data();
          // console.log("Orders data structure: ", ordersData);

          setTotalOrder(Object.keys(ordersData).length);
          setCompleteOrder(
            Object.values(ordersData).filter(
              (order) => order.Status === "Delivered"
            ).length
          );
          setPending(
            Object.values(ordersData).filter(
              (order) =>
                order.Status === "On delivery" || order.Status === "New Order"
            ).length
          );
          setCanceled(
            Object.values(ordersData).filter(
              (order) => order.Status === "Cancelled"
            ).length
          );
          setNewOrder(
            Object.values(ordersData).filter(
              (order) => order.Status === "New Order"
            ).length
          );
          setOnDelivery(
            Object.values(ordersData).filter(
              (order) => order.Status === "On delivery"
            ).length
          );
          setDelivered(
            Object.values(ordersData).filter(
              (order) => order.Status === "Delivered"
            ).length
          );

          const customerNames = Object.values(ordersData).map(
            (order) => order.CustomerName
          );
          const uniqueCustomerSet = new Set(customerNames);
          setCountCustomer(uniqueCustomerSet.size);

          // Convert the orders into a list while also including originalOrderId
          const ordersList = Object.keys(ordersData).map((orderId) => ({
            OrderID: orderId, // This will be the key (without #)
            ...ordersData[orderId],
          }));

          // console.log("Orders list: ", ordersList);

          setOrderDetails(ordersList);
        } else {
          setError("You currently do not have a restaurant. Please add one to view your Dashboard.");
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
  if (error) return <div className="w-full h-full mt-20 text-3xl flex items-center justify-center">
    <span className="w-[40vw] text-center">
    {error}
    </span>
  </div>;

  return (
    <>
      <div className="bg-slate-100 px-8 pt-10">
        <div className="flex justify-between items-center">
          <p className="lg:text-4xl md:text-2xl font-bold text-blue-600">
            Dashboard
          </p>
          <div className="flex justify-between text-blue-600 border border-blue-600 rounded-lg items-center lg:p-4 p-2 gap-4 bg-blue-100">
            <i className="bi bi-calendar4 text-3xl"></i>
            <div>
              <p className="lg:text-2xl text-xl">Time period</p>

              <div className="md:flex gap-1 mt-2 text-sm">
                <input
                  type="date"
                  className="bg-blue-100 date-input w-[7.65rem]" // Apply your Tailwind and custom classes here
                  placeholder="Select date"
                />
                <p>to</p>
                <input
                  type="date"
                  className="bg-blue-100 date-input w-[7.65rem]" // Apply your Tailwind and custom classes here
                  placeholder="Select date"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap mt-14 gap-4 w-full">
          <div className="flex flex-wrap justify-start gap-4 w-full">
            <span className="bg-white rounded-lg flex items-center justify-center gap-x-4 p-4">
              <i className="bi text-3xl p-2 px-3 text-yellow-600 rounded-full bg-yellow-100 bi-file-person"></i>
              <span className="flex flex-col justify-center items-start">
                <p className="text-4xl font-bold">{totalOrder}</p>
                <p className="text-slate-500">Total Orders</p>
              </span>
            </span>

            <span className="bg-white rounded-lg flex items-center justify-center gap-x-4 p-4">
              <i className="bi text-3xl p-2 px-3 text-green-600 rounded-full bg-green-100 bi-clipboard2-check"></i>
              <span className="flex flex-col justify-center items-start">
                <p className="text-4xl font-bold">{completeOrder}</p>
                <p className="text-slate-500">Complete Orders</p>
              </span>
            </span>

            <span className="bg-white rounded-lg flex items-center justify-center gap-x-4 p-4">
              <i className="bi text-3xl p-2 px-3 text-red-600 rounded-full bg-red-100 bi-hourglass-top"></i>
              <span className="flex flex-col justify-center items-start">
                <p className="text-4xl font-bold">{pending}</p>
                <p className="text-slate-500">Pending Order</p>
              </span>
            </span>

            <span className="bg-white rounded-lg flex items-center justify-center gap-x-4 p-4">
              <i className="bi text-3xl p-2 px-3 text-purple-600 rounded-full bg-purple-100 bi-person"></i>
              <span className="flex flex-col justify-center items-start">
                <p className="text-4xl font-bold">{countCustomer}</p>
                <p className="text-slate-500">Total Customers</p>
              </span>
            </span>

            <span className="bg-white rounded-lg flex items-center justify-center gap-x-4 p-4">
              <i className="bi text-3xl p-2 px-3 text-blue-600 rounded-full bg-blue-100 bi-cup"></i>
              <span className="flex flex-col justify-center items-start">
                <p className="text-4xl font-bold">{completeOrder}</p>
                <p className="text-slate-500">Item Sold</p>
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 mt-10  gap-6">
          <div className="col-span-12 lg:col-span-6 bg-white p-6 rounded-lg">
            <p className="text-xl font-bold">Orders Summary</p>

            <div
              className="inline-flex my-6 rounded-md shadow-sm  bg-gray-200"
              role="group"
            >
              <button
                type="button"
                className="px-4 py-2 text-sm  font-semibold   border border-gray-200 rounded-s-lg text-blue-700 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:bg-white  focus:text-gray-900 "
              >
                Monthly
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-semibold   border border-gray-200  text-blue-700 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:bg-white  focus:text-gray-900 "
              >
                Weekly
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-semibold   border border-gray-200 rounded-e-lg text-blue-700 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:bg-white  focus:text-gray-900 "
              >
                Today
              </button>
            </div>

            <div className="bg-green-100 p-2 rounded-lg">
              <div className="flex justify-between items-center font-semibold">
                <div className="flex items-center gap-4">
                  <p className="bg-green-600 rounded-lg px-4 text-white p-2 text-xl font-semibold">
                    {newOrder}
                  </p>
                  <p className="">New Orders</p>
                </div>
                <div className="flex items-center text-green-600">
                  <Link to="manageOrder">Manage Orders </Link>
                  <i className="bi bi-arrow-right-short text-2xl"></i>
                </div>
              </div>
            </div>

            <div className="flex w-full items-center justify-start my-6 gap-x-12">
              <div className="flex-1 border flex flex-col w-full items-center justify-center border-gray-400 rounded-lg p-4">
                <p className="text-gray-600 text-lg">On Delivery</p>
                <p className="text-3xl font-semibold">{onDelivery<10? `0${onDelivery}` : onDelivery}</p>
              </div>
              <div className="flex-1 border flex flex-col w-full items-center justify-center border-gray-400 rounded-lg p-4 ">
                <p className="text-gray-600 text-lg">Delivered</p>
                <p className="text-3xl font-semibold">{delivered<10? `0${delivered}` : delivered}</p>
              </div>
              <div className="flex-1 border flex flex-col w-full items-center justify-center bg-slate-50 border-gray-400 rounded-lg p-4">
                <p className="text-gray-600 text-lg">Cancelled</p>
                <p className="text-3xl font-semibold">{canceled<10? `0${canceled}` : canceled}</p>
              </div>
            </div>

            <div className="  w-full">
              <ChartPage
                delivered={delivered}
                onDelivery={onDelivery}
                canceled={canceled}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 bg-white p-4 rounded-lg pb-8">
            <p className="text-xl font-bold">Earning & Platform Charge</p>

            <div>
              <ChartTwo />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 mt-10 pb-20 gap-6">
          <FoodStats />

          <div className="col-span-12 lg:col-span-6 bg-white p-4 rounded-lg pb-8">
            <p className="text-xl font-bold">Top Selling items</p>
            <div className="flex items-center justify-between mt-3 ">
              <div className="flex items-center gap-3">
                <img src={Item} className="h-8" alt="" />
                <div className="">
                  <p className=" font-semibold">Chicken Biriyani</p>
                  <p className="text-blue-700 text-sm">200 Times</p>
                </div>
              </div>
              <p className="text-slate-800 text-lg ">
                <span>&#3647;</span> 177.60
              </p>
            </div>
            <div className="flex items-center justify-between mt-3 ">
              <div className="flex items-center gap-3">
                <img src={ItemTwo} className="h-8" alt="" />
                <div className="">
                  <p className=" font-semibold">Farm house pizza</p>
                  <p className="text-blue-700 text-sm">100 Times</p>
                </div>
              </div>
              <p className="text-slate-800 text-lg ">
                <span>&#3647;</span> 250.50
              </p>
            </div>
            <div className="flex items-center justify-between mt-3 ">
              <div className="flex items-center gap-3">
                <img src={ItemThree} className="h-8" alt="" />
                <div className="">
                  <p className=" font-semibold">Darjeeling momo</p>
                  <p className="text-blue-700 text-sm">70 Times</p>
                </div>
              </div>
              <p className="text-slate-800 text-lg ">
                <span>&#3647;</span> 100.00
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
