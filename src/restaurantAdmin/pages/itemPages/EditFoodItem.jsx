import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Template from "./Template";

const EditItem = () => {
  const itemidParam = useParams(); // Assuming the item's ID is passed in the URL
  const itemid = decodeURIComponent(itemidParam['itemId'])
  console.log(itemid)
  const [itemName, setItemName] = useState("");
  const [itemId, setItemId] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [itemType, setItemType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch existing item data from Firestore
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const docRef = doc(db, "inactive-food-items", itemid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setItemName(data.itemName);
          setItemId(data.itemId);
          setPrice(data.price);
          setDiscount(data.discount);
          setCategory(data.category);
          setItemType(data.itemType);
          setDescription(data.description);
          setExistingImageUrl(data.imageUrl); // For displaying existing image
        } else {
          alert("No such item exists.");
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [itemid]);

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

  const handleEditItem = async () => {
    if (!itemName || !price || !category || !itemType || !description) {
      alert("Please fill all fields.");
      return;
    }

    try {
      let imageUrl = existingImageUrl;

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

      await updateItemData(imageUrl);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item. Please try again.");
    }
  };

  const updateItemData = async (imageUrl) => {
    try {
      const docRef = doc(db, "inactive-food-items", id);
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
      // existingImageUrl='https://firebasestorage.googleapis.com/v0/b/thaiseva-85cda.appspot.com/o/images%2F%232222?alt=media&token=95d67c80-bb20-4230-9aa0-26ef7a508565'
      setDescription={setDescription}
      setDiscount={setDiscount}
      setDropdownOpen={setDropdownOpen}
      setItemId={setItemId}
      setItemName={setItemName}
      setCategory={setCategory}
      setPrice={setPrice}
      dropdownOpen={dropdownOpen}
      uploading={uploading}
      handleAddItem={handleEditItem}
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
      submitBtn="Update Food Item"
    />
  );
};

export default EditItem;
