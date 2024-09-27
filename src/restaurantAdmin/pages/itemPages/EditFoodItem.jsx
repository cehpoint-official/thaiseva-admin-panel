import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Template from "./Template";
import { useAuth } from "../../../AuthContext";

const EditItem = () => {
  const { currentUser } = useAuth();
  const itemidParam = useParams();
  const itemid = decodeURIComponent(itemidParam["itemId"]);
  console.log(itemid);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [itemType, setItemType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [resId, setResId] = useState("");

  const fetchRestaurantDetails = async () => {
    try {
      const restaurantDetailsRef = collection(
        db,
        `restaurants/${currentUser.uid}/restaurantDetails`
      );
      const q = query(restaurantDetailsRef);
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const restaurantDoc = querySnapshot.docs[0];
        const restaurantId = restaurantDoc.id;
        setResId(restaurantId);
      } else {
        console.log("No restaurant found for this user.");
      }
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };

  useEffect(() => {
    fetchRestaurantDetails();
  }, []);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const docRef = doc(db, "food_items", resId, "items", itemid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setItemName(data.itemName);
          setPrice(data.price);
          setDiscount(data.discount);
          setCategory(data.category);
          setItemType(data.itemType);
          setDescription(data.description);
          console.log(data.imageUrl);
          setImage(data.imageUrl);
        } else {
          alert("No such item exists.");
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [itemid, resId]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      setImage(imageUrl); // Set preview URL
      setImageFile(selectedFile); // Set actual file
      setDropdownOpen(false);
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

  const handleEditItem = async () => {
    if (!itemName || !price || !category || !itemType || !description) {
      alert("Please fill all fields.");
      return;
    }

    try {
      let imageUrl = image; // Default to preview URL if no file selected

      if (imageFile) {
        // Check if an actual file is selected
        const imageRef = ref(storage, `images/${itemid}`);
        const uploadTask = uploadBytesResumable(imageRef, imageFile);

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
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref); // Use uploaded file URL
              resolve();
            }
          );
        });
      }

      await updateItemData(imageUrl);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item. Please try again.");
    }
  };

  const updateItemData = async (imageUrl) => {
    try {
      const docRef = doc(db, "food_items", resId, "items", itemid);
      await updateDoc(docRef, {
        itemName,
        price,
        discount,
        category,
        itemType,
        description,
        imageUrl,
        active: false, // Optionally update the active status
      });
      alert("Item updated successfully!");
    } catch (error) {
      console.error("Error updating item:", error);
    }
    setUploading(false);
  };

  return (
    <Template
      image={image}
      setDescription={setDescription}
      setDiscount={setDiscount}
      setDropdownOpen={setDropdownOpen}
      setItemId={itemid}
      setItemName={setItemName}
      setCategory={setCategory}
      setPrice={setPrice}
      dropdownOpen={dropdownOpen}
      uploading={uploading}
      handleAddItem={handleEditItem}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
      handleFileChange={handleFileChange}
      itemId={itemid}
      itemName={itemName}
      itemType={itemType}
      price={price}
      discount={discount}
      category={category}
      description={description}
      setItemType={setItemType}
      submitBtn="Update Food Item"
      IdDisable={true}
    />
  );
};

export default EditItem;
