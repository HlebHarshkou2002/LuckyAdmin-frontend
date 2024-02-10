import React from "react";
import s from "./SupplyProduct.module.scss";

function SupplyProduct(props) {
  return (
    <div className={s.product__block}>
      <div>{props._id}</div>
      <div>{props.title}</div>
      <div>
        {props.price}
        BYN
      </div>
      <div>{props.genres.join(", ")}</div>
      <div>{props.userName}</div>
    </div>
  );
}

export default SupplyProduct;
