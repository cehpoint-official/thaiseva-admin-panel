import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const MasterApexChart = () => {
  const [options] = useState({
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
      categories: [
        "2024-01-01T00:00:00.000Z",
        "2024-02-01T00:00:00.000Z",
        "2024-03-01T00:00:00.000Z",
        "2024-04-01T00:00:00.000Z",
        "2024-05-01T00:00:00.000Z",
        "2024-06-01T00:00:00.000Z",
        "2024-07-01T00:00:00.000Z",
        "2024-08-01T00:00:00.000Z",
        "2024-09-01T00:00:00.000Z",
        "2024-10-01T00:00:00.000Z",
        "2024-11-01T00:00:00.000Z",
        "2024-12-01T00:00:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "MMM yyyy",
      },
    },
  });

  const [series] = useState([
    {
      name: "Earning from platform",
      data: [200, 120, 140, 151, 242, 209, 100, 150, 200, 300, 250, 200], // 12 data points for each month
    },
  ]);

  return (
    <div id='chart'>
      <ReactApexChart
        options={options}
        series={series}
        type='area'
        height={350}
      />
    </div>
  );
};

export default MasterApexChart;
