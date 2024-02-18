import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
// import * as d3 from "d3";

const DonutChartApex = ({ ratings }: any) => {
  const charRef = useRef<any>(null);
  const [data, setData] = useState({
    series: ratings.map((v: any) => v.rating),
    options: {
      labels: ratings
        .sort((a: any, b: any) => a.rating - b.rating)
        .map((v: any) => v.rating + "점"),
      // labels: ["4.5 ~ 5점", "3.5 ~ 4점", "2.5 ~ 3점", "1.5 ~ 2점", "0.5 ~ 1점"],
      // labels: [
      //   "5점",
      //   "4.5점",
      //   "4점",
      //   "3.5점",
      //   "3점",
      //   "2.5점",
      //   "2점",
      //   "1.5점",
      //   "2점",
      //   "1점",
      //   "0.5점",
      // ],
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
          colors: new Array(ratings.length).fill("#fff"),
          useSeriesColors: false,
        },
        markers: {
          fillColors: ["#795DFF", "#9A85FF", "#B8A9FF", "#D2C9FF", "#E5E0FF"],
        },
      },
      series: ratings.map((v: any) => v.count),
      plotOptions: {
        pie: {
          donut: {
            size: "50px",
          },
        },
      },
    },
  });

  useEffect(() => {}, []);

  // return <div ref={svgRef}></div>;
  return <Chart ref={charRef} options={data.options} type={"donut"} series={data.series}></Chart>;
};

export default DonutChartApex;
