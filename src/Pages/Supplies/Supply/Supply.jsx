import React from "react";
import s from "./Supply.module.scss";
import { NavLink } from "react-router-dom";

function Supply(props) {
  let date = new Date(props.dateOfDelivery);
  return (
    <div className={s.supply__block}>
      <div>
        <NavLink to={`/supplies/${props.id}`}>{props.title}</NavLink>
      </div>
      <div>{props.providerName}</div>
      <div>
        {date.getDate() + "."}
        {date.getMonth() + "."}
        {date.getFullYear()}
      </div>
      <div>
        <select>
          <option>{props.supplyStatus ? "Прибыла" : "В пути"}</option>
          <option>{!props.supplyStatus ? "Прибыла" : "В пути"}</option>
        </select>
      </div>
    </div>
  );
}

export default Supply;
