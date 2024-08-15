import React, { useEffect, useState } from 'react';
import { storage, db } from '../../../firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const FoodItem = () => {
    const [toggle, setToggle] = useState(false);
    const [items, setItems] = useState([]);
    const [popup, setPopup] = useState(false);
    const [popItem, setPopItem] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const itemsCollection = toggle ? 'inactive-food-items' : 'active-food-items';
            const itemsCollectionRef = collection(db, itemsCollection);
            const itemsSnapshot = await getDocs(itemsCollectionRef);
            const itemsList = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            const imagesListRef = ref(storage, 'images/');
            const result = await listAll(imagesListRef);

            const urls = await Promise.all(result.items.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef);
                return { url, name: itemRef.name };
            }));

            const itemsWithImages = itemsList.map(item => {
                const image = urls.find(img => img.name.includes(item.itemId));
                return { ...item, imageUrl: image ? image.url : null };
            });

            // Remove duplicates based on itemId
            const uniqueItems = Array.from(new Map(itemsWithImages.map(item => [item.itemId, item])).values());

            setItems(uniqueItems);
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [toggle]);

    const handlePopupToggle = (item) => {
        setPopItem(item);
        setPopup(!popup);
    };

    const handleOptionsToggle = () => {
        setShowOptions(!showOptions);
    };

    const handleEdit = () => {
        console.log('Edit clicked');
    };

    const handleActivate = async () => {
        if (!popItem) return;

        try {
            // Check if item already exists in active-food-items
            const activeItemQuery = query(collection(db, 'active-food-items'), where('itemId', '==', popItem.itemId));
            const activeItemSnapshot = await getDocs(activeItemQuery);

            if (activeItemSnapshot.empty) {
                // Remove from inactive-food-items
                await deleteDoc(doc(db, 'inactive-food-items', popItem.id));
                
                // Add to active-food-items
                const { id, ...itemData } = popItem;
                await setDoc(doc(db, 'active-food-items', id), itemData);

                // Update local state
                setItems(prevItems => prevItems.filter(item => item.id !== popItem.id));
                setPopItem(null);
                setPopup(false);

                // Switch to Active tab and refresh data
                setToggle(false);
                await fetchData();
            } else {
                console.log('Item already exists in active-food-items');
                // You might want to show a notification to the user here
            }
        } catch (error) {
            console.error('Error activating item: ', error);
        }
    };

    const handleDelete = async () => {
        if (!popItem) return;

        try {
            await deleteDoc(doc(db, toggle ? 'inactive-food-items' : 'active-food-items', popItem.id));

            setItems(prevItems => prevItems.filter(item => item.id !== popItem.id));
            setPopItem(null);
            setPopup(false);
        } catch (error) {
            console.error('Error deleting item: ', error);
        }
    };
    const handleInactive = async () => {
        if (!popItem) return;
    
        try {
            console.log('Deactivating item:', popItem);
    
            // Remove from active-food-items
            console.log('Deleting from active-food-items');
            await deleteDoc(doc(db, 'active-food-items', popItem.id));
            
            // Add to inactive-food-items
            console.log('Adding to inactive-food-items');
            const { id, ...itemData } = popItem;
            await setDoc(doc(db, 'inactive-food-items', id), itemData);
    
            // Update local state
            setItems(prevItems => prevItems.filter(item => item.id !== popItem.id));
            setPopItem(null);
            setPopup(false);
    
            // Switch to Inactive tab and refresh data
            setToggle(true);
            await fetchData();
    
            console.log('Item successfully deactivated.');
        } catch (error) {
            console.error('Error deactivating item:', error);
        }
    };
    
    


    return (
        <div className='bg-slate-100 px-8 pt-10'>
            <div className='flex justify-between'>
                <p className="lg:text-3xl md:text-2xl font-bold text-blue-600">
                    Food Item
                </p>
                <Link to="/foodItem/addItem">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        + Add a new food Item
                    </button>
                </Link>
            </div>

            <div className='bg-white p-10 mt-10 rounded-lg relative'>
                <div className='mb-10'>
                    <button type="button" onClick={() => setToggle(false)} className={`focus:text-white hover:text-white ring-1 ring-slate-100 focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 ${!toggle ? "bg-blue-700 text-white" : "bg-white text-blue-700"}`}>
                        Active
                    </button>
                    <button type="button" onClick={() => setToggle(true)} className={`focus:text-white hover:text-white ring-1 ring-slate-100 focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 ${toggle ? "bg-blue-700 text-white" : "bg-white text-blue-700"}`}>
                        Inactive
                    </button>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {items.map(item => (
                            <div key={item.id} className='grid grid-cols-12 mt-6 shadow-xl'>
                                <div className='lg:col-span-4 md:col-span-6 col-span-8'>
                                    <div className='flex items-center gap-4 '>
                                        {item.imageUrl ? (
                                            <img 
                                                src={item.imageUrl} 
                                                className='h-20 rounded-md' 
                                                alt={item.itemName}
                                                onError={(e) => e.target.src = '/path/to/fallback/image.jpg'}
                                            />
                                        ) : (
                                            <div className='h-20 w-20 bg-gray-200 flex items-center justify-center'>
                                                <p>No Image</p>
                                            </div>
                                        )}
                                        <div>
                                            <p className='text-xl mb-2 text-slate-700'>{item.itemName}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='lg:col-span-2 md:col-span-3 col-span-4'>
                                    <div className="px-6 py-4">
                                        <p className='text-black font-bold'>{item.itemId}</p>
                                        Item ID
                                    </div>
                                </div>
                                <div className='lg:col-span-2 md:col-span-3 col-span-4'>
                                    <div className="px-6 py-4">
                                        <p className='font-bold'>{item.price}</p>
                                        Price
                                    </div>
                                </div>
                                <div className='lg:col-span-2 md:col-span-3 col-span-4 md:col-start-7'>
                                    <div className="md:ps-6 px-6 py-4">
                                        <p className='text-black font-bold text-xl'>
                                            <i className="bi bi-bar-chart-fill text-blue-600"></i>
                                        </p>
                                        Total
                                    </div>
                                </div>
                                <div className='lg:col-span-2 md:col-span-3 col-span-4 md:col-start-10'>
                                    <div className="md:ps-6 py-4 mt-3">
                                        <Link onClick={() => handlePopupToggle(item)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline border-blue-400 border p-1 px-2 rounded-lg">
                                            <i className="bi bi-eye-fill"></i> View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div onMouseLeave={() => setPopup(false)} className={`bg-white border-2 border-slate-100 shadow-2xl w-[40rem] rounded-2xl absolute top-0 p-10 ${!popup ? "hidden" : "block"}`}>
                    {popItem && (
                        <div>
                            <div className='flex justify-between items-center relative'>
                                <p className='text-xl text-blue-600 font-semibold'>{popItem.itemName}</p>
                                <div className="relative">
                                    <i onClick={handleOptionsToggle} className="bi p-1 bg-slate-100 px-2 rounded-full font-bold text-xl bi-three-dots-vertical cursor-pointer"></i>
                                    {showOptions && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-lg">
                                            <ul>
                                                <li onClick={handleEdit} className="p-2 hover:bg-slate-100 cursor-pointer">Edit</li>
                                                {toggle ? 
                                                    <li onClick={handleActivate} className="p-2 hover:bg-slate-100 cursor-pointer">Activate</li>
                                                    :
                                                    <li onClick={handleInactive} className="p-2 hover:bg-slate-100 cursor-pointer">Deactivate</li>
                                                }
                                                <li onClick={handleDelete} className="p-2 hover:bg-slate-100 cursor-pointer">Delete</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='mt-6 flex gap-4'>
                                {popItem.imageUrl ? (
                                    <img 
                                        src={popItem.imageUrl} 
                                        className='h-48 rounded-lg' 
                                        alt={popItem.itemName}
                                        onError={(e) => e.target.src = '/path/to/fallback/image.jpg'}
                                    />
                                ) : (
                                    <div className='h-48 w-48 bg-gray-200 flex items-center justify-center'>
                                        <p>No Image</p>
                                    </div>
                                )}
                                <div>
                                    <p className='text-xl font-bold text-slate-700 mb-2'>{popItem.itemName}</p>
                                    <p className='text-lg text-slate-700 mt-2'>{popItem.description || 'No additional details available.'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FoodItem;