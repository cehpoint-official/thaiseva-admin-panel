import React, { useEffect, useRef } from "react";

const ViewFoodItem = ({ items, onClose }) => {
  const modalRef = useRef(null);

  // Handle click outside of the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close the modal when clicked outside
      }
    };

    // Add event listener to detect clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed z-40 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div ref={modalRef} className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">All Menu Items</h2>
        {items.length > 0 ? (
          <ul className="flex flex-col items-start justify-center gap-3 ml-4">
            {items.map((item) => (
              <span
                key={item.id}
                className="flex border rounded-md items-center justify-start gap-x-6 w-full overflow-hidden"
              >
                <img
                  src={item.imageUrl}
                  alt="item image"
                  className="aspect-square w-36 object-cover rounded-md"
                />
                <span className="flex flex-col justify-center items-start gap-y-0">
                  <p className="text-lg">{item.itemName}</p>
                  <p className="text-lg">
                    Price: {item.price} |{" "}
                    <strong className="text-green-500">
                      {item.discount}% discount
                    </strong>
                  </p>
                  <p className="text-lg text-wrap my-2">{item.description}</p>
                  <p className="text-lg text-wrap bg-orange-200 max-w-20 rounded-full text-center px-2">
                    {item.itemType}
                  </p>
                </span>
              </span>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-red-500">No Menu Yet</p>
        )}
      </div>
    </div>
  );
};

export default ViewFoodItem;
