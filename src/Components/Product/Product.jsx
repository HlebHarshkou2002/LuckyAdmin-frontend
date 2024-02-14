import React from "react";
import s from './Product.module.scss'

function Product(props) {
    return(
        <div className={s.product__wrapper}>
            <div><img src={props.imgUrl} alt="" /></div>
            <div>{props.title}</div>
            <div>{props.author}</div>
            <div>{props.price}BYN</div>
            
        </div>
    )
}

export default Product;