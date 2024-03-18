import React from "react";
import s from "./SaleBoard.module.scss"

function SaleBoard(props) {
    return(
        <div className={s.board__block}>
            <h2>{props.title}</h2>
            <p className={s.board__index}>{props.value} {props.calculation}</p>
        </div>
    )
}

export default SaleBoard;