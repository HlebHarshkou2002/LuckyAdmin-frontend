import React from "react";
import Chart from "chart.js/auto";
import s from "./LineChart.module.scss"
import { Bar, Line } from "react-chartjs-2";

function LineChart(props) {
  const lineChartData = {
    labels: props.datesOfSale,
    datasets: [
      {
        data: props.salesProfitArray,
        label: "Сумма(BYN)",
        borderColor: "rgba(100, 100, 255)",
        backgroundColor: "rgba(74, 8, 255, 0.5)",
        fill: true,
      },
    ],
  };

  return (
    <div className={s.chart__block}>
      <div></div>
      <Line
        type="line"
        width={130}
        height={50}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Прибыль",
              fontSize: 15,
            },
            legend: {
              display: true, //Is the legend shown?
              position: "bottom", //Position of the legend.
            }

          },
        }}
        data={lineChartData}
      />
    </div>
  );
}

export default LineChart;
