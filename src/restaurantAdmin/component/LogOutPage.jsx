import React from 'react'
import { Link } from 'react-router-dom'

const LogOutPage = () => {
    return <div className=' bg-slate-200 h-[100vh] flex items-center justify-center'>
        <div className='bg-white h-[20rem] w-[28rem] rounded-xl text-center p-10'>
            <i class="bi bi-box-arrow-right text-5xl text-white mb-4 font-bold bg-[#ff2d2d] p-2 px-4  rounded-full"></i>
            <p className=' text-3xl mt-8 mb-12 '>Are you sure! You want to log out</p>
            <div className='flex gap-2 items-center justify-center'>
                <Link to="/" className='p-2 w-24 text-lg text-white font-semibold rounded-lg bg-slate-600' >Cancle</Link>
                <Link className='p-2 w-24 text-lg text-white font-semibold rounded-lg bg-blue-600' >Log out</Link>
            </div>
        </div>

    </div>
}

export default LogOutPage