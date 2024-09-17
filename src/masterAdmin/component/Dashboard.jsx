import { Link, Outlet } from "react-router-dom";
import "../../../src/index.css";
import Taco from "../../assets/masterAdmin/activeRest.png";
import TacoTwo from "../../assets/masterAdmin/unactiveRest.png";
import Item from "../../assets/masterAdmin/restaImg1.png";
import ItemTwo from "../../assets/masterAdmin/restaImg2.png";
import ItemThree from "../../assets/masterAdmin/restaImg3.png";
import { useEffect, useRef, useMastere, useState } from "react";
import BikeLogo from "../../assets/notification/bike.png";
import NewLogo from "../../assets/notification/newOrder.png";
import MasterApexChart from "./ChartTwo";
import MasterChartPage from "./ChartPage";
import { messaging } from "../../../firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";

const MasterDashboard = ({ toggle }) => {
  return (
    <div className='w-full'>
      <TopNav toggle={toggle} />
      <Outlet />
    </div>
  );
};

const TopNav = ({ toggle }) => {
  const [profileToggle, setProfileToggle] = useState(false);
  const [notification, setNotification] = useState(false);
  const [newNotifications, setNewNotifications] = useState([]);
  const parentRef = useRef();

  useEffect(() => {
    const handleForegroundMessages = () => {
      // Listen for foreground messages
      messaging.onMessage((payload) => {
        console.log("Foreground notification received: ", payload);
        setNewNotifications((prev) => [...prev, payload.notification]);
        setNotification(true);
      });
    };

    handleForegroundMessages();

    const handleClickOutside = (event) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setProfileToggle(false);
        setNotification(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='w-full   py-2  z-50'>
        <div className='justify-between   items-center flex  p-2 '>
          <div className='flex  md:mx-5  w-[50%] '>
            <button onClick={toggle} className=''>
              <i class='bi text-2xl bi-menu-button-wide-fill'></i>
            </button>

            <form class='w-full lg:ms-14 ms-4 '>
              <label
                for='default-search'
                class=' text-sm font-medium text-gray-900 sr-only dark:text-white'>
                Search
              </label>
              <div class='relative'>
                <div class='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                  <svg
                    class='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'>
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                    />
                  </svg>
                </div>
                <input
                  type='search'
                  id='default-search'
                  class='block w-full p-2 ps-10 text-sm text-gray-900 border  border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Search here...'
                  required
                />
              </div>
            </form>
          </div>
          <div className='flex gap-6 items-center my-2'>
            <div ref={parentRef}>
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  setNotification(!notification);
                  setProfileToggle(false);
                }}
                class='bi text-2xl bi-bell-fill text-blue-700 relative lg:me-10'>
                <div className='bg-red-500 absolute text-[15px] flex justify-center items-center w-4 h-4 text-white rounded-full top-0 -right-2'>
                  2
                </div>
              </i>
              <div
                className={`p-3 z-10 py-4 top-24 right-20 bg-slate-50 rounded-xl shadow-2xl w-[23rem] absolute  ${
                  !notification ? "hidden" : "block"
                }`}>
                <div className='flex justify-between items-center  w-full'>
                  <p className='text-slate-600 font-semibold'>Notification</p>
                  <form class=''>
                    <label
                      for='default-search'
                      class='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
                      Search
                    </label>
                    <div class='relative'>
                      <div class='absolute inset-y-0 flex items-center ps-3 pointer-events-none'>
                        <svg
                          class='w-4 h-4 text-gray-500 dark:text-gray-400'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 20 20'>
                          <path
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                          />
                        </svg>
                      </div>
                      <input
                        type='search'
                        id='default-search'
                        class='block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Search here'
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className='flex gap-4 mt-6'>
                  <img src={BikeLogo} className='h-[4rem]' alt='' />
                  <div>
                    <p className='text-xl text-slate-800'>
                      Successfully Delivered!
                    </p>
                    <p className='mt-1 text-slate-500'>
                      Your order has been successfully delivered!”; we all know
                      this subject line a little too well
                    </p>
                    <p className='text-end text-sm text-slate-500 mt-1'>Now</p>
                  </div>
                </div>
                <div className='flex gap-4 mt-6'>
                  <img src={NewLogo} className='h-[4rem]' alt='' />
                  <div>
                    <p className='text-xl text-slate-800'>New Request</p>
                    <p className='mt-1 text-slate-500'>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Facere, in.
                    </p>
                    <p className='text-end text-sm text-slate-500 mt-1'>
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
                className='gap-2 cursor-pointer flex relative items-center bg-blue-200 rounded-lg rounded-e-2xl'>
                <p className=' text-blue-700 me-8 p-1  md:px-8 px-4 md:text-lg font-semibold'>
                  Hello Harish{" "}
                </p>
                <p className='bg-blue-700 absolute right-0  md:h-12 md:w-12 h-8 w-8 flex justify-center items-center md:text-3xl text-lg text-white rounded-full font-semibold'>
                  H
                </p>
              </div>

              <div
                className={`p-4 z-10 py-10 top-24 right-10 bg-slate-50 rounded-xl shadow-2xl w-[18rem]  flex justify-center absolute ${
                  !profileToggle ? "hidden" : "block"
                }  `}>
                <div className='text-center'>
                  <p className='bg-blue-700 ms-[35%]  ring-8  md:h-16 md:w-16 h-8 w-8 flex justify-center relative items-center md:text-5xl text-lg text-white rounded-full font-semibold'>
                    H{" "}
                    <i className='bi -bottom-1 bi-camera-fill absolute  bg-white p-1 px-2 text-xl text-blue-600 -right-5 rounded-full'></i>{" "}
                  </p>
                  <p className='text-2xl my-4 font-bold'>Harish Sir</p>
                  <p className='text-xl my-2 text-slate-700'>
                    Email - info@gmail.com
                  </p>
                  <p className='text-xl text-slate-700'>
                    Ph. No - +66 54657878
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TopNav = ({ toggle }) => {
  const [profileToggle, setProfileToggle] = useState(false);
  const [notification, setNotification] = useState(false);
  const [newNotifications, setNewNotifications] = useState([]);
  const parentRef = useRef();

  useEffect(() => {
    // Request permission for notifications and get the token
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const currentToken = await getToken(messaging, {
            vapidKey:
              "BLbgWZyfjEyx6VmKx7F4cPT87C4Ysjo2Pbt5b9usRDMDE3k_7uN2GYQdiTB_Bx-Zzwi9yGRMk8B_yC7M5ueWAi0",
          });
          console.log("FCM token:", currentToken);
        } else {
          console.log("Notification permission not granted.");
        }
      } catch (error) {
        console.error("Error getting permission for notifications", error);
      }
    };

    requestNotificationPermission();

    // Handle foreground messages
    const handleForegroundMessages = () => {
      onMessage(messaging, (payload) => {
        console.log("Foreground notification received:", payload);
        setNewNotifications((prev) => [...prev, payload.notification]);
        setNotification(true);
      });
    };

    handleForegroundMessages();

    // Close notification dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setProfileToggle(false);
        setNotification(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='w-full py-2 z-50'>
        <div className='justify-between items-center flex p-2 '>
          <div className='flex md:mx-5 w-[50%]'>
            <button onClick={toggle}>
              <i className='bi text-2xl bi-menu-button-wide-fill'></i>
            </button>
            <form className='w-full lg:ms-14 ms-4'>
              <label
                htmlFor='default-search'
                className='text-sm font-medium text-gray-900 sr-only dark:text-white'>
                Search
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'>
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                    />
                  </svg>
                </div>
                <input
                  type='search'
                  id='default-search'
                  className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Search here...'
                  required
                />
              </div>
            </form>
          </div>
          <div className='flex gap-6 items-center my-2'>
            <div ref={parentRef}>
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  setNotification(!notification);
                  setProfileToggle(false);
                }}
                className='bi text-2xl bi-bell-fill text-blue-700 relative lg:me-10'>
                <div className='bg-red-500 absolute text-[15px] flex justify-center items-center w-4 h-4 text-white rounded-full top-0 -right-2'>
                  {newNotifications.length}
                </div>
              </i>
              <div
                className={`p-3 z-10 py-4 top-24 right-20 bg-slate-50 rounded-xl shadow-2xl w-[23rem] absolute  ${
                  !notification ? "hidden" : "block"
                }`}>
                <div className='flex justify-between items-center w-full'>
                  <p className='text-slate-600 font-semibold'>Notification</p>
                  <form>
                    <label
                      htmlFor='default-search'
                      className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
                      Search
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 flex items-center ps-3 pointer-events-none'>
                        <svg
                          className='w-4 h-4 text-gray-500 dark:text-gray-400'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 20 20'>
                          <path
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                          />
                        </svg>
                      </div>
                      <input
                        type='search'
                        id='default-search'
                        className='block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Search here'
                        required
                      />
                    </div>
                  </form>
                </div>
                {newNotifications.map((notif, index) => (
                  <div key={index} className='flex gap-4 mt-6'>
                    <img
                      src={notif.image || BikeLogo}
                      className='h-[4rem]'
                      alt=''
                    />
                    <div>
                      <p className='text-xl text-slate-800'>
                        {notif.title || "Notification"}
                      </p>
                      <p className='mt-1 text-slate-500'>{notif.body}</p>
                      <p className='text-end text-sm text-slate-500 mt-1'>
                        {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div ref={parentRef}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileToggle(!profileToggle);
                  setNotification(false);
                }}
                className='gap-2 cursor-pointer flex relative items-center bg-blue-200 rounded-lg rounded-e-2xl'>
                <p className='text-blue-700 me-8 p-1 md:px-8 px-4 md:text-lg font-semibold'>
                  Hello Harish
                </p>
                <p className='bg-blue-700 absolute right-0 md:h-12 md:w-12 h-8 w-8 flex justify-center items-center md:text-3xl text-lg text-white rounded-full font-semibold'>
                  H
                </p>
              </div>

              <div
                className={`p-4 z-10 py-10 top-24 right-10 bg-slate-50 rounded-xl shadow-2xl w-[18rem] flex justify-center absolute ${
                  !profileToggle ? "hidden" : "block"
                }`}>
                <div className='text-center'>
                  <p className='bg-blue-700 ms-[35%] ring-8 md:h-16 md:w-16 h-8 w-8 flex justify-center relative items-center md:text-5xl text-lg text-white rounded-full font-semibold'>
                    H
                    <i className='bi -bottom-1 bi-camera-fill absolute bg-white p-1 px-2 text-xl text-blue-600 -right-5 rounded-full'></i>
                  </p>
                  <p className='text-2xl my-4 font-bold'>Harish Sir</p>
                  <p className='text-xl my-2 text-slate-700'>
                    Email - info@gmail.com
                  </p>
                  <p className='text-xl text-slate-700'>
                    Ph. No - +66 54657878
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const MasterStat = () => {
  return (
    <>
      <div className='bg-slate-100 px-6 pt-10'>
        <div className='flex justify-between items-center'>
          <p className='lg:text-4xl md:text-2xl font-bold text-blue-600'>
            Dashboard
          </p>
          <div className='flex justify-between text-blue-600 border border-blue-600 rounded-lg items-center lg:p-4 p-2 gap-4 bg-blue-100'>
            <i class='bi bi-calendar4 text-3xl'></i>
            <div>
              <p className='lg:text-2xl text-xl'>Time period</p>

              <div class='md:flex gap-1 mt-2 text-sm'>
                <input
                  type='date'
                  className='bg-blue-100 date-input w-[7.65rem]' // Apply your Tailwind and custom classes here
                  placeholder='Select date'
                />
                <p>to</p>
                <input
                  type='date'
                  className='bg-blue-100 date-input w-[7.65rem]' // Apply your Tailwind and custom classes here
                  placeholder='Select date'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='lg:flex mt-14 gap-4 '>
          <div className='flex justify-between gap-4'>
            <div className=' md:w-[33%] bg-white rounded-lg'>
              <div className='flex  gap-3 p-3 rounded-lg justify-between items-center'>
                <div>
                  <i class='bi text-3xl p-2 px-3 text-yellow-600 rounded-full bg-yellow-100 bi-file-person'></i>
                </div>
                <div>
                  <p className='text-3xl font-bold'>100</p>
                  <p className='text-slate-600 ms-1'>Total Restaurants</p>
                </div>
              </div>
            </div>
            <div className='md:w-[33%] bg-white rounded-lg'>
              <div className='flex  gap-3 p-3 rounded-lg justify-between items-center'>
                <div>
                  <i class='bi text-3xl p-2 px-3 text-red-600 rounded-full bg-red-100 bi-hourglass-top'></i>
                </div>
                <div>
                  <p className='text-3xl font-bold'>20</p>
                  <p className='text-slate-600 ms-1'>Pending Request</p>
                </div>
              </div>
            </div>
            <div className=' md:w-[33%] bg-white rounded-lg '>
              <div className='flex  gap-3 p-3 rounded-lg justify-between items-center'>
                <div className='lg:mt-4'>
                  <i class='bi text-3xl p-2 px-3  text-green-600 rounded-full bg-green-100 bi-clipboard2-check'></i>
                </div>
                <div>
                  <p className='text-3xl font-bold'>98</p>
                  <p className='text-slate-600 ms-1'>Total Orders </p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex md:justify-evenly gap-3 lg:justify-between mt-6 lg:mt-0 '>
            <div className=' md:w-[33%] lg:w-auto w-[50%]  bg-white rounded-lg'>
              <div className='flex  gap-3 p-3 rounded-lg justify-between items-center lg:pe-8'>
                <div>
                  <i class='bi text-3xl p-2 px-3 text-blue-600 rounded-full bg-blue-100 bi-cup'></i>
                </div>
                <div>
                  <p className='text-3xl font-bold'>100</p>
                  <p className='text-slate-600 ms-1'>Item Sold</p>
                </div>
              </div>
            </div>
            <div className=' md:w-[33%] lg:w-auto w-[50%]  bg-white rounded-lg'>
              <div className='flex  gap-3 p-3 rounded-lg justify-between items-center'>
                <div>
                  <i class='bi text-3xl p-2 px-3 text-purple-600 rounded-full bg-purple-100 bi-person'></i>
                </div>
                <div>
                  <p className='text-3xl font-bold'>60</p>
                  <p className='text-slate-600 ms-1'>Total Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-12 mt-10  gap-6'>
          <div className='col-span-12 lg:col-span-6 bg-white p-4 pb-8 rounded-lg'>
            <p className='text-xl font-bold'>Orders Summary</p>

            <div
              class='inline-flex my-6 rounded-md shadow-sm  bg-gray-200'
              role='group'>
              <button
                type='button'
                class='px-4 py-2 text-sm  font-semibold   border border-gray-200 rounded-s-lg text-blue-700 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:bg-white  focus:text-gray-900 '>
                Monthly
              </button>
              <button
                type='button'
                class='px-4 py-2 text-sm font-semibold   border border-gray-200  text-blue-700 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:bg-white  focus:text-gray-900 '>
                Weekly
              </button>
              <button
                type='button'
                class='px-4 py-2 text-sm font-semibold   border border-gray-200 rounded-e-lg text-blue-700 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:bg-white  focus:text-gray-900 '>
                Today
              </button>
            </div>

            <div className='bg-green-100 text-xl p-2 rounded-lg flex justify-between items-center text-green-600'>
              <Link to='/foodAdmin/ordersDetails'>See Orders Details </Link>
              <Link to='/foodAdmin/ordersDetails'>
                <i class='bi bi-arrow-right-short text-4xl'></i>
              </Link>
            </div>

            <div className='grid grid-cols-12 my-6 gap-6'>
              <div className='col-span-4 border border-gray-400 rounded-lg py-4 ps-4'>
                <p className='text-gray-600 text-lg'>Total orders</p>
                <p className='text-2xl font-semibold'>125</p>
              </div>
              <div className='col-span-4 border border-gray-400 rounded-lg py-4 ps-4'>
                <p className='text-gray-600 text-lg'>Delivered</p>
                <p className='text-2xl font-semibold'>90</p>
              </div>
              <div className='col-span-4 border bg-slate-50 border-gray-400 rounded-lg py-4 ps-4'>
                <p className='text-gray-600 text-lg'>Cancelled</p>
                <p className='text-2xl font-semibold'>05</p>
              </div>
            </div>

            <div className='  w-full'>
              <MasterChartPage />
            </div>
          </div>
          <div className='col-span-12 lg:col-span-6 bg-white p-4 rounded-lg pb-8'>
            <p className='text-xl font-bold'>Earning & Platform Charge</p>

            <div
              class='inline-flex my-6 rounded-md shadow-sm  bg-gray-200'
              role='group'>
              <button
                type='button'
                class='px-4 py-2 text-sm  font-semibold   border border-gray-200 rounded-s-lg text-blue-700 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:bg-white  focus:text-gray-900 '>
                Monthly
              </button>
              <button
                type='button'
                class='px-4 py-2 text-sm font-semibold   border border-gray-200  text-blue-700 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:bg-white  focus:text-gray-900 '>
                Weekly
              </button>
              <button
                type='button'
                class='px-4 py-2 text-sm font-semibold   border border-gray-200 rounded-e-lg text-blue-700 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:bg-white  focus:text-gray-900 '>
                Today
              </button>
            </div>
            <div>
              <MasterApexChart />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-12 mt-10 pb-20 gap-6'>
          <div className='col-span-12 lg:col-span-6 bg-white p-4 rounded-lg pb-8'>
            <p className='text-xl font-bold'>Active Restaurants</p>
            <div className='flex items-center justify-between mt-12 '>
              <div className='flex items-center gap-3'>
                <img src={Taco} className='h-8' alt='' />
                <div class='text-slate-700 dark:text-slate-700'>
                  Active Resturans (25)
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div class='w-44 bg-gray-200 rounded-full md:h-2 h-1  dark:bg-gray-700'>
                  <div class='bg-yellow-600 w-[70%] md:h-2 h-1 rounded-full dark:bg-yellow-500'></div>
                </div>
                <p className='text-slate-700 '>30 (90%)</p>
              </div>
            </div>
            <div className='flex items-center justify-between mt-3 '>
              <div className='flex items-center gap-3'>
                <img src={TacoTwo} className='h-8' alt='' />
                <div class=' text-slate-700 dark:text-slate-700'>
                  Inactive Resturans (25)
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div class='w-44 bg-gray-200 rounded-full md:h-2 h-1  dark:bg-gray-700'>
                  <div class='bg-red-600 w-[15%] md:h-2 h-1 rounded-full dark:bg-red-500'></div>
                </div>
                <p className='text-slate-700 '>10 (10%)</p>
              </div>
            </div>
          </div>
          <div className='col-span-12 lg:col-span-6 bg-white p-4 rounded-lg pb-8'>
            <p className='text-xl font-bold'>Top Restaurants</p>
            <div className='flex items-center justify-between mt-3 '>
              <div className='flex items-center gap-3'>
                <img src={Item} className='h-10' alt='' />
                <div class=''>
                  <p className=' font-semibold'>Ghore Baire Restaurant</p>
                  <p className='text-blue-700 text-sm'>200 Items</p>
                </div>
              </div>
              <p className=' font-semibold'>Order 200 Times</p>
            </div>
            <div className='flex items-center justify-between mt-3 '>
              <div className='flex items-center gap-3'>
                <img src={ItemTwo} className='h-10' alt='' />
                <div class=''>
                  <p className=' font-semibold'>9X9 Restaurant </p>
                  <p className='text-blue-700 text-sm'>100 Items</p>
                </div>
              </div>
              <p className=' font-semibold'>Order 100 Times</p>
            </div>
            <div className='flex items-center justify-between mt-3 '>
              <div className='flex items-center gap-3'>
                <img src={ItemThree} className='h-10' alt='' />
                <div class=''>
                  <p className=' font-semibold'>S.K. Restaurant</p>
                  <p className='text-blue-700 text-sm'>70 Items</p>
                </div>
              </div>
              <p className=' font-semibold'>Order 70 Times</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterDashboard;
