import React from "react";
import s from "./StockProduct.module.scss"

function StockProduct(props) {

    let inventory = Math.floor((props.storeCount * 30) / props.saleCount);
    return(
        <tr className={s.sale__wrapper}>
            <td>
                {props.title}
            </td>
            <td>
                {props.storeCount}
            </td>
            <td>
                {props.storeCount * props.price} 
            </td>
            <td>
                {props.storeCount * props.deliveryPrice}
            </td>
            <td>
                {props.providerName ? props.providerName : "Не поставляется"}
            </td>
            <td>
                {inventory ? inventory : 0}
            </td>
        </tr>
    )
}

export default StockProduct;