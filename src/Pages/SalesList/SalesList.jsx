import React from "react";
import Sale from "./Sale/Sale";
import s from "./SalesList.module.scss"

function SalesList(props) {


    return (
        <div className={s.sales__wrapper}>
            <div className={s.header}>
                <div className={s.header__item}>
                    Наименование товара
                </div>
                <div className={s.header__item}>
                    Цена
                </div>
                <div className={s.header__item}>
                    Покупатель
                </div>
                <div className={s.header__item}>
                    Дата продажи
                </div>
            </div>
            {props.salesData.map((sale) => (
                <Sale title={sale.title} price={sale.price} createdAt={sale.createdAt} user={sale.user}/>
            ))
}
        </div>
    )
}

export default SalesList;