import React from "react";
import s from './Product.module.scss'

function Product(props) {
    return(
        <tr className={s.product__wrapper}>
            <td><img src={props.imgUrl} alt="" /></td>
            <td><a href={`http://localhost:3001/products/${props._id}`}>{props.title}</a></td>
            <td>{props.author}</td>
            <td>{props.price}BYN</td>
            
        </tr>
    )
}

export default Product;