import React from "react";
import s from "./SupplyProduct.module.scss";



function SupplyProduct(props) {

  const handleChange = (event) => {
    let checked = event.target.checked;
    if(checked) {
      props.productsId.push(props.id)
    }
  }


  return (
    <div className={s.product__block}>
      <div>{props.title}</div>
      <div>
        {props.price}
        BYN
      </div>
      <div>{props.genres.join(", ")}</div>
      <div><input type="checkbox" onChange={handleChange}/></div>
    </div>
  );
}

export default SupplyProduct;
