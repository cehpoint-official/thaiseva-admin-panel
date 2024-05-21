import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/sidebarLogo.png'

const Sidebar = ({ show, toggle }) => {
    const links = [
        { icon: "bi-clipboard-data", label: "dashboard", to: "/" },
        { icon: "bi-shop", label: "My Restaurant", to: "restaurant" },
        { icon: "bi-shop", label: "Food Item", to: "foodItem" },
        { icon: "bi-shop", label: "Manage Order", to: "manageOrder" },
        { icon: "bi-person", label: "Log Out", to: "logOutPage" },
        // { icon: "bi-trash", label: "products", to: "/", badge: "new" },
        // { icon: "bi-pencil", label: "orders", to: "/" },
        // { icon: "bi-laptop", label: "history", to: "/" },
        // { icon: "bi-laptop", label: "login", to: "login" },
        // { icon: "bi-laptop", label: "register", to: "register" },

    ]
    const LINK_LIST = <>
        {
            links.map(item => <div className='h-14 flex justify-between items-center  ' key={item.label}>
                <Link to={item.to} className='hover:bg-slate-200 w-full p-3'>
                    <i className={`bi ${item.icon} `}></i>
                    <span className='ms-3 '>{item.label}</span>
                </Link>
                {
                    item.badge && <span className='bg-blue-500 p-1 text-slate-50 rounded-lg '>{item.badge}</span>
                }
            </div>)
        }
    </>
    return show && <>
        <div className='w-[300px] sticky top-0  h-screen '>
            {/* header start */}
            <div className='p-6 gap-2 flex '>
                <img src={Logo} alt="" />
                <p className='md:text-3xl text-xl text-gray-800 font-bold'>Thaiseva</p>
            </div>
            {/* header end */}


            {/* body start*/}
            <div className='flex-grow ps-3'>
                {LINK_LIST}
            </div>
            {/* body end*/}

            {/* footer start */}
            {/* <div className='bg-slate-500 p-3 text-center '>
                <h1>Settings</h1>
            </div> */}
            {/* footer end */}

        </div>
    </>
}

export default Sidebar