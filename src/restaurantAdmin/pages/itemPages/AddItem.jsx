import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { db, storage } from '../../../../firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const AddItem = () => {
    const [itemName, setItemName] = useState('');
    const [itemId, setItemId] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [category, setCategory] = useState('');
    const [itemType, setItemType] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleAddItem = async () => {
        if (!itemName || !itemId || !price || !category || !itemType || !description) {
            alert('Please fill all fields.');
            return;
        }

        try {
            let imageUrl = '';

            if (image) {
                // Create a storage reference
                const imageRef = ref(storage, `images/${itemId}`);
                const uploadTask = uploadBytesResumable(imageRef, image);

                // Monitor upload progress
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Optionally handle progress
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        console.error('Upload failed: ', error);
                    },
                    async () => {
                        // Handle successful uploads
                        imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                        await saveItemData(imageUrl);
                    }
                );
                setUploading(true);
            } else {
                await saveItemData(imageUrl);
            }
        } catch (error) {
            console.error('Error adding item: ', error);
            alert('Failed to add item. Please try again.');
        }
    };

    const saveItemData = async (imageUrl) => {
        await setDoc(doc(db, 'food_items', itemId), {
            itemName,
            itemId,
            price,
            discount,
            category,
            itemType,
            description,
            imageUrl,
        });
        alert('Item added successfully!');
        setUploading(false);
    };

    return (
        <div className='bg-slate-100 px-8 pt-10'>
            <Link
                to="/foodItem"
                className="lg:text-3xl md:text-2xl font-bold text-blue-600">
                <i className="bi bi-arrow-left me-2"></i>
                Back
            </Link>
            <div className='bg-white p-10 mt-10 rounded-lg'>
                <p className='text-center text-2xl'>Add Item Info</p>
                <div className='grid grid-cols-12 mt-10'>
                    <div className='lg:col-span-4 md:col-span-8 col-span-12'>
                        <div className="flex items-center justify-center max-w-3xl mx-auto px-8 pb-8 mb-4">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"></path>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG, or GIF (MAX. 800x400px)
                                    </p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                                <p className='bg-blue-700 p-1 px-4 text-lg rounded-lg text-white'>Upload</p>
                            </label>
                        </div>
                    </div>
                    <div className='lg:col-span-8 col-span-12'>
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl mx-auto">
                                <form className="rounded px-8 pb-8 mb-4">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item-name">
                                            Item Name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="item-name"
                                            type="text"
                                            placeholder="Item Name"
                                            value={itemName}
                                            onChange={(e) => setItemName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item-id">
                                            Item ID
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="item-id"
                                            type="text"
                                            placeholder="Item ID"
                                            value={itemId}
                                            onChange={(e) => setItemId(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                            Price
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="price"
                                            type="tel"
                                            placeholder="Price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discount">
                                            Discount
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="discount"
                                            type="text"
                                            placeholder="Discount"
                                            value={discount}
                                            onChange={(e) => setDiscount(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                                            Select Category
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="category"
                                            type="text"
                                            placeholder="Select Category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemtype">
                                            Item Type
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={itemType}
                                            onChange={(e) => setItemType(e.target.value)}
                                        >
                                            <option value="" disabled>Select Item Type</option>
                                            <option value="Veg">Veg</option>
                                            <option value="Non Veg">Non Veg</option>
                                        </select>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="description"
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={handleAddItem}
                                            disabled={uploading}
                                        >
                                            {uploading ? 'Uploading...' : 'Add new food Item'}
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

export default AddItem;
