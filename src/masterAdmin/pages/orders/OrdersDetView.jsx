import React from 'react'
import { Link } from 'react-router-dom'

const OrdersDetView = () => {
    return <div className='bg-slate-100 px-6 py-10'>
        <div className='flex justify-between'>
            <Link
                to="/foodAdmin/ordersDetails"
                className="lg:text-3xl md:text-2xl font-bold text-blue-600">
                <i class="bi bi-arrow-left me-2"></i>
                Back
            </Link>
            <div>
                <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Status -On delivery
                </button>
            </div>
        </div>
    </div>
}

export default OrdersDetView