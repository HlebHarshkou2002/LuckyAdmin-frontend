import React from "react";
import s from "./CreateSupply.module.scss"
import SupplyProducts from "../../Components/SupplyProducts/SupplyProducts";
import SupplyForm from "../../Components/SupplyForm/SupplyForm";

function CreateSupply() {
  const productsId = []
  return (
    <div className={s.supply__block}>
      <SupplyProducts productsId={productsId}/>
      <SupplyForm productsId={productsId}/>
    </div>
  );
}

export default CreateSupply;
