import { Link, useParams } from "react-router-dom";
import { MdFileUpload } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { useEffect } from "react";

const Template = ({
  image,
  setDescription,
  setDiscount,
  setDropdownOpen,
  setItemId,
  setItemName,
  setCategory,
  setPrice,
  dropdownOpen,
  uploading,
  handleAddItem,
  handleDragOver,
  handleDrop,
  handleFileChange,
  itemId,
  itemName,
  itemType,
  price,
  discount,
  category,
  description,
  setItemType,
  submitBtn = "Add new food Item",
  IdDisable = false,
}) => {
  const { id } = useParams();
  useEffect(() => {
    console.log(itemType);
  }, [itemType, setItemType]);
  return (
    <div className="bg-slate-100 px-8 pt-10">
      <Link
        to={`/${id}/foodItem`}
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
            <div className="w-full flex items-center justify-start flex-col">
              {/* Upload Button */}
              <p className="text-gray-400 text-xs">
                (Upload your restaurant image, <br /> Format - jpg,png,jpeg){" "}
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
                        Support JPEG,JPG,PNG
                      </p>
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
                  placeholder="enter item name here like momos..."
                />
              </div>

              <div className="flex items-center space-x-4">
                <label
                  className={`w-[10rem] text-sm font-medium ${
                    IdDisable ? "text-gray-500" : "text-gray-700"
                  }`}
                >
                  Item ID
                </label>
                <input
                  type="text"
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ${
                    IdDisable && "text-gray-500"
                  }`}
                  placeholder="Enter item ID"
                  readOnly={IdDisable} // Conditionally make it read-only
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-[10rem] text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  placeholder="฿ 0XX..."
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-[10rem] text-sm font-medium text-gray-700">
                  Discount
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={discount}
                  onChange={(e) => {
                    let inputValue = e.target.value;
                    if (
                      inputValue === "" ||
                      (Number(inputValue) >= 0 && Number(inputValue) <= 100)
                    ) {
                      setDiscount(inputValue);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  placeholder="0 - 100"
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
                  placeholder="Breakfast, Fastfood, ..."
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-[10rem] text-sm font-medium text-gray-700">
                  Item Type
                </label>
                <div className="w-full px-3 py-2 flex gap-10">
                  <label className="flex gap-3 pr-5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none">
                    <input
                      type="radio"
                      name="foodType"
                      value="Veg"
                      onChange={(e) => setItemType(e.target.value)}
                    />
                    Veg
                  </label>
                  <label className="flex gap-3 pr-5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none">
                    <input
                      type="radio"
                      name="foodType"
                      value="Non Veg"
                      onChange={(e) => setItemType(e.target.value)}
                    />
                    Non Veg
                  </label>
                </div>
                {/* <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="Veg">Veg</option>
                  <option value="Non Veg">Non Veg</option>
                </select> */}
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-[10rem] text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  placeholder="Tell more about this item.."
                  style={{ resize: "none" }}
                  rows={3}
                />
              </div>

              <button
                type="button"
                onClick={handleAddItem}
                className="bg-green-600 text-white py-2 px-4 rounded-lg w-[15rem]"
                disabled={uploading}
              >
                {submitBtn}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
