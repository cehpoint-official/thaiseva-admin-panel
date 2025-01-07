import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import { db } from "../../../firebaseConfig"; // Adjust path as needed
import Taco from "../../assets/Taco.png";
import TacoTwo from "../../assets/Taco2.png";
import { useParams } from "react-router-dom";

const FoodStats = () => {
  const [totalFoods, setTotalFoods] = useState(0);
  const [availableFoods, setAvailableFoods] = useState(0);
  const [notAvailableFoods, setNotAvailableFoods] = useState(0);
  const [loading, setLoading] = useState(true); // Initialize loading state

  const { id } = useParams();

  useEffect(() => {
    const getRestId = async () => {
      try {
        const restCollectionRef = collection(
          db,
          `restaurants/${id}/restaurantDetails`
        );
        const restSnapshot = await getDocs(restCollectionRef);
        const restId = restSnapshot.docs[0].id;
        return restId;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    const fetchData = async () => {
      setLoading(true); // Start loading
      const db = getFirestore();
      //   const parentDocRef = doc(db, 'items', parentDocId);
      try {
        // Fetch active food items
        // const activeCollectionRef = collection(db, 'active-food-items');
        // const activeSnapshot = await getDocs(activeCollectionRef);
        // const activeCount = activeSnapshot.size;

        const restId = await getRestId();

        const itemsCollectionRef = collection(db, `food_items/${restId}/items`);
        const itemsSnapshot = await getDocs(itemsCollectionRef);

        // Fetch active food items
        const activeCount = itemsSnapshot.docs.filter(
          (doc) => doc.data().active === true
        ).length;

        // Fetch inactive food items
        const inactiveCount = itemsSnapshot.docs.filter(
          (doc) => doc.data().active === false
        ).length;

        // Set total foods and individual counts
        setTotalFoods(activeCount + inactiveCount);
        setAvailableFoods(activeCount);
        setNotAvailableFoods(inactiveCount);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []);

  // Calculate percentages
  const availablePercentage =
    totalFoods > 0 ? (availableFoods / totalFoods) * 100 : 0;
  const notAvailablePercentage =
    totalFoods > 0 ? (notAvailableFoods / totalFoods) * 100 : 0;

  return (
    <div className="col-span-12 lg:col-span-6 bg-white p-4 rounded-lg pb-8">
      <p className="text-xl font-bold">Food Item Status</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex items-center justify-between mt-12">
            <div className="flex items-center gap-3">
              <img src={Taco} className="h-8" alt="Available Foods" />
              <div className="text-slate-700 dark:text-slate-700">
                Active Items
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-44 bg-gray-200 rounded-full md:h-2 h-1 dark:bg-gray-700">
                <div
                  className="bg-yellow-600 md:h-2 h-1 rounded-full dark:bg-yellow-500"
                  style={{ width: `${availablePercentage}%` }}
                ></div>
              </div>
              <p className="text-slate-700">
                {availableFoods} ({availablePercentage.toFixed(0)}%)
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1">
              <img src={TacoTwo} className="h-8" alt="Not Available Foods" />
              <div className="text-slate-700 dark:text-slate-700">
                Inactive Items
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-44 bg-gray-200 rounded-full md:h-2 h-1 dark:bg-gray-700">
                <div
                  className="bg-red-600 md:h-2 h-1 rounded-full dark:bg-red-500"
                  style={{ width: `${notAvailablePercentage}%` }}
                ></div>
              </div>
              <p className="text-slate-700">
                {notAvailableFoods} ({notAvailablePercentage.toFixed(0)}%)
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FoodStats;
