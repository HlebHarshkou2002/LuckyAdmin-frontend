import React from "react";
import s from "./Provider.module.scss";

function Provider(props) {
  console.log(props);
  return (
    <tr className={s.provider__block}>
      <td>{props.provider.providerName}</td>
      <td>{props.provider.contactPerson}</td>
      <td>{props.provider.email}</td>
      <td>{props.provider.providerStatus ? <div><div className={s.status__success}></div> <span>Работаем</span></div>: <div><div className={s.status__process}></div> <span>Приостановлен</span></div>}</td>
      <td>{props.provider.workingConditions}</td>
    </tr>
  );
}

export default Provider;
