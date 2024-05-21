import React, { useState } from 'react'
import RestaImg from "../../assets/myRestaurent.png"
import { Link } from 'react-router-dom'

const Restaurant = () => {

    const [toggle, setToggle] = useState(true)
    return <>
        <div className='bg-slate-100 px-8 pt-10'>
            <div className="flex justify-between items-center">
                <p className="lg:text-3xl md:text-2xl font-bold text-blue-600">My Restaurant</p>
                <div className='flex gap-4 items-center'>
                    <label class="flex items-center relative w-max cursor-pointer select-none">
                        <input onChange={e => setToggle(!toggle)} type="checkbox" class="appearance-none transition-colors cursor-pointer w-14 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500" />
                        <span class="absolute font-medium text-xs uppercase right-1 text-white"> OFF </span>
                        <span class="absolute font-medium text-xs uppercase right-8 text-white"> ON </span>
                        <span class="w-7 h-6 right-7 absolute rounded-full transform transition-transform bg-white" />
                    </label>
                    {
                        !toggle
                            ? <p className='font-semibold'>Restaurant Open</p>
                            : <p className='font-semibold'>Restaurant Cloce</p>
                    }

                </div>
            </div>

            <div className='grid grid-cols-12 bg-white p-6 gap-4 mt-10 rounded-lg'>
                <div className='col-span-12 md:col-span-5 p-2'>
                    <img src={RestaImg} alt="" />
                </div>
                <div className='col-span-12 md:col-span-7 p-2'>
                    <div className='flex justify-between'>
                        <div>
                            <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-300">Verified</span>
                        </div>
                        <div>
                            <p className='text-slate-700 font-semibold'>Restaurant ID</p>
                            <p className='text-xl text-blue-700 font-semibold'>RE125678890</p>
                        </div>
                    </div>
                    <p className='mt-2 text-slate-800 text-3xl font-bold'>la pizzario</p>
                    <p className='mt-1 text-slate-500 text-sm'>Fast food . Chinese</p>
                    <p className='mt-6 text-slate-800 text-xl font-semibold'>Description</p>
                    <p className='text-slate-500 mt-2 text-lg'>
                        La Pizzario: Authentic Italian flavors served with a dash of elegance. Indulge in our handcrafted pizzas, made from the finest ingredients and baked to perfection. Experience Italy on a plate.
                    </p>

                    <p className='mt-6 text-slate-800 text-xl font-semibold'>Location</p>
                    <p className='text-slate-500 mt-2 text-lg'>Bang Lamung District, Chon Buri 20150, Thailand</p>
                    <div className='grid grid-cols-12 gap-2 mt-6'>
                        <div className='lg:col-span-5 col-span-12 '>
                            <p className=' text-slate-800 text-xl font-semibold'>Phone Number</p>
                            <p className='text-slate-500 mt-1 text-lg'>+66 9667788788</p>
                        </div>
                        <div className='col-span-2 border-s hidden lg:block border-slate-400'></div>
                        <div className='lg:col-span-5 col-span-12'>
                            <p className=' text-slate-800 text-xl font-semibold'>Email ID</p>
                            <p className='text-slate-500 mt-1 text-lg'>email@gmail.com</p>
                        </div>
                    </div>
                    <div className='flex justify-end mt-10'>
                        <Link to="/restaurant/addrestaurant" className='bg-blue-700 px-3 p-2 text-xl text-white font-semibold rounded-lg'><i className='bi bi-pencil mx-2'></i> Edit Restaurant info</Link>
                    </div>
                </div>
            </div>


        </div>
    </>
}

export default Restaurant