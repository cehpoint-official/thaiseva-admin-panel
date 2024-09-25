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

const MasterChartPage = ({delivered, cancelled, totalOrders}) => {
  const extractData = (key) => DATA.map((item) => item[key]);

  // const deliveryData = extractData('delivery');
  const deliveredData = extractData("Delivered");
  const cancelledData = extractData("cancelled");

  const dataForDoughnut = {
    labels: ["", ""],
    datasets: [
      {
        data: [
          // deliveryData.reduce((a, b) => a + b, 0),
          deliveredData.reduce((a, b) => a + b, 0),
          cancelledData.reduce((a, b) => a + b, 0),
        ],
        backgroundColor: [
          "rgba(43, 193, 86, 1)",
          "rgba(255, 30, 50, 1)",
          // 'rgba(139, 0, 0, 1)',
        ],
      },
    ],
  };

    const deliveredPercentage = totalOrders ? ((delivered / totalOrders) * 100).toFixed(0) : 0;
    const canceledPercentage = totalOrders ? ((cancelled / totalOrders) * 100).toFixed(0) : 0;

  return (
    <>
      <div className='flex items-center justify-between '>
        <div className=' h-[13rem] '>
          <Doughnut data={dataForDoughnut} />
        </div>
        <div className=' flex flex-col items-start justify-start gap-3  '>
          <div className='flex items-center justify-star gap-x-1'>
            <div className=' text-sm text-slate-700 dark:text-slate-700 '>
              Delivered ({delivered < 10 ? `0${delivered}` : delivered})
            </div>
            <div className='flex items-center justify-end gap-2'>
              <div className='w-28 bg-gray-200 rounded-full h-2  '>
                <div className='bg-green-600 h-2 rounded-full dark:bg-green-500'
                style={{ width: `${deliveredPercentage}%` }} ></div>
              </div>
              <p className='text-slate-700 '>{deliveredPercentage}%</p>
            </div>
          </div>

          <div className='flex items-center justify-star gap-x-1 '>
            <div className=' text-sm text-slate-700 dark:text-slate-700'>
              Cancelled ({cancelled < 10 ? `0${cancelled}` : cancelled })
            </div>
            <div className='flex items-center justify-end gap-2'>
              <div className='w-28 bg-gray-200 rounded-full h-2  '>
                <div className='bg-red-600 h-2 rounded-full dark:bg-red-500'
                style={{ width: `${canceledPercentage}%` }}></div></div>
              </div>
              <p className='text-slate-700 text-sm'>{canceledPercentage}%</p>
            </div>
          </div>
        </div>
    </>
  );
};

export default MasterChartPage;
