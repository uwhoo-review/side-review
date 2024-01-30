import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";

const BarChartApex = () => {
  const [data, setData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  /*  const svgRef = useRef<HTMLDivElement | null>(null);
    function chartRender(svg: any) {}*/

  useEffect(() => {

  }, [data]);

  // return <div ref={svgRef}></div>;
  return <Chart options={data.options} type={"bar"} series={data.series}></Chart>;
};

export default BarChartApex;
