import React from 'react'
import RestaImg from "../../../assets/Restaurant.png"
import { Link } from 'react-router-dom'

const Addrestaurant = () => {
    return <>
        <div className='bg-slate-100 px-8 pt-10 h-[100vh]'>
            <p className="lg:text-3xl md:text-2xl font-bold text-blue-600">My Restaurant</p>
            <div className='bg-white py-28 mb-20 rounded-lg shadow-blue-900 flex justify-center mt-10'>
                <div className='text-center'>
                    <div className=' flex justify-center'>
                        <img src={RestaImg} alt="" />
                    </div>
                    <p className='text-slate-500 mb-6 text-lg'>No restaurants have been added yet!</p>
                    <Link
                        to="/restaurant/addrestaurant/restaInformation"
                        className='px-4 py-2 rounded-lg
                         bg-blue-700 text-white text-lg'>Add your Restaurant
                    </Link>
                </div>
            </div>
        </div>
    </>
}

export default Addrestaurant