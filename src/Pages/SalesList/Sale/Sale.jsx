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
                {props.price} BYN
            </div>
            <div>
                {props.user.fullName}
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