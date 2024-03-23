import React from "react";
import s from "./Sale.module.scss"

function Sale(props) {
    let date = new Date(props.createdAt)

    let revenue = (props.price * props.saleCount).toFixed(2);
    let cost = (props.deliveryPrice * props.saleCount).toFixed(2);
    let profit = (revenue - cost).toFixed(2);
    let markup = (((props.price - props.deliveryPrice) / props.deliveryPrice )* 100).toFixed(2)
    return(
        <tr className={s.sale__wrapper}>
            <td>
                {props.title}
            </td>
            <td>
                {props.saleCount}
            </td>
            <td>
                {revenue}
            </td>
            <td>
                {cost}
            </td>
            <td>
                {profit}
            </td>
            <td>
                {markup}
            </td>
            <td>
                {props.categories}
            </td>
            <td>
                {props.provider === null ? "Не поставляется" : props.provider.providerName}
            </td>
            <td>
                {date.getDate() + "."}
                {date.getMonth() + "."}
                {date.getFullYear()}
            </td>
        </tr>
    )
}

export default Sale;