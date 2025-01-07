import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig"; // Import your configured Firebase database
import ViewFoodItem from "../../component/ViewItem";

const RestaurantReqDet = () => {
  const { id } = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const docRef = doc(db, "restroRequests", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRestaurantData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [id]);

  const handleAccept = async () => {
    try {
      const requestDocRef = doc(db, "restroRequests", id);
      const requestDocSnap = await getDoc(requestDocRef);

      if (requestDocSnap.exists()) {
        const restaurantData = requestDocSnap.data();
        restaurantData.status = "Verified";
        const acceptedDocRef = doc(db, "acceptedRestaurants", id);
        await setDoc(acceptedDocRef, restaurantData);
        await deleteDoc(requestDocRef);

        alert("Request Accepted and Verified");
      } else {
        alert("No such request exists!");
      }
    } catch (error) {
      console.error("Error accepting request: ", error);
      alert("Failed to accept request");
    }
  };

  const handleReject = async () => {
    try {
      const requestDocRef = doc(db, "restroRequests", id);
      const requestDocSnap = await getDoc(requestDocRef);

      if (requestDocSnap.exists()) {
        const restaurantData = requestDocSnap.data();
        restaurantData.status = "Rejected";
        const acceptedDocRef = doc(db, "rejectedRestaurants", id);
        await setDoc(acceptedDocRef, restaurantData);
        await deleteDoc(requestDocRef);

        alert("Request Accepted and Verified");
      } else {
        alert("No such request exists!");
      }
    } catch (error) {
      console.error("Error accepting request: ", error);
      alert("Failed to accept request");
    }
  };

  const fetchFoodItem = async () => {
    setLoading(true);
    try {
      const foodItemsRef = collection(db, `food_items/${id}/items`);
      const querySnapshot = await getDocs(foodItemsRef);

      if (!querySnapshot.empty) {
        const fetchedItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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
    fetchFoodItem();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!restaurantData) {
    return <p>No data found</p>;
  }

  return (
    <div className="bg-slate-100 px-8 pt-10">
      <div className="flex justify-between items-center">
        <Link
          to="/foodAdmin/restaReuest"
          className="lg:text-3xl md:text-2xl font-bold text-blue-600"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </Link>
      </div>

      <div className="grid grid-cols-12 bg-white p-6 gap-4 mt-10 rounded-lg">
        <div className="col-span-12 md:col-span-5 p-2 md:mt-14">
          <img
            src={
              restaurantData.imageUrl ||
              restaurantData.photo ||
              "https://via.placeholder.com/500x300?text=No+Image"
            }
            alt={restaurantData.name || "Restaurant"}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="col-span-12 md:col-span-7 p-2">
          <div className="text-end">
            <p className="text-slate-700 font-semibold">Restaurant ID</p>
            <p className="text-xl text-blue-700 font-semibold">
              {restaurantData.id}
            </p>
          </div>
          <p className="mt-2 text-slate-800 text-3xl font-bold">
            {restaurantData.name}
          </p>
          <p className="mt-1 text-slate-500 text-sm">
            {restaurantData.keywords}
          </p>
          <p className="mt-6 text-slate-800 text-xl font-semibold">
            Description
          </p>
          <p className="text-slate-500 mt-2 text-lg">
            {restaurantData.description}
          </p>

          <p className="mt-6 text-slate-800 text-xl font-semibold">Location</p>
          <p className="text-slate-500 mt-2 text-lg">
            {restaurantData.location}
          </p>
          <div className="grid grid-cols-12 gap-2 mt-6">
            <div className="lg:col-span-5 col-span-12">
              <p className=" text-slate-800 text-xl font-semibold">
                Phone Number
              </p>
              <p className="text-slate-500 mt-1 text-lg">
                {restaurantData.phoneNumber}
              </p>
            </div>
            <div className="col-span-2 hidden lg:block border-s border-slate-400"></div>
            <div className="lg:col-span-5 col-span-12">
              <p className=" text-slate-800 text-xl font-semibold">Email ID</p>
              <p className="text-slate-500 mt-1 text-lg">
                {restaurantData.emailId}
              </p>
            </div>
          </div>

          <div className="mt-10 w-full">
            <p className="text-slate-800 text-xl font-semibold">Menu Items</p>
            <button
              onClick={() => setShowMenu(true)} // Set showMenu to true when clicked
              className="py-2 text-slate-100 font-semibold bg-blue-500 px-4 rounded-md"
            >
              View all Menus
            </button>
          </div>

          {showMenu && (
            <ViewFoodItem items={items} onClose={() => setShowMenu(false)} />
          )}

          <div className="flex justify-end mt-10 gap-4">
            <button
              onClick={handleReject}
              className="bg-gray-400 px-3 p-2 text-lg text-white font-semibold rounded-lg"
            >
              Reject Request
            </button>
            <button
              onClick={handleAccept}
              className="bg-blue-700 px-3 p-2 text-lg text-white font-semibold rounded-lg"
            >
              Accept Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantReqDet;
