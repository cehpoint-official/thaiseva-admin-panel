import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link, useParams, useNavigate } from "react-router-dom"; // Add useNavigate for redirection
import ItemList from "./ItemList";

const FoodItem = () => {
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [restaurantExists, setRestaurantExists] = useState(false); // State to track if restaurant exists
  const currentUserParam = useParams();
  const currentUser = currentUserParam['id'];
  const navigate = useNavigate(); // Navigation hook

  // Fetch restaurant data to check if the user has a restaurant
  const checkRestaurant = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, `restaurants/${currentUser}/restaurantDetails`)
      );
      if (!querySnapshot.empty) {
        setRestaurantExists(true);
      } else {
        setRestaurantExists(false);
        navigate(`/${currentUser}/restaurant/addrestaurant/restaInformation`); // Redirect if no restaurant found
      }
    } catch (error) {
      console.error("Error checking restaurant: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch food items
  const fetchData = async () => {
    setLoading(true); // Start loading before fetching data
    try {
      // Adjust Firestore path to be specific to the current user's restaurant
      const querySnapshot = await getDocs(
        collection(
          db,
          `restaurants/${currentUser}/${
            toggle ? "inactive-food-items" : "active-food-items"
          }`
        )
      );
      const fetchedItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching items: ", error);
    } finally {
      setLoading(false); // Stop loading after fetching data
    }
  };

  useEffect(() => {
    checkRestaurant(); // Check if the user has a restaurant first
  }, []);

  useEffect(() => {
    if (restaurantExists) {
      fetchData();
    }
  }, [toggle, restaurantExists]);

  return (
    <div className="bg-slate-100 px-8 pt-10">
      <div className="flex justify-between">
        <p className="lg:text-3xl md:text-2xl font-bold text-blue-600">
          Food Item
        </p>
        {restaurantExists && (
          <Link to="addItem">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              + Add a new food Item
            </button>
          </Link>
        )}
      </div>

      <div className="bg-white p-10 mt-10 rounded-lg relative">
        <div className="mb-10">
          <button
            type="button"
            onClick={() => setToggle(false)}
            className={`focus:text-white hover:text-white ring-1 ring-slate-100 focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 ${
              !toggle ? "bg-blue-700 text-white" : "bg-white text-blue-700"
            }`}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => setToggle(true)}
            className={`focus:text-white hover:text-white ring-1 ring-slate-100 focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 ${
              toggle ? "bg-blue-700 text-white" : "bg-white text-blue-700"
            }`}
          >
            Inactive
          </button>
        </div>

        {/* Loading message */}
        {loading ? (
          <p>Loading...</p>
        ) : restaurantExists ? (
          items.length === 0 ? (
            <p>No items yet</p>
          ) : (
            <ItemList items={items} toggle={toggle} fetchData={fetchData} />
          )
        ) : (
          <p>No restaurant found. Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
