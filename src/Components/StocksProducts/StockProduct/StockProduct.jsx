import React from "react";
import s from "./StockProduct.module.scss"

function StockProduct(props) {

    return(
        <div className={s.sale__wrapper}>
            <div>
                {props.title}
            </div>
            <div>
                {props.storeCount}
            </div>
            <div>
                {props.storeCount * props.price} 
            </div>
            <div>
                {props.storeCount * props.deliveryPrice}
            </div>
            <div>
                {props.providerName ? props.providerName : "Не поставляется"}
            </div>
            <div>
                {Math.floor((props.storeCount * 30) / props.saleCount)}
            </div>
        </div>
    )
}

export default StockProduct;