import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";

const DonutChartApex = () => {
  const charRef = useRef<any>(null);
  const [data, setData] = useState({
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ['A', 'B', 'C', 'D', 'E']
  });

/*  const svgRef = useRef<HTMLDivElement | null>(null);
  function chartRender(svg: any) {}*/

  useEffect(() => {
    console.log(charRef.current)
  }, [data]);

  // return <div ref={svgRef}></div>;
  return <Chart ref={charRef} options={data.options} type={"donut"} series={data.series}></Chart>;
};

export default DonutChartApex;
