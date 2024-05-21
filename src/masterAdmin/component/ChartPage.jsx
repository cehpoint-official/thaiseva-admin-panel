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

const MasterChartPage = () => {
    const extractData = (key) => DATA.map((item) => item[key]);

    // const deliveryData = extractData('delivery');
    const deliveredData = extractData('Delivered');
    const cancelledData = extractData('cancelled');

    const dataForDoughnut = {
        labels: ['', ''],
        datasets: [
            {
                data: [
                    // deliveryData.reduce((a, b) => a + b, 0),
                    deliveredData.reduce((a, b) => a + b, 0),
                    cancelledData.reduce((a, b) => a + b, 0),
                ],
                backgroundColor: [
                    'rgba(43, 193, 86, 1)',
                    'rgba(255, 30, 50, 1)',
                    // 'rgba(139, 0, 0, 1)',
                ],
            },
        ],
    };

    // const options = {
    //     maintainAspectRatio: false, // Disable maintainAspectRatio to make chart height responsive
    // };

    return (
        <>
            <div className="flex items-center justify-between ">
                <div className=" h-[13rem] ">
                    <Doughnut data={dataForDoughnut} />
                </div>
                <div className="  ">

                    <div className="flex items-center justify-between mt-3 ">
                        <div class=" text-sm text-slate-700 dark:text-slate-700 ">Delivered (95)</div>
                        <div className="flex  items-center gap-2">
                            <div class="w-28 bg-gray-200 rounded-full h-2  dark:bg-gray-700">
                                <div class="bg-green-600 w-[90%] h-2 rounded-full dark:bg-green-500" ></div>
                            </div>
                            <p className="text-slate-700 ">95%</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                        <div class=" text-sm text-slate-700 dark:text-slate-700">Cancelled (05)</div>
                        <div className="flex  items-center gap-2">
                            <div class="w-28 bg-gray-200 rounded-full h-2  dark:bg-gray-700">
                                <div class="bg-red-600 w-[10%] h-2 rounded-full dark:bg-red-500" ></div>
                            </div>
                            <p className="text-slate-700 text-sm">05%</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MasterChartPage;