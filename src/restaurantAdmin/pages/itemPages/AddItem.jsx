import { useState } from "react";
import { Link } from "react-router-dom";
import { db, storage } from "../../../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { MdFileUpload } from "react-icons/md";

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

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
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
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Upload failed:", error);
          },
          async () => {
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            await saveItemData(imageUrl);
          }
        );
      } else {
        await saveItemData(imageUrl);
      }
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
      active: false, // Adding active with default value of false
    });
    alert("Item added successfully!");
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
          {/* Image Upload Section */}
          <div className="w-1/3 flex items-center justify-start flex-col">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG, or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Upload Button */}
            <button
              onClick={handleAddItem}
              className="mt-4 bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-1"
              disabled={uploading}
            >
              <MdFileUpload />
              {uploading ? "Uploading..." : "Upload"}
            </button>
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
