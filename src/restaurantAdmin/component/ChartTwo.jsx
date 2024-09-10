import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { db } from "../../../firebaseConfig"; // Adjust this import based on your Firebase config
import { doc, getDoc } from "firebase/firestore";

const ChartTwo = () => {
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [], // Initially empty, will be set after fetching data
    },
    tooltip: {
      x: {
        format: "MMM yyyy",
      },
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Earning from platform",
      data: [],
    },
  ]);

  const [timeRange, setTimeRange] = useState("days"); // Default to 'days'

  useEffect(() => {
    const fetchData = async () => {
      let docRef;

      switch (timeRange) {
        case "days":
          docRef = doc(db, "statistics", "all_2023_days");
          break;
        case "months":
          docRef = doc(db, "statistics", "all_2023_months");
          break;
        case "years":
          docRef = doc(db, "statistics", "all_years");
          break;
        default:
          docRef = doc(db, "statistics", "all_2023_days");
      }

      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          let categories = [];
          let amounts = [];

          if (timeRange === "days") {
            categories = data.days.map((day) =>
              new Date(day.date.seconds * 1000).toISOString()
            );
            amounts = data.days.map((day) => day.amount);
          } else if (timeRange === "months") {
            categories = data.months.map((month, index) => {
              const monthIndex = index + 1;
              return new Date(
                `2023-${monthIndex.toString().padStart(2, "0")}-01`
              ).toISOString();
            });
            amounts = data.months.map((month) => month.amount);
          } else if (timeRange === "years") {
            categories = data.years.map((year) => `${year.year}-01-01`);
            amounts = data.years.map((year) => year.amount);
          }

          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories,
            },
          }));

          setSeries([
            {
              name: "Earning from platform",
              data: amounts,
            },
          ]);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchData();
  }, [timeRange]);

  return (
    <div>
      <div
        className='inline-flex my-6 rounded-md shadow-sm  bg-gray-200'
        role='group'>
        <button
          type='button'
          onClick={() => setTimeRange("years")}
          className='px-4 py-2 text-sm  font-semibold   border border-gray-200 rounded-s-lg text-blue-700 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:bg-white  focus:text-gray-900 '>
          Yearly
        </button>
        <button
          type='button'
          onClick={() => setTimeRange("months")}
          className='px-4 py-2 text-sm font-semibold   border border-gray-200  text-blue-700 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:bg-white  focus:text-gray-900 '>
          Monthly
        </button>
        <button
          type='button'
          onClick={() => setTimeRange("days")}
          className='px-4 py-2 text-sm font-semibold   border border-gray-200 rounded-e-lg text-blue-700 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:bg-white  focus:text-gray-900 '>
          Today
        </button>
      </div>
      <div id='chart'>
        <ReactApexChart
          options={options}
          series={series}
          type='area'
          height={350}
        />
      </div>
    </div>
  );
};

export default ChartTwo;
