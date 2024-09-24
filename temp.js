import { useState } from "react";
import { db, storage } from "../../../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Template from "./Template";

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

  const docItemId = itemId.replace('#', '')
  const saveItemData = async (imageUrl) => {
    await setDoc(doc(db, "inactive-food-items", docItemId), {
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
    setItemName("");
    setItemId("");
    setPrice("");
    setCategory("");
    setItemType("");
    setDescription("");
    setImage(null);
    setUploading(false);
  };

  return (
    <Template
      image={image}
      setDescription={setDescription}
      setDiscount={setDiscount}
      setDropdownOpen={setDropdownOpen}
      setItemId={setItemId}
      setItemName={setItemName}
      setCategory={setCategory}
      setPrice={setPrice}
      dropdownOpen={dropdownOpen}
      uploading={uploading}
      handleAddItem={handleAddItem}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
      handleFileChange={handleFileChange}
      itemId={itemId}
      itemName={itemName}
      itemType={itemType}
      price={price}
      discount={discount}
      category={category}
      description={description}
      setItemType={setItemType}
    />
  );
};

export default AddItem;
