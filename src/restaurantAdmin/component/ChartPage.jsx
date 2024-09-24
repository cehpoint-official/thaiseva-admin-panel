import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import DATA from "./data.json";

ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

const ChartPage = ({delivered, onDelivery, canceled}) => {
    // const extractData = (key) => DATA.map((item) => item[key]);

    const totalOrders = delivered + onDelivery + canceled; // Total orders count

    const dataForDoughnut = {
        // labels: ['On Delivery', 'Delivered', 'Cancelled'],
        datasets: [
            {
                data: [
                    onDelivery,
                    delivered,
                    canceled,
                ],
                backgroundColor: [
                    'rgba(43, 193, 86, 1)', // On Delivery color
                    'rgba(63, 73, 82, 1)',  // Delivered color
                    'rgba(255, 97, 97, 1)', // Cancelled color
                ],
            },
        ],
    };

    // Calculate percentages
    const onDeliveryPercentage = totalOrders ? ((onDelivery / totalOrders) * 100).toFixed(0) : 0;
    const deliveredPercentage = totalOrders ? ((delivered / totalOrders) * 100).toFixed(0) : 0;
    const canceledPercentage = totalOrders ? ((canceled / totalOrders) * 100).toFixed(0) : 0;

    return (
        <>
            <div className="flex items-center justify-between ">
                <div className=" h-[13rem] ">
                    <Doughnut data={dataForDoughnut} />
                </div>
                <div className=" flex flex-col items-start justify-start gap-3">
                    <div className="flex items-center justify-star ">
                        <div className=" text-sm text-slate-700 dark:text-slate-700 w-[6rem]">On Delivery({onDelivery})</div>
                        <div className="flex items-center justify-end gap-2">
                            <div className="w-28 bg-gray-200 rounded-full h-2 ">
                                <div className={`bg-green-600 h-2 rounded-full dark:bg-green-500`} 
                                style={{ width: `${onDeliveryPercentage}%` }}></div>
                            </div>
                            <p className="text-slate-700 text-sm ">{onDeliveryPercentage}%</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className=" text-sm text-slate-700 dark:text-slate-700 w-[6rem]">Delivered({delivered})</div>
                        <div className="flex  items-center gap-2">
                            <div className="w-28 bg-gray-200 rounded-full h-2  ">
                                <div className={`bg-gray-600 h-2 rounded-full`} 
                                style={{ width: `${deliveredPercentage}%` }} >                                    
                                </div>
                            </div>
                            <p className="text-slate-700 text-sm">{deliveredPercentage}%</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className=" text-sm text-slate-700 dark:text-slate-700 w-[6rem]">Cancelled({canceled})</div>
                        <div className="flex  items-center gap-2">
                            <div className="w-28 bg-gray-200 rounded-full h-2  ">
                                <div className={`bg-[#ff6161] h-2 rounded-full`}
                                style={{ width: `${canceledPercentage}%` }}></div>
                            </div>
                            <p className="text-slate-700 text-sm">{canceledPercentage}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChartPage;