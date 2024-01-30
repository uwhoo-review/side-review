import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
// import * as d3 from "d3";

const DonutChartApex = () => {
  const charRef = useRef<any>(null);
  const [data, setData] = useState({
    series: [1, 2, 3, 4, 5],

    options: {
      labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
      fill: {
        type: "solid",
      },

      stroke: {
        show: false,
      },
      legend: {
        labels: {
          colors: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
              },
            },
          },
        },
      },
    },
  });

  /*  const svgRef = useRef<HTMLDivElement | null>(null);
  function chartRender(svg: any) {}*/

  useEffect(() => {
    console.log(charRef.current);
  }, [data]);

  // return <div ref={svgRef}></div>;
  return <Chart ref={charRef} options={data.options} type={"donut"} series={data.series}></Chart>;
};

export default DonutChartApex;
