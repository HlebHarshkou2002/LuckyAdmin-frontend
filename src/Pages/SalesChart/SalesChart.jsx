import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from 'chart.js/auto';
import { Bar, Line } from "react-chartjs-2";

import s from "./SalesChart.module.scss";
import { fetchProducts } from "../../redux/slices/products";
import SalesSidebar from "../../Components/SalesSidebar/SalesSidebar";

const SalesChart = () => {
  const dispatch = useDispatch();
  let products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);

  const isProductsLoading = status === "loading";

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  let salesArray = [];
  const getSortUniqueDateOfSales = (products) => {
    let datesOfSale = [];
    let sales = []
    for (let el of products) {
      for(let sale of el.sales) {
        let date = sale.dayOfSale.toString() + "." + sale.monthOfSale.toString() + "." + sale.yearOfSale.toString()
        datesOfSale.push(date)
      }
    }
    const newSet = new Set(datesOfSale)
    let uniqueDatesOfSale = Array.from(newSet);
    uniqueDatesOfSale = uniqueDatesOfSale.sort();

    //Начинаем считать продажи по известным дням
    let sumArrDates = []
    for(let date of uniqueDatesOfSale) {
      let arrDates = date.split('.');
      arrDates = arrDates.map(string => +string)
      sumArrDates.push(arrDates)
    }

    for(let dateArray of sumArrDates) {
      let salesOfDatesCount = 0;
      for(let el of products) {
        for(let sale of el.sales) {
          if(sale.dayOfSale === dateArray[0] && sale.monthOfSale === dateArray[1] && sale.yearOfSale === dateArray[2]) {
            salesOfDatesCount += sale.saleCount;
          }
        }
      }
      salesArray.push(salesOfDatesCount);
    }

    datesOfSale = []
    for(let el of uniqueDatesOfSale) {
      datesOfSale.push(el)
    }
    console.log("Даты продаж", datesOfSale)
    return datesOfSale;
  }


  let datesOfSale = [];
  if (!isProductsLoading) {
    datesOfSale = getSortUniqueDateOfSales(products)
  }

  const lineChartData = {
    labels: datesOfSale,
    datasets: [
      {
        data: salesArray,
        label: "Sales",
        borderColor: "#3333ff",
        backgroundColor: "rgba(0, 0, 255, 0.5)",
        fill: true,
      },

    ],
  };

  return (
    <div className={s.chart__wrapper}>
      {isProductsLoading ? (
        "Loading"
      ) : (
        <div>
          <Line
            type="bar"
            width={130}
            height={50}
            options={{
              title: {
                display: true,
                text: "COVID-19 Cases of Last 3 Months",
                fontSize: 15,
              },
              legend: {
                display: true, //Is the legend shown?
                position: "top", //Position of the legend.
              },
            }}
            data={lineChartData}
          />
        </div>
      )}
    </div>
  );
};

export default SalesChart;
