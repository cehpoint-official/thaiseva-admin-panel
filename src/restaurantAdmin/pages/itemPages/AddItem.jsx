import { useState } from "react";
import { Link } from "react-router-dom";
import { db, storage } from "../../../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { MdFileUpload } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";

const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemId, setItemId] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [itemType, setItemType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setDropdownOpen(false); // Close dropdown after selecting
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
      setDropdownOpen(false); // Close dropdown after dropping
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleAddItem = async () => {
    if (
      !itemName ||
      !itemId ||
      !price ||
      !category ||
      !itemType ||
      !description
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      let imageUrl = "";

      if (image) {
        const imageRef = ref(storage, `images/${itemId}`);
        const uploadTask = uploadBytesResumable(imageRef, image);

        setUploading(true);
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              console.error("Upload failed:", error);
              reject(error);
            },
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      await saveItemData(imageUrl);
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  const saveItemData = async (imageUrl) => {
    await setDoc(doc(db, "inactive-food-items", itemId), {
      itemName,
      itemId,
      price,
      discount,
      category,
      itemType,
      description,
      imageUrl,
      active: false,
    });
    alert("Item added successfully!");
    setItemName('')
    setItemId('')
    setPrice('')
    setCategory('')
    setItemType('')
    setDescription('')
    setImage(null)
    setUploading(false);
  };

  return (
    <div className="bg-slate-100 px-8 pt-10">
      <Link
        to="/foodItem"
        className="lg:text-3xl md:text-2xl font-bold text-blue-600"
      >
        <i className="bi bi-arrow-left me-2"></i>
        Back
      </Link>

      <div className="bg-white p-10 mt-10 rounded-lg">
        <p className="text-center text-2xl mb-10">Add Item Info</p>

        <div className="flex gap-20">
          <div className="flex flex-col w-1/3">
            {/* Display selected image */}
            <div className="mt-4 border w-full h-60 flex items-center justify-center">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
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
            <div className="w-full flex items-center justify-start flex-col">
              {/* Upload Button */}
              <p className="text-gray-400 text-xs">(Upload your restaurant image, <br /> Format - jpg,png,jpeg) </p>
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
                      <p className="text-sm absolute bottom-5 text-gray-400">Support JPEG,JPG,PNG</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Section */}
          <div className="w-2/3">
            <form className="space-y-6">
              {/* Form Field for Label + Input in the same line */}
              <div className="flex items-center space-x-4">
                <label className="w-[10rem] text-sm font-medium text-gray-700">
                  Item Name
                </label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  placeholder="Enter item name"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-[10rem] text-sm font-medium text-gray-700">
                  Item ID
                </label>
                <input
                  type="text"
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  placeholder="Enter item ID"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-[10rem] text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="tel"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  placeholder="Enter price"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-[10rem] text-sm font-medium text-gray-700">
                  Discount
                </label>
                <input
                  type="text"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  placeholder="Enter discount"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-[10rem] text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  placeholder="Enter category"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-[10rem] text-sm font-medium text-gray-700">
                  Item Type
                </label>
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="Veg">Veg</option>
                  <option value="Non Veg">Non Veg</option>
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-[10rem] text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  placeholder="Enter description"
                />
              </div>

              <button
                type="button"
                onClick={handleAddItem}
                className="bg-green-600 text-white py-2 px-4 rounded-lg w-[15rem]"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Add new food Item"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
