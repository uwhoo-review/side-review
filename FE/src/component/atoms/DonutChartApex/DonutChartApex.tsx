import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
// import * as d3 from "d3";

const DonutChartApex = () => {
  const charRef = useRef<any>(null);
  const [data, setData] = useState({
    series: [5, 4, 3, 2, 1],
    options: {
      labels: ["4.5 ~ 5점", "3.5 ~ 4점", "2.5 ~ 3점", "1.5 ~ 2점", "0.5 ~ 1점"],
      dataLabels: {
        enabled: false,
      },
      fill: {
        colors: ["#795DFF", "#9A85FF", "#B8A9FF", "#D2C9FF", "#E5E0FF"],
      },
      stroke: {
        show: true,
        width: 4,
        colors: ["#353535"],
      },
      legend: {
        fontSize: "14px",
        fontFamily: "Pretendard",
        fontWeight: 500,
        labels: {
          colors: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
          useSeriesColors: false,
        },
        markers: {
          fillColors: ["#795DFF", "#9A85FF", "#B8A9FF", "#D2C9FF", "#E5E0FF"],
        },
      },
      series: [5, 4, 3, 2, 1],
      plotOptions: {
        pie: {
          donut: {
            size: "50px",
          },
        },
      },
    },
  });


  // return <div ref={svgRef}></div>;
  return <Chart ref={charRef} options={data.options} type={"donut"} series={data.series}></Chart>;
};

export default DonutChartApex;
