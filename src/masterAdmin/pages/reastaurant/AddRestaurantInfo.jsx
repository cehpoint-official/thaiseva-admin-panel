import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const AddRestaurantInfo = () => {

    const handleToast = () => {
        toast.success("Restaurant Information Added")
    }

    return <>
        <div className='bg-slate-100 px-8 pt-10'>
            <ToastContainer />
            <Link
                to="/foodAdmin/addResta"
                className="lg:text-3xl md:text-2xl font-bold text-blue-600">
                <i class="bi bi-arrow-left me-2"></i>
                Back
            </Link>
            <div className='bg-white p-10 mt-10 rounded-lg'>
                <p className='text-center  text-2xl'>RESTAURANT INFORMATION</p>
                <div className='grid grid-cols-12 mt-10'>
                    <div className='lg:col-span-4 md:col-span-8  col-span-12 '>

                        <div class="flex items-center justify-center max-w-3xl mx-auto px-8  pb-8 mb-4">
                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"></path>
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span class="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG, or GIF (MAX. 800x400px)
                                    </p>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" />
                                <p className='bg-blue-700 p-1 px-4 text-lg rounded-lg text-white'>Upload</p>
                            </label>
                        </div>

                    </div>
                    <div className='lg:col-span-8 col-span-12 '>

                        <div class="container mx-auto px-4">
                            <div class="max-w-3xl mx-auto ">
                                <form class=" rounded px-8  pb-8 mb-4">
                                    <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="restaurant-name">
                                            Restaurant Name
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="restaurant-name" type="text" placeholder="Restaurant Name" />
                                    </div>

                                    <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="restaurant-id">
                                            Restaurant ID
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="restaurant-id" type="text" placeholder="Restaurant ID" />
                                    </div>

                                    <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="phone-number">
                                            Phone Number
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone-number" type="tel" placeholder="Phone Number" />
                                    </div>

                                    <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email-id">
                                            Email ID
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email-id" type="email" placeholder="Email ID" />
                                    </div>

                                    <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="food-type">
                                            Food Type
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="food-type" type="text" placeholder="Food Type" />
                                    </div>

                                    <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="location">
                                            Location
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="Location" />
                                    </div>

                                    <div class="mb-6">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                                            Description
                                        </label>
                                        <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description"></textarea>
                                    </div>

                                    <div class="flex items-center justify-between">
                                        <button onClick={handleToast} class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                            Save your Restaurant info
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    </>
}

export default AddRestaurantInfo