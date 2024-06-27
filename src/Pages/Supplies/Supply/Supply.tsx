import React from "react";
import s from "./Supply.module.scss";
import { NavLink } from "react-router-dom";

import axios from "../../../redux/axios.js";

import { notification } from "antd";
import { Button, Flex } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { approveSupplyStatus } from "../../../redux/slices/supplies.ts";


type SupplyProps = {
  id: String;
  title: String;
  dateOfDelivery: Date;
  providerName: String;
  supplyStatus: boolean;
}

function Supply(props : SupplyProps) {
  const dispatch = useDispatch();
  let date = new Date(props.dateOfDelivery);

  const openNotification = (type) => {
    api[type]({
      message: "Выполнено!",
      description: "Поставка успешно принята!",
    });
  };

  const approveSupply = () => {
    try {
      let fields = { id: props.id };
      axios.patch("/supplies", fields);

      dispatch(approveSupplyStatus(fields));
      openNotification("success");
    } catch (err) {
      alert("Не удалось провести поставку");
    }
  };

  const [api, contextHolder] = notification.useNotification();

  return (
    <tr className={s.supply__block}>
      {contextHolder}
      <td>
        <NavLink to={`/supplies/${props.id}`}>{props.title}</NavLink>
      </td>
      <td>{props.providerName ? props.providerName : "Удалён"}</td>
      <td>
        {date.getDate() + "."}
        {date.getMonth() + "."}
        {date.getFullYear()}
      </td>
      <td>
        {props.supplyStatus ? (
          <div>
            <div className={s.status__success}></div> <span>Прибыла</span>
          </div>
        ) : (
          <div>
            <div className={s.status__process}></div> <span>В пути</span>
          </div>
        )}
      </td>
      <td>
        {props.supplyStatus ? (
          ""
        ) : (
          <Button
            type="primary"
            onClick={approveSupply}
            icon={<CheckCircleOutlined style={{ fontSize: "14px" }} />}
          >
            Принять поставку
          </Button>
        )}
      </td>
    </tr>
  );
}

export default Supply;
