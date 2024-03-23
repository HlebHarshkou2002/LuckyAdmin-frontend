import React from "react";
import { Bar } from "react-chartjs-2";
import s from "./BarChart.module.scss";

function BarChart(props) {
  const barChartData = {
    labels: props.datesOfSale,
    datasets: [
      {
        data: props.salesArray,
        label: "Продажи(Шт)",
        borderColor: "#3333ff",
        backgroundColor: "rgba(66, 142, 255, 0.6)",
        fill: true,
      },
    ],
  };
  return (
    <div className={s.chart__block}>
      <Bar
        type="bar"
        width={130}
        height={50}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Количество проданных товаров",
              fontSize: 15,
            },
            legend: {
              display: true, //Is the legend shown?
              position: "bottom", //Position of the legend.
            }
          }
        }}
        data={barChartData}
      />
    </div>
  );
}

export default BarChart;
