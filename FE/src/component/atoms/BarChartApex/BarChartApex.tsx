import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";

const BarChartApex = () => {
  const [data, setData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      colors: ["rgba(121, 93, 255, 1)", "rgba(121, 93, 255, 0.9)", "rgba(121, 93, 255, 0.8)"],
      xaxis: {
        categories: ["액션", "코미디", "로맨스", "판타지", "다큐멘터리"],
        labels: {
          style: {
            colors: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-xaxis-label",
          },
        },
      },
    },
    series: [
      {
        name: "장르",
        data: [75, 40, 45, 50, 10],
      },
    ],
  });

  useEffect(() => {}, [data]);

  return <Chart options={data.options} type={"bar"} series={data.series}></Chart>;
};

export default BarChartApex;
