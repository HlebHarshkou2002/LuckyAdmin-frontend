import React from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "./SalesChart.module.scss";
import { fetchProducts } from "../../redux/slices/products";

import SalesSidebar from "../../Components/SalesSidebar/SalesSidebar";
import LineChart from "./LineChart/LineChart";
import BarChart from "./BarChart/BarChart";
import PieChart from "./PieChart/PieChart";
import SaleBoard from "../../Components/SaleBoard/SaleBoard";

import { DollarOutlined, BarChartOutlined, CreditCardOutlined, MonitorOutlined } from '@ant-design/icons';


const SalesChart = () => {
  const dispatch = useDispatch();
  let products = useSelector((state) => state.products.products);
  let filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  );
  const status = useSelector((state) => state.products.status);

  const isProductsLoading = status === "loading";

  if (filteredProducts.length === 0) {
    filteredProducts = products;
  }

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  //Массив содержит информацию о количестве продаж товаров по датам
  let salesCountArray = [];
  //Массив который содержит информацию о прибыли для графиков
  let salesProfitArray = [];

  const getSortUniqueDateOfSales = (products) => {
    let datesOfSale = [];
    for (let el of products) {
      for (let sale of el.sales) {
        datesOfSale.push(sale.dateOfSale);
      }
    }
    const newSet = new Set(datesOfSale);
    let uniqueDatesOfSale = Array.from(newSet);
    uniqueDatesOfSale = uniqueDatesOfSale.sort();

    //Начинаем считать продажи по известным дням
    for (let date of uniqueDatesOfSale) {
      let salesOfDatesCount = 0;
      let profitOfDates = 0;
      for (let el of products) {
        for (let sale of el.sales) {
          if (sale.dateOfSale === date) {
            salesOfDatesCount += sale.saleCount;
            profitOfDates = sale.saleCount * el.price;
          }
        }
      }
      salesCountArray.push(salesOfDatesCount);
      salesProfitArray.push(profitOfDates);
    }

    datesOfSale = [];
    for (let el of uniqueDatesOfSale) {
      datesOfSale.push(el);
    }
    return datesOfSale;
  };

  const getSumOfProfit = (products) => {
    let profitOfProduct;
    let sumOfProfit = 0;

    for (let el of products) {
      let saleCount = 0
      for (let sale of el.sales) {
        saleCount += sale.saleCount
      }
      profitOfProduct = el.price * saleCount;
      sumOfProfit += profitOfProduct;
    }
    return sumOfProfit;
  };

  const getSumCountOfSales = (products) => {
    let sumCountOfSales = 0;

    for (let el of products) {
      for (let sale of el.sales) {
        sumCountOfSales += sale.saleCount
      }
    }
    return sumCountOfSales;
  };

  const getSumCostPrice = (products) => {
    let sumCostPrice = 0;

    for (let el of products) {
      let saleCount = 0
      for (let sale of el.sales) {
        saleCount += sale.saleCount
      }
      sumCostPrice += el.deliveryPrice * saleCount;
    }
    return sumCostPrice;
  };

  let sumOfProfit = 0;
  let sumCountOfSales = 0;
  let datesOfSale = [];
  let profitPerCount = 0;
  let sumCostPrice = 0;
  let income = 0;
  if (!isProductsLoading) {
    datesOfSale = getSortUniqueDateOfSales(filteredProducts);
    sumOfProfit = getSumOfProfit(filteredProducts);
    sumCountOfSales = getSumCountOfSales(filteredProducts);
    sumCostPrice = getSumCostPrice(filteredProducts);

    income = sumOfProfit - sumCostPrice;
    profitPerCount = income / sumCountOfSales;
  }

  return (
    <div className={s.chart__wrapper}>
      {isProductsLoading ? (
        "Loading"
      ) : (
        <div>
          <div className={s.dashboard}>
            <div>
              <SaleBoard
                title={"Прибыль"}
                value={income}
                calculation={"BYN"}
                boardImg={<DollarOutlined style={{ fontSize: '26px' }} />}
                infoTitle={"Прибыль в рублях"}
                info={"Сколько валовой прибыли мы получили от продаж"}
              />
            </div>
            <div>
              <SaleBoard
                title={"Количество продаж"}
                value={sumCountOfSales}
                calculation={"Шт"}
                boardImg={<BarChartOutlined style={{ fontSize: '26px' }} />}
                infoTitle={"Количество продаж"}
                info={"Сколько товара мы продали в штуках"}

              />
            </div>
            {/* <div>
              <SaleBoard
                title={"ВП/Шт"}
                value={profitPerCount}
                calculation={"ВП/Шт"}
                boardImg={<MonitorOutlined style={{ fontSize: '30px'}}/>}

              />
            </div> */}
            <div>
              <SaleBoard
                title={"Выручка"}
                value={sumOfProfit}
                calculation={"BYN"}
                boardImg={<CreditCardOutlined style={{ fontSize: '26px' }} />}
                infoTitle={"Выручка в рублях"}
                info={"Сколько всего денег мы заработали от продаж товаров"}
              />
            </div>
            {/* <div>
              <SaleBoard
                title={"Себестоимость"}
                value={sumCostPrice}
                calculation={"BYN"}
              />
            </div> */}
          </div>
          <LineChart
            datesOfSale={datesOfSale}
            salesProfitArray={salesProfitArray}
          />
          <div className={s.sub__charts}>
            <BarChart datesOfSale={datesOfSale} salesArray={salesCountArray} />
            <PieChart
              products={filteredProducts}
              datesOfSale={datesOfSale}
              salesArray={salesCountArray}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesChart;
