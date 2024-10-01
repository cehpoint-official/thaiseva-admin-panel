import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { Link, useParams, useNavigate } from "react-router-dom"; // Add useNavigate for redirection
import ItemList from "./ItemList";

const FoodItem = () => {
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [restaurantExists, setRestaurantExists] = useState(false); // State to track if restaurant exists
  const currentUserParam = useParams();
  const currentUser = currentUserParam['id'];
  console.log(currentUser)
  const navigate = useNavigate();
  const [resId, setResId] = useState('');

  useEffect(() => {
    document.title ='Thaiseva | Food Item'
  }, [])

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


  const fetchRestaurantDetails = async () => {
    try {
      const restaurantDetailsRef = collection(
        db,
        `restaurants/${currentUser}/restaurantDetails`
      );
      const q = query(restaurantDetailsRef);
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.empty)

      if (!querySnapshot.empty) {
        const restaurantDoc = querySnapshot.docs[0];
        const restaurantId = restaurantDoc.id;
        setResId(restaurantId);
      } else {
        console.log("No restaurant found for this user.");
      }
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };

  useEffect(() => {
    fetchRestaurantDetails();
  }, []);

  useEffect(() => {
      console.log("ResId updated: ", resId);
  }, [resId]);


  const fetchData = async () => {
    setLoading(true);
    try {
      const foodItemsRef = collection(db, `food_items/${resId}/items`); 
      const querySnapshot = await getDocs(foodItemsRef); 
  
      if (!querySnapshot.empty) {
        const fetchedItems = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((item) => item.active === !toggle);
  
        setItems(fetchedItems); 
        console.log(fetchedItems); 
      } else {
        console.log("No food items found for this restaurant.");
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
    } finally {
      setLoading(false); // Stop loading state
    }
  }; 
  

  useEffect(() => {
    checkRestaurant();
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
