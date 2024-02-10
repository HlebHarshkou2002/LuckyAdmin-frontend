import React from "react";
import s from "./Provider.module.scss";

function Provider(props) {
  console.log(props);
  return (
    <div className={s.provider__block}>
      <div>{props.provider.providerName}</div>
      <div>{props.provider.contactPerson}</div>
      <div>{props.provider.email}</div>
      <div>
        {props.provider.providerStatus ? "Работаем" : "Приостановлен"}
        </div>
        <div>
        {props.provider.workingConditions}
        </div>
    </div>
  );
}

export default Provider;
