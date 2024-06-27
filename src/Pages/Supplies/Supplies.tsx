import axios from "axios";
import React from "react";
import { fetchSupplies } from "../../redux/slices/supplies.ts";
import Supply from "./Supply/Supply.tsx";
import s from './Supplies.module.scss'
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";

function Supplies() {
  const dispatch = useAppDispatch();
  const supplies = useAppSelector((state) => state.supplies.supplies);
  const status = useAppSelector((state) => state.supplies.status);

  const isSuppliesLoading : boolean = status === "loading";

  React.useEffect(() => {
    const supplies = dispatch(fetchSupplies());
  }, []);

  return (
    <table className={s.supply__block}>
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
