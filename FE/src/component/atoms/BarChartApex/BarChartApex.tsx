import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";

const BarChartApex = () => {
  const [data, setData] = useState({
    series: [
      {
        name: "장르",
        data: [75, 40, 45, 50, 10],
      },
    ],
    options: {
      chart: {},
      colors: ["#795DFF", "#9A85FF", "#B8A9FF", "#D2C9FF", "#E5E0FF"],
      plotOptions: {
        bar: {
          columnWidth: "50%",
          barHeight: "100%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
        labels: {
          colors: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
        },
      },
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
  });

  useEffect(() => {}, [data]);

  return <Chart options={data.options} type={"bar"} series={data.series}></Chart>;
};

export default BarChartApex;
