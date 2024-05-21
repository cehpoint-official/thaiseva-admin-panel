import React, { useEffect, useState } from 'react'
import ItemOne from "../../assets/itemImg/item1.png"
import ItemTwo from "../../assets/itemImg/item2.png"
import ItemThree from "../../assets/itemImg/item3.png"
import ItemFour from "../../assets/itemImg/item4.png"
import PopImg from "../../assets/itemImg/popImg.png"
import { Link } from 'react-router-dom'

const FoodItem = () => {

    const [toggle, setToggle] = useState(false)
    const [popup, setPopup] = useState(false)
    const [popItem, setPopItem] = useState(false)
    const [active, setActive] = useState(false)

    // useEffect(() => {
    //     document.addEventListener("click", () => {
    //         setPopup(false)
    //         setPopItem(false)
    //     })
    //     return () => {
    //         document.removeEventListener("click", () => {
    //             setPopup(false)
    //             setPopItem(false)
    //         })
    //     }
    // }, [])

    const FoodActiveOrder = [
        { foodImg: ItemOne, foodName: " pizza", discount: "20%", price: "177.60", id: "#4566", type: "VEG", TotalSales: "200" },
        { foodImg: ItemTwo, foodName: " Cake", discount: "30%", price: "177.60", id: "#9866", type: "VEG", TotalSales: "110" },
        { foodImg: ItemThree, foodName: " Chicken", discount: "30%", price: "177.60", id: "#3366", type: "Non VEG", TotalSales: "80" },
        { foodImg: ItemFour, foodName: " Juice", discount: "13%", price: "77.90", id: "#2266", type: "VEG", TotalSales: "210" },
    ]
    const FoodInactiveOrder = [
        { foodImg: ItemThree, foodName: "Neapolitan Chicken", discount: "30%", price: "177.60", id: "#3366", type: "Non VEG", TotalSales: "80" },
        { foodImg: ItemTwo, foodName: "Neapolitan Cake", discount: "30%", price: "177.60", id: "#9866", type: "VEG", TotalSales: "110" },
        { foodImg: ItemOne, foodName: "Neapolitan pizza", discount: "20%", price: "177.60", id: "#4566", type: "VEG", TotalSales: "200" },
    ]

    return <>
        <div className='bg-slate-100 px-8 pt-10' >
            <div className='flex justify-between'>
                <p
                    className="lg:text-3xl md:text-2xl font-bold text-blue-600">
                    {/* <i class="bi bi-arrow-left me-2"></i> */}
                    Food Item
                </p>
                <Link to="/foodItem/addItem">
                    <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        + Add a new food Item
                    </button>
                </Link>
            </div>

            <div className='bg-white p-10 mt-10 rounded-lg relative'>
                <div className=' mb-10'>
                    <button type="button" onClick={e => setToggle(true)} class="focus:text-white hover:text-white ring-1 ring-slate-100  focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Active</button>
                    <button type="button" onClick={e => setToggle(false)} class="focus:text-white hover:text-white ring-1 ring-slate-100  focus:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">inactive</button>
                </div>

                <div>
                    {
                        toggle
                            ? <>
                                {
                                    FoodActiveOrder && FoodActiveOrder.map((item) => <div className='grid grid-cols-12 mt-6 shadow-xl'>
                                        <div className='lg:col-span-4 md:col-span-6 col-span-8 '>
                                            <div className='flex items-center gap-4'>
                                                <img src={item.foodImg} className='h-20' alt="" />
                                                <div className=''>
                                                    <p className='text-xl  mb-2 text-slate-700'>{item.foodName}</p>

                                                    <span><span>&#3647;</span>  {item.price} </span> <span className='text-green-600'> | {item.discount} discount</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4  '>
                                            <div class="px-6 py-4">
                                                <p className='text-black font-bold'>{item.id}</p>
                                                ID
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4 '>
                                            <div class="px-6 py-4">
                                                <p className={`font-bold ${item.type === "VEG" ? "text-green-600" : "text-red-500"}`}>
                                                    {item.type}
                                                </p>
                                                Type
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4 md:col-start-7 '>
                                            <div class="md:ps-6 px-6 py-4">
                                                <p className='text-black font-bold text-xl'>
                                                    <i class="bi bi-bar-chart-fill text-blue-600"></i> {item.TotalSales}
                                                </p>
                                                Total sales
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4 md:col-start-10 '>
                                            <div class="md:ps-6 py-4 mt-3">
                                                <Link onClick={e => {
                                                    // e.stopPropagation()
                                                    setPopup(!popup)
                                                }} class="font-medium  text-blue-600 dark:text-blue-500 hover:underline border-blue-400 border p-1 px-2 rounded-lg"   >
                                                    <i class="bi bi-eye-fill"></i> Edit
                                                </Link>
                                            </div>
                                        </div>

                                    </div>)
                                }

                            </>
                            : <>
                                {
                                    FoodInactiveOrder && FoodInactiveOrder.map((item) => <div className='grid grid-cols-12 mt-6 shadow-xl'>
                                        <div className='lg:col-span-4 md:col-span-6 col-span-8 '>
                                            <div className='flex items-center gap-4'>
                                                <img src={item.foodImg} className='h-20' alt="" />
                                                <div className=''>
                                                    <p className='text-xl  mb-2 text-slate-700'>{item.foodName}</p>

                                                    <span><span>&#3647;</span>  {item.price} </span> <span className='text-green-600'> | {item.discount} discount</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4  '>
                                            <div class="px-6 py-4">
                                                <p className='text-black font-bold'>{item.id}</p>
                                                ID
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4 '>
                                            <div class="px-6 py-4">
                                                <p className={`font-bold ${item.type === "VEG" ? "text-green-600" : "text-red-500"}`}>
                                                    {item.type}
                                                </p>
                                                Type
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4 md:col-start-7 '>
                                            <div class="md:ps-6 px-6 py-4">
                                                <p className='text-black font-bold text-xl'>
                                                    <i class="bi bi-bar-chart-fill text-blue-600"></i> {item.TotalSales}
                                                </p>
                                                Total sales
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 md:col-span-3 col-span-4 md:col-start-10 '>
                                            <div class="px-6 py-4 mt-3">
                                                <Link onClick={e => {
                                                    // e.stopPropagation()
                                                    setPopup(!popup)
                                                }} class="font-medium  text-blue-600 dark:text-blue-500 hover:underline border-blue-400 border p-1 px-2 rounded-lg"   >
                                                    <i class="bi bi-eye-fill"></i> Edit
                                                </Link>
                                            </div>
                                        </div>

                                    </div>)
                                }

                            </>
                    }
                </div>


                <div onMouseLeave={e => setPopup(false)} className={`bg-white border-2  border-slate-100 shadow-2xl w-[40rem] rounded-2xl absolute top-0 p-10 ${!popup ? "hidden" : "block"} `} >
                    <div className='flex justify-between items-center relative'>
                        <p className='text-xl text text-blue-600 font-semibold'>Item ID #5665767</p>
                        <i onClick={e => {
                            // e.stopPropagation()
                            setPopItem(!popItem)
                        }
                        } class="bi p-1 bg-slate-100 px-2 rounded-full font-bold text-xl bi-three-dots-vertical"></i>
                        <div className={`bg-white border shadow-lg absolute right-0 w-24 rounded-lg  mt-[10rem] border-slate-100 ${!popItem ? "hidden" : "block"}`}>
                            <p className='hover:bg-slate-300 transition duration-75 p-2 px-4 rounded-t-lg'>Edit</p>
                            <p onClick={e => setActive(!active)} className='hover:bg-slate-300 p-2 px-4'>
                                {
                                    active ? "Active" : "Inactive"
                                }
                            </p>
                            <p className='hover:bg-slate-300 p-2 px-4 rounded-b-lg'>Delete</p>
                        </div>
                    </div>
                    <div className='mt-6 flex gap-4'>
                        <img src={PopImg} className='h-48' alt="" />
                        <div className=''>
                            <p className='text-xl font-bold text-slate-700 mb-2'>Neapolitan pizza</p>
                            <span className='text-lg'><span>&#3647;</span>  100.70 </span> <span className='text-green-600'> | 10% discount</span>
                            <p className='text-lg text-slate-700 mt-2'>
                                Neapolitan pizza, or pizza Napoletana, is a type of pizza that originated in Naples.
                            </p>
                            <p className='text-lg text-slate-700 my-4'>
                                Category - Pizza
                            </p>
                            <div className=''>
                                <span class="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-1 rounded dark:bg-yellow-900 dark:text-yellow-300">Non Veg</span>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    </>
}

export default FoodItem