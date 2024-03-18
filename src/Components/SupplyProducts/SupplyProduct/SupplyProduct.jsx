import React, { useState } from "react";
import s from "./SupplyProduct.module.scss";



function SupplyProduct(props) {
  const [storeCount, setStoreCount] = useState();
  const [deliveryPrice, setDeliveryPrice] = useState();

  const handleChange = (event) => {
    let checked = event.target.checked;
    if(checked) {
      const product = {
        "_id" : props.id,
        "title" : props.title,
        "price" : props.price,
        "author" : props.author,
        "imgUrl" : props.imgUrl,
        "storeCount" : Number(storeCount),
        "deliveryPrice": Number(deliveryPrice)
      }

      props.products.push(product)
    }
  }


  return (
    <div className={s.product__block}>
      <div>{props.title}</div>
      <div>
        {props.price}
        BYN
      </div>
      <div>
        {props.storeCount}
      </div>
      <div>{props.categories.join(", ")}</div>
      <div><input type="number" placeholder="кол-во товара" name="storeCount" value={storeCount} onChange={e => setStoreCount(e.target.value)}/></div>
      <div><input type="number" placeholder="цена поставки" name="deliveryPrice" value={deliveryPrice} onChange={e => setDeliveryPrice(e.target.value)}/></div>
      <div><input type="checkbox" onChange={handleChange}/></div>
    </div>
  );
}

export default SupplyProduct;
