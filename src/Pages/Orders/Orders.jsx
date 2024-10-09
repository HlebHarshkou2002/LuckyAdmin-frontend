import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { addOrder, fetchOrders } from "../../redux/slices/orders";
import Order from "./Order/Order";

import s from "./Orders.module.scss"


function Orders() {
    const dispatch = useDispatch();

    const orders = useSelector((state) => state.orders.orders)
    const status = useSelector((state) => state.orders.status)
    const isOrdersLoading = status === "loading";

    //WebSocket
    React.useEffect(() => {
        dispatch(fetchOrders())
        const wsConnection = new WebSocket('ws://localhost:8080')

        wsConnection.onopen = () => {
            console.log("Socket подключился")
            const message = {
                event: "connection"
            }
            wsConnection.send(JSON.stringify(message))
        }
        wsConnection.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message)
            
            if (message.products) {
                dispatch(addOrder(message))
            }
        }
        wsConnection.onclose = () => {
            console.log("Socket закрыт")
        }
        wsConnection.onerror = () => {
            console.log("Socket ошибка")
        }


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
                orders.map((order) => (
                    <Order id={order._id} userName={order.user?.fullName} dateOfOrder={order.createdAt} orderStatus={order.orderStatus} products={order.products} />
                ))
            }
        </table>
    )
}

export default Orders