import { useDispatch, useSelector } from "react-redux";
import axios from "../../redux/axios";
import React from "react";
import { fetchOrders } from "../../redux/slices/orders";
import Order from "./Order/Order";

import s from "./Orders.module.scss"


function Orders() {
    const dispatch = useDispatch();

    const { items, status } = useSelector((state) => state.orders.orders)
    const isOrdersLoading = status === "loading";


    React.useEffect(() => {
        dispatch(fetchOrders())
    }, [])

    return (
        <table className={s.block} border="1" bordercolor="#f0f0f0">
            <tr className={s.header}>
                <th className={s.header__item}>Идентификатор заказа</th>
                <th className={s.header__item}>Покупатель</th>
                <th className={s.header__item}>Дата заказа</th>
                <th className={s.header__item}>Статус</th>
                <th className={s.header__item}>Действие</th>
                <th className={s.header__item}>Отмена заказа</th>
            </tr>
            {isOrdersLoading ? "Loading" :
                items.data.map((order) => (
                    <Order id={order._id} userName={order.user.fullName} dateOfOrder={order.createdAt} orderStatus={order.orderStatus} products={order.products} orderStatus={order.orderStatus}/>
                ))
            }
        </table>
    )
}

export default Orders