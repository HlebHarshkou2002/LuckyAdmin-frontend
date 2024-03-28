import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSupplies } from "../../redux/slices/supplies";
import Supply from "./Supply/Supply.jsx";
import s from './Supplies.module.scss'

function Supplies() {
  const dispatch = useDispatch();
  const supplies = useSelector((state) => state.supplies.supplies);
  const status = useSelector((state) => state.supplies.status);

  const isSuppliesLoading = status === "loading";


  console.log(supplies);
  // console.log(status);

  React.useEffect(() => {
    const supplies = dispatch(fetchSupplies());
  }, []);

  return (
    <table className={s.supply__block} border="1" bordercolor="#f0f0f0">
      <tr className={s.header}>
        <th className={s.header__item}>Наименование поставки</th>
        <th className={s.header__item}>Поставщик</th>
        <th className={s.header__item}>Дата поставки</th>
        <th className={s.header__item}>Статус</th>
        <th className={s.header__item}>Действие</th>
      </tr>
      {isSuppliesLoading
        ? "Loading"
        : supplies.map((supply) => {
            return (
              <Supply
                id={supply._id}
                title={supply.title}
                dateOfDelivery={supply.dateOfDelivery}
                providerName={supply.provider?.providerName}
                supplyStatus={supply.supplyStatus}
              />
            );
          })}
    </table>
  );
}

export default Supplies;
