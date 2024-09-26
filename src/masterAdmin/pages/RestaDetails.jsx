import React, { useEffect, useState } from "react";
import ItemOne from "../../assets/masterAdmin/restaDetails1.png";
import ItemTwo from "../../assets/masterAdmin/restaDetails2.png";
import ItemThree from "../../assets/masterAdmin/restaDetails3.png";
import ItemFour from "../../assets/masterAdmin/restaDetails4.png";
import PopImg from "../../assets/itemImg/popImg.png";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const RestaDetails = () => {
  const [toggle, setToggle] = useState(true); // For toggling between active/inactive
  const [restaurants, setRestaurants] = useState([]); // To store fetched restaurants
  const [loading, setLoading] = useState(true); // To handle loading state

  // Fetch restaurants from Firestore
  const fetchRestaurants = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "acceptedRestaurants")
      );
      const restaurantData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(restaurantData);
      setRestaurants(restaurantData);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Filter restaurants based on active state
  const activeRestaurants = restaurants.filter(
    (restaurant) => restaurant.active
  );
  const inactiveRestaurants = restaurants.filter(
    (restaurant) => !restaurant.active
  );
//   console.log(inactiveRestaurants[0]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <>
      <div className="bg-slate-100 px-6 pt-10">
        <div className="">
          <p className="lg:text-3xl md:text-2xl font-bold text-blue-600">
            Restaurant Details
          </p>
        </div>

        <div className="bg-white p-6 py-10 mt-8 rounded-lg relative">
          <div className=" mb-10">
            <button
              type="button"
              onClick={(e) => setToggle(true)}
              className="focus:text-white hover:text-white ring-1 ring-slate-200  focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Active Restaurant
            </button>
            <button
              type="button"
              onClick={(e) => setToggle(false)}
              className="focus:text-white hover:text-white ring-1 ring-slate-200  focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Inactive Restaurant
            </button>
          </div>

          <div>
            {toggle ? (
              <>
                {activeRestaurants.length>0 ?
                  activeRestaurants.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 mt-6 shadow-lg  p-1 pb-2 rounded-lg">
                      <div className="lg:col-span-4 md:col-span-6 col-span-8 ">
                        <div className="flex items-center gap-4">
                        <img
                            src={item.imageUrl || item.photo}
                            className="h-20 mt-2 aspect-square"
                            alt="Hotel Image"
                          />
                          <div className="">
                            <p className="text-xl  mb-1  text-slate-700">
                              {item.name || 'No name'}
                            </p>
                            <span>{item.location || item.address} </span>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-2 md:col-span-3 col-span-4  ">
                        <div className="px-6 py-4">
                          <p className="text-black font-bold">{item.id}</p>
                          ID
                        </div>
                      </div>
                      <div className="lg:col-span-2 md:col-span-3 col-span-4 ">
                        <div className="px-6 py-4">
                          <p className="font-bold text-slate-400">
                          {item.active ? 'Active' : 'Inactive'}
                          </p>
                          Status
                        </div>
                      </div>
                      <div className="lg:col-span-2 md:col-span-3 col-span-4 md:col-start-4 ">
                        <div className="md:ps-6 px-6 py-4">
                          <p className="text-black font-bold text-xl">
                            <i className="bi bi-bar-chart-fill text-blue-600"></i>{" "}
                            ???
                          </p>
                          Total sales
                        </div>
                      </div>
                      <div className="lg:col-span-2 md:col-span-4 col-span-4 md:col-start-8 ">
                        <div className="md:ps-6 py-4 mt-3">
                          <Link
                            to="/foodAdmin/restaDetails/restaDetailsView"
                            className="font-medium  text-blue-600 dark:text-blue-500 hover:underline border-blue-400 border p-1 px-2 rounded-lg"
                          >
                            <i className="bi bi-eye-fill"></i> View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  )):(
                    <p>No Active Hotels</p>
                  )}
              </>
            ) : (
              <>
                {inactiveRestaurants.length>0  ?
                  inactiveRestaurants.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 mt-6 shadow-lg  p-1 pb-2 rounded-lg">
                      <div className="lg:col-span-4 md:col-span-6 col-span-8 ">
                        <div className="flex items-center gap-4">
                        <img
                            src={item.imageUrl || item.photo}
                            className="h-20 mt-2 aspect-square"
                            alt="Hotel Image"
                          />
                          <div className="">
                            <p className="text-xl  mb-1  text-slate-700">
                              {item.name || 'No name'}
                            </p>
                            <span>{item.location || item.address} </span>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-2 md:col-span-3 col-span-4  ">
                        <div className="px-6 py-4">
                          <p className="text-black font-bold">{item.id}</p>
                          ID
                        </div>
                      </div>
                      <div className="lg:col-span-2 md:col-span-3 col-span-4 ">
                        <div className="px-6 py-4">
                          <p className="font-bold text-slate-400">
                          {item.active ? 'Active' : 'Inactive'}
                          </p>
                          Status
                        </div>
                      </div>
                      <div className="lg:col-span-2 md:col-span-3 col-span-4 md:col-start-4 ">
                        <div className="md:ps-6 px-6 py-4">
                          <p className="text-black font-bold text-xl">
                            <i className="bi bi-bar-chart-fill text-blue-600"></i>{" "}
                            ???
                          </p>
                          Total sales
                        </div>
                      </div>
                      <div className="lg:col-span-2 md:col-span-4 col-span-4 md:col-start-8 ">
                        <div className="md:ps-6 py-4 mt-3">
                          <Link
                            to="/foodAdmin/restaDetails/restaDetailsView"
                            className="font-medium  text-blue-600 dark:text-blue-500 hover:underline border-blue-400 border p-1 px-2 rounded-lg"
                          >
                            <i className="bi bi-eye-fill"></i> View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  )):(
                    <p>No Inactive Hotels</p>
                  )
                }
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaDetails;
