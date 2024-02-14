import React from "react";
import s from "./Supply.module.scss";
import { NavLink } from "react-router-dom";

import CheckMark from '../../../images/Supplies/zelenaja-galochka.png'
import axios from "../../../redux/axios";

function Supply(props) {
  let date = new Date(props.dateOfDelivery);


  const approveSupply = () => {
    try {
      let fields = {id: props.id}
      axios.patch('/supplies', fields)
      alert("Поставка успешно принята!")
    } catch(err) {
      alert("Не удалось провести поставку")
    }

  }


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
        {props.supplyStatus ? "Прибыла" : "В пути"}
      </div>
      <div>
      {props.supplyStatus ? "" : <img src={CheckMark} onClick={approveSupply} alt="" />}
      </div>
    </div>
  );
}

export default Supply;
