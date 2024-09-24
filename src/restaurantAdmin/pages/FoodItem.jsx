import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import ItemList from "./ItemList";

const FoodItem = () => {
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchData = async () => {
    setLoading(true); // Start loading before fetching data
    try {
      const querySnapshot = await getDocs(
        collection(db, toggle ? "inactive-food-items" : "active-food-items")
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
    fetchData();
  }, [toggle]);

  return (
    <div className="bg-slate-100 px-8 pt-10">
      <div className="flex justify-between">
        <p className="lg:text-3xl md:text-2xl font-bold text-blue-600">
          Food Item
        </p>
        <Link to="addItem">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            + Add a new food Item
          </button>
        </Link>
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
        ) : (
          <ItemList items={items} toggle={toggle} fetchData={fetchData} />
        )}
      </div>
    </div>
  );
};

export default FoodItem;
