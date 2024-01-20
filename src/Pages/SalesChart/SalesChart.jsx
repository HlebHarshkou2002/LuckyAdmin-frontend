import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { fetchSales } from "../../redux/slices/sales";
import s from "./SalesChart.module.scss";
import SalesList from "../SalesList/SalesList";

const SalesChart = () => {
  const dispatch = useDispatch();
  const { sales } = useSelector((state) => state.sales);

  const isSalesDataLoading = sales.status === "loading";

  React.useEffect(() => {
    dispatch(fetchSales());
  }, []);

  //   const salesData = [
  //     { title: "react", price: 13.99, date: "2023-09-11" },
  //     { title: "mongo", price: 23.99, date: "2023-11-11" },
  //     { title: "mongo", price: 3.99, date: "2023-11-11" },
  //     { title: "mongo", price: 15, date: "2023-11-11" },
  //     { title: "mongo", price: 24.99, date: "2023-11-11" },
  //   ];

  return (
    <div className={s.chart__wrapper}>
      {isSalesDataLoading ? (
        "Loading"
      ) : (
        <div>
          {/* <LineChart width={1200} height={300} data={sales.items.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
            <Line type="monotone" dataKey={1500} stroke="#111" />
          </LineChart> */}


          <SalesList salesData={sales.items.data} />
        </div>
      )}
    </div>
  );
};

export default SalesChart;
