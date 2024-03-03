import React from "react";
import s from "./CreateSupply.module.scss"
import SupplyProducts from "../../Components/SupplyProducts/SupplyProducts";
import SupplyForm from "../../Components/SupplyForm/SupplyForm";

function CreateSupply() {
  const products = []
  return (
    <div className={s.supply__block}>
      <SupplyProducts products={products}/>
      <SupplyForm products={products}/>
    </div>
  );
}

export default CreateSupply;
