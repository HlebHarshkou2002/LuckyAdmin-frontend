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

import s from "./SalesChart.module.scss";

const SalesChart = () => {
  return (
    <div className={s.chart__wrapper}>
      {/* <LineChart width={1200} height={300} data={sales.items.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <Line type="monotone" dataKey={1500} stroke="#111" />
      </LineChart> */}
    </div>
  );
};

export default SalesChart;
