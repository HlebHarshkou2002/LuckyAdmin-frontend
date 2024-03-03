import React from "react";
import s from "./Sale.module.scss"

function Sale(props) {
    let date = new Date(props.createdAt)

    return(
        <div className={s.sale__wrapper}>
            <div>
                {props.title}
            </div>
            <div>
                {props.saleCount}
            </div>
            <div>
                {(props.price * props.saleCount).toFixed(2)}
            </div>
            <div>
                {props.categories}
            </div>
            <div>
                {props.provider === null ? "Не поставляется" : props.provider.providerName}
            </div>
            <div>
                {date.getDate() + "."}
                {date.getMonth() + "."}
                {date.getFullYear()}
            </div>
        </div>
    )
}

export default Sale;