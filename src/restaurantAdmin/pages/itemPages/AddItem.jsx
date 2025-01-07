import { useEffect, useState } from "react";
import { db, storage } from "../../../../firebaseConfig";
import {
  setDoc,
  doc,
  collection,
  getDocs,
  query,
  addDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Template from "./Template";
import { useAuth } from "../../../AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const AddItem = () => {
  const { currentUser } = useAuth();
  const [itemName, setItemName] = useState("");
  const [itemId, setItemId] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [itemType, setItemType] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [resId, setResId] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

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

      // Use imageFile for upload instead of image
      if (imageFile) {
        const imageRef = ref(storage, `images/${itemId}`);
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
        const restaurantId = restaurantDoc.id; // Fetch restaurantId
        setResId(restaurantId); // Set the state
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
    if (resId) {
      console.log("ResId updated: ", resId);
    }
  }, [resId]);

  const docItemId = itemId.replace("#", "");

  const saveItemData = async (imageUrl) => {
    await setDoc(doc(db, `food_items/${resId}/items/${docItemId}`), {
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
    navigate(`/${id}/fooditem`);
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
