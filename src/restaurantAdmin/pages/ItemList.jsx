import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useAuth } from "../../AuthContext";

const ItemList = ({ items, toggle, fetchData }) => {
  const currentUserParam = useParams()
  const currentUser = currentUserParam['id']
  // console.log(currentUser)
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleOptionsToggle = (item) => {
    setSelectedItem(item);
    setShowOptions(false);
  };

  const handleEdit = () => {
    navigate(`edit/${encodeURIComponent(selectedItem.id)}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        // Delete from active-food-items
        await deleteDoc(doc(db, "restaurants", currentUser.uid, "active-food-items", id));

        // Delete from inactive-food-items
        await deleteDoc(doc(db, "restaurants", currentUser.uid, "inactive-food-items", id));

        alert("Item deleted successfully from both collections");

        await fetchData(); // Refresh data after deletion
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert("Error deleting item");
      }
    }
  };

  // Function to activate an item (move to active-food-items)
  const handleActivate = async (item) => {
    if (!item) return; // Ensure item is not null or undefined
    alert("Activating item...");

    try {
      // Check if the item already exists in active-food-items
      const activeItemQuery = query(
        collection(db, "active-food-items"),
        where("itemId", "==", item.itemId)
      );
      const activeItemSnapshot = await getDocs(activeItemQuery);

      if (activeItemSnapshot.empty) {
        // Remove the item from inactive-food-items
        await deleteDoc(doc(db, "restaurants", currentUser.uid, "inactive-food-items", item.id));

        // Add the item to active-food-items with active: true
        await setDoc(doc(db, "restaurants", currentUser.uid, "active-food-items", item.id), {
          ...item,
          active: true,
        });

        alert("Item activated successfully!");

        // Refresh the data
        fetchData();
      } else {
        console.log("Item already exists in active-food-items");
      }
    } catch (error) {
      console.error("Error activating item:", error);
    }
  };

  // Function to deactivate an item (move to inactive-food-items)
  const handleInactive = async (item) => {
    if (!item) return; // Ensure item is not null or undefined
    alert("Deactivating item...");

    try {
      // Check if the item exists in active-food-items
      const activeItemQuery = query(
        collection(db, "active-food-items"),
        where("itemId", "==", item.itemId)
      );
      const activeItemSnapshot = await getDocs(activeItemQuery);

      if (!activeItemSnapshot.empty) {
        // Remove the item from active-food-items
        await deleteDoc(doc(db, "restaurants", currentUser.uid, "active-food-items", item.id));

        // Add the item to inactive-food-items with active: false
        await setDoc(doc(db, "restaurants", currentUser.uid, "inactive-food-items", item.id), {
          ...item,
          active: false,
        });

        alert("Item deactivated successfully!");

        // Refresh the data
        fetchData();
      } else {
        console.log("Item doesn't exist in active-food-items");
      }
    } catch (error) {
      console.error("Error deactivating item:", error);
    }
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="grid grid-cols-12 mt-6 shadow-xl">
          <div className="lg:col-span-4 md:col-span-6 col-span-8">
            <div className="flex items-center gap-4 w-28 obj">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  className="w-full object-cover aspect-square rounded-md"
                  alt={item.itemName}
                  onError={(e) =>
                    (e.target.src = "/path/to/fallback/image.jpg")
                  }
                />
              ) : (
                <div className="h-20 w-20 bg-gray-200 flex items-center justify-center">
                  <p>No Image</p>
                </div>
              )}
              <div>
                <p className="text-xl mb-2 text-slate-700">{item.itemName}</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 md:col-span-3 col-span-4">
            <div className="px-6 py-4">
              <p className="text-black font-bold">{item.itemId}</p>
              Item ID
            </div>
          </div>
          <div className="lg:col-span-2 md:col-span-3 col-span-4">
            <div className="px-6 py-4">
              <p className="font-bold">{item.price}</p>
              Price
            </div>
          </div>
          <div className="lg:col-span-2 md:col-span-3 col-span-4 md:col-start-7">
            <div className="md:ps-6 px-6 py-4">
              <p className="text-black font-bold text-xl">
                <i className="bi bi-bar-chart-fill text-blue-600"></i>
              </p>
              Total
            </div>
          </div>
          <div className="lg:col-span-2 md:col-span-3 col-span-4 md:col-start-10">
            <div className="md:ps-6 py-4 mt-3">
              <Link
                onClick={() => handleOptionsToggle(item)}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline border-blue-400 border p-1 px-2 rounded-lg"
              >
                <i className="bi bi-eye-fill"></i> View
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Popup Section */}
      {selectedItem && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={() => setSelectedItem(null)} // Clicking outside closes the popup
        >
          <div
            className="bg-white p-8 rounded-xl shadow-lg lg:w-[34rem] max-lg:max-w-lg"
            onClick={(e) => e.stopPropagation()} // Prevent popup close when clicking inside
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-blue-500 font-bold">
                Item ID: {selectedItem.itemId}
              </p>
              <div className="relative">
                <i
                  onClick={() => setShowOptions(!showOptions)}
                  className="bi p-1 bg-slate-100 px-2 rounded-full font-bold text-xl bi-three-dots-vertical cursor-pointer"
                ></i>
                {showOptions && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-lg">
                    <ul>
                      <li
                        onClick={handleEdit}
                        className="p-2 hover:bg-slate-100 cursor-pointer"
                      >
                        Edit
                      </li>
                      {toggle ? (
                        <li
                          onClick={() => handleActivate(selectedItem)}
                          className="p-2 hover:bg-slate-100 cursor-pointer"
                        >
                          Activate
                        </li>
                      ) : (
                        <li
                          onClick={() => handleInactive(selectedItem)}
                          className="p-2 hover:bg-slate-100 cursor-pointer"
                        >
                          Deactivate
                        </li>
                      )}
                      <li
                        onClick={() => handleDelete(selectedItem.id)}
                        className="p-2 hover:bg-slate-100 cursor-pointer"
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-start gap-x-6">
              <span className="flex-1">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.itemName}
                  className="w-full h-full aspect-square object-cover rounded-xl"
                />
              </span>
              <span className="flex-1 flex items-start justify-start flex-col">
                <h2 className="text-lg">{selectedItem.itemName}</h2>
                <p className="">
                  Price: {selectedItem.price} |{" "}
                  <strong className="text-green-600 font-normal">
                    {selectedItem.discount} % discount
                  </strong>
                </p>
                <p className="my-3">{selectedItem.description}</p>
                <p className="my-3">Category - {selectedItem.category}</p>
                <p className="bg-yellow-500/30 rounded-md px-2 text-orange-600 my-4">
                  {selectedItem.itemType}
                </p>
              </span>
            </div>

            {/* <button
              onClick={() => setSelectedItem(null)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
