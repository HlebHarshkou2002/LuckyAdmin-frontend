import React from "react";
import { Pie } from "react-chartjs-2";
import s from "./PieChart.module.scss"

function PieChart(props) {
  const categoriesArray = [
    "Научная литература",
    "Программирование",
    "Предпринимательская деятельность",
    "Дизайн и искусство",
    "Языки",
    "Зарубежная литература",
    "Право",
  ];

  let salesByCategories = [];

  for (let category of categoriesArray) {
    let sumCountOfSalesByCategory = 0
    for (let el of props.products) {
      if (el.categories[0] === category) {
        sumCountOfSalesByCategory += el.saleCount;
      }
    }
    salesByCategories.push(sumCountOfSalesByCategory)
  }

  const pieChartData = {
    labels: categoriesArray,
    datasets: [
      {
        data: salesByCategories,
        label: "Продажи(Шт)"
      },
    ],
  };

  return (
    <div className={s.chart__block}>
      <Pie
        type="pie"
        width={130}
        height={50}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Количество продаж по категориям",
              fontSize: 15,
            },
            legend: {
              display: true, //Is the legend shown?
              position: "bottom", //Position of the legend.
            }
          }
        }}
        data={pieChartData}
      />
    </div>
  );
}

export default PieChart;
