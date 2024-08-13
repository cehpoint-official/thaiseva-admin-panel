import  { useState, useEffect } from 'react';
import RestaImg from '../../assets/myRestaurent.png';
import { Link } from 'react-router-dom';
import { db } from '../../../firebaseConfig'; // Adjust the import based on your firebase configuration
import { collection, getDocs } from 'firebase/firestore';

const Restaurant = () => {
    const [toggle, setToggle] = useState(true);
    const [restaurantData, setRestaurantData] = useState(null);

    useEffect(() => {
        const fetchRestaurantData = async () => {
            const querySnapshot = await getDocs(collection(db, 'restaurants'));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRestaurantData(data[0]); // Assuming you only have one restaurant to display
        };

        fetchRestaurantData();
    }, []);

    return (
        <div className='bg-slate-100 px-8 pt-10'>
            <div className="flex justify-between items-center">
                <p className="lg:text-3xl md:text-2xl font-bold text-blue-600">My Restaurant</p>
                <div className='flex gap-4 items-center'>
                    <label className="flex items-center relative w-max cursor-pointer select-none">
                        <input onChange={e => setToggle(!toggle)} type="checkbox" className="appearance-none transition-colors cursor-pointer w-14 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500" />
                        <span className="absolute font-medium text-xs uppercase right-1 text-white">OFF</span>
                        <span className="absolute font-medium text-xs uppercase right-8 text-white">ON</span>
                        <span className="w-7 h-6 right-7 absolute rounded-full transform transition-transform bg-white" />
                    </label>
                    {
                        !toggle
                            ? <p className='font-semibold'>Restaurant Open</p>
                            : <p className='font-semibold'>Restaurant Closed</p>
                    }
                </div>
            </div>

            {restaurantData && (
                <div className='grid grid-cols-12 bg-white p-6 gap-4 mt-10 rounded-lg'>
                    <div className='col-span-12 md:col-span-5 p-2'>
                        <img src={restaurantData.imageUrl || RestaImg} alt={restaurantData.name} />
                    </div>
                    <div className='col-span-12 md:col-span-7 p-2'>
                        <div className='flex justify-between'>
                            <div>
                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-300">Verified</span>
                            </div>
                            <div>
                                <p className='text-slate-700 font-semibold'>Restaurant ID</p>
                                <p className='text-xl text-blue-700 font-semibold'>{restaurantData.id}</p>
                            </div>
                        </div>
                        <p className='mt-2 text-slate-800 text-3xl font-bold'>{restaurantData.name}</p>
                        <p className='mt-1 text-slate-500 text-sm'>{restaurantData.foodType}</p>
                        <p className='mt-6 text-slate-800 text-xl font-semibold'>Description</p>
                        <p className='text-slate-500 mt-2 text-lg'>{restaurantData.description}</p>
                        <p className='mt-6 text-slate-800 text-xl font-semibold'>Location</p>
                        <p className='text-slate-500 mt-2 text-lg'>{restaurantData.location}</p>
                        <div className='grid grid-cols-12 gap-2 mt-6'>
                            <div className='lg:col-span-5 col-span-12'>
                                <p className='text-slate-800 text-xl font-semibold'>Phone Number</p>
                                <p className='text-slate-500 mt-1 text-lg'>{restaurantData.phoneNumber}</p>
                            </div>
                            <div className='col-span-2 border-s hidden lg:block border-slate-400'></div>
                            <div className='lg:col-span-5 col-span-12'>
                                <p className='text-slate-800 text-xl font-semibold'>Email ID</p>
                                <p className='text-slate-500 mt-1 text-lg'>{restaurantData.emailId}</p>
                            </div>
                        </div>
                        <div className='flex justify-end mt-10'>
                            <Link to="/restaurant/EditRestaurant" className='bg-blue-700 px-3 p-2 text-xl text-white font-semibold rounded-lg'>
                                <i className='bi bi-pencil mx-2'></i> Edit Restaurant info
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Restaurant;
