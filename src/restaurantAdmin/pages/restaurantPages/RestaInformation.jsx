import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, storage } from "../../../../firebaseConfig";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { MdFileUpload, MdLocationOn } from "react-icons/md";
import axios from "axios";
import { useAuth } from "../../../AuthContext";
import { FaImages, FaRegImage } from "react-icons/fa";

const RestaInformation = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [foodType, setFoodType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate()

  const GOOGLE_API_KEY = "AIzaSyDwTBiBiGtJLrlbaiKzVN5BBCj8He1l5Zc";

  const handleSubmit = async () => {
    try {
      // Add to the 'restaurants' collection (with a specific restaurantId)
      await setDoc(
        doc(
          db,
          "restaurants",
          currentUser.uid,
          "restaurantDetails",
          restaurantId
        ),
        {
          name: restaurantName,
          id: restaurantId,
          phoneNumber,
          emailId,
          foodType,
          location,
          description,
          imageUrl: image,
          status: "Pending",
        }
      );

      // Add to the 'restroRequests' collection (with a specific restaurantId)
      await setDoc(doc(db, "restroRequests", restaurantId), {
        name: restaurantName,
        id: restaurantId,
        phoneNumber,
        emailId,
        foodType,
        location,
        description,
        imageUrl: image,
        status: "Pending", // You can include status to track the request status
      });

      alert("Restaurant information saved successfully");
      setRestaurantName("");
      setRestaurantId("");
      setPhoneNumber("");
      setEmailId("");
      setFoodType("");
      setLocation("");
      setDescription("");
      setImage("");
      setUploading(false);
      navigate(`/${currentUser.uid}/restaurant`)
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      setUploading(true);
      const storageRef = ref(storage, `restaurantImages/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setImage(url); // Set the uploaded image URL
      setUploading(false);
      setDropdownOpen(false); // Close the dropdown after image selection
    } catch (error) {
      console.error("Error uploading image: ", error);
      setUploading(false);
    }
  };
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleImageUpload(file); // Pass the file directly to handleImageUpload
    }
  };
  
  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleImageUpload(file); // Pass the file directly to handleImageUpload
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default drag over behavior
  };
  
  

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const address = await reverseGeocode(lat, lon);
          setLocation(address);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`
      );
      if (response.data.status === "OK") {
        return response.data.results[0].formatted_address;
      } else {
        return "Unable to get location";
      }
    } catch (error) {
      console.error("Error fetching address: ", error);
      return "Error fetching address";
    }
  };

  

  return (
    <div className="bg-slate-100 px-8 pt-10">
      <Link
        to={`/${currentUser.uid}`}
        className="lg:text-3xl md:text-2xl font-bold text-blue-600"
      >
        <i className="bi bi-arrow-left me-2"></i>
        Back
      </Link>
      <div className="bg-white p-10 mt-10 rounded-lg">
        <p className="text-center text-2xl">RESTAURANT INFORMATION</p>
        <div className="grid grid-cols-12 mt-10">
          <div className="lg:col-span-4 md:col-span-8 col-span-12">
            <div className="flex flex-col w-full">
              {/* Display selected image */}
              <div className="mt-4 border w-full h-60 flex items-center justify-center">
                {image ? (
                  <img
                    src={image}
                    alt="Selected"
                    className="w-full h-full object-cover border border-gray-300 rounded"
                  />
                ) : (
                  <span className="w-full h-full flex items-center justify-center bg-gray-100">
                    <FaRegImage size={40} color="gray" />
                  </span>
                )}
              </div>

              {/* Image Upload Section */}
              <div className=" flex items-center justify-start flex-col">
                <p className="text-gray-400 text-xs">
                  (Upload your restaurant image, <br /> Format - jpg, png, jpeg)
                </p>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="mt-4 bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-1"
                  disabled={uploading}
                >
                  <MdFileUpload />
                  Upload
                </button>

                {/* Dropdown for Image Upload */}
                {dropdownOpen && (
                  <div
                    className="fixed inset-0 flex items-center justify-center z-10 bg-black/40"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <div className="bg-white border border-gray-300 rounded-lg p-10 shadow-lg w-[30rem] h-[23rem]">
                      <div
                        className="w-full h-full border-dashed border-2 border-gray-300 p-5 text-center cursor-pointer flex flex-col items-center justify-center relative"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                      >
                        <FaImages size={34} color="blue" />
                        <p className="my-3">Drag and drop</p>
                        <p>Or</p>
                        <input
                          type="file"
                          id="file-input"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <label
                          htmlFor="file-input"
                          className="block my-3 px-4 py-2 hover:bg-blue-600 cursor-pointer bg-blue-500 text-white rounded-md"
                        >
                          Select File
                        </label>
                        <p className="text-sm absolute bottom-5 text-gray-400">
                          Support JPEG, JPG, PNG
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 col-span-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <form className="rounded px-8 pb-8 mb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="restaurant-name"
                    >
                      Restaurant Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="restaurant-name"
                      type="text"
                      placeholder="Restaurant Name"
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="restaurant-id"
                    >
                      Restaurant ID
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="restaurant-id"
                      type="text"
                      placeholder="Restaurant ID"
                      value={restaurantId}
                      onChange={(e) => setRestaurantId(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="phone-number"
                    >
                      Phone Number
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="phone-number"
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email-id"
                    >
                      Email ID
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email-id"
                      type="email"
                      placeholder="Email ID"
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="food-type"
                    >
                      Food Type
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="food-type"
                      type="text"
                      placeholder="Food Type"
                      value={foodType}
                      onChange={(e) => setFoodType(e.target.value)}
                    />
                  </div>

                  <div className="mb-4 relative">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="location"
                    >
                      Location
                    </label>
                    <div className="relative">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                        id="location"
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                      >
                        <MdLocationOn size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="description"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleSubmit}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Save your Restaurant info
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaInformation;
