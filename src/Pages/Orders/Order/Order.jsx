import axios from "../../../redux/axios";
import React from "react";
import s from "./Order.module.scss"

import { Button, Flex } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { NavLink } from "react-router-dom";

function Order(props) {

    const onOrderReady = () => {
        axios.post("/orders/ready", {
            orderId: props.id
        })
        openNotificationReady("success");
    }

    const onOrderApprove = () => {
        axios.post("/products/sale", props.products)
        axios.post("/orders/approve", {
            orderId: props.id
        })
        openNotificationApprove("success");
    }

    const [api, contextHolder] = notification.useNotification();
    const openNotificationReady = (type) => {
        api[type]({
            message: "Выполнено!",
            description: "Заказ успешно собран!",
        });
    };

    const openNotificationApprove = (type) => {
        api[type]({
            message: "Выполнено!",
            description: "Заказ успешно отдан!",
        });
    };

    return (
        <tr className={s.order__wrapper}>
            {contextHolder}
            <td><NavLink to={`/orders/${props.id}`}>{props.id}</NavLink></td>
            <td>{props.userName}</td>
            <td>{new Date(props.dateOfOrder).toLocaleDateString()}</td>
            <td>
                {
                    (props.orderStatus === "process") ?
                        (
                            <div>
                                <div className={s.status__process}>

                                </div>
                                {" "}
                                <span>
                                    Собирается
                                </span>
                            </div>

                        )
                        :
                        ((props.orderStatus === "ready") ?
                            (
                                <div>
                                    <div className={s.status__ready}>
                                    </div>
                                    {" "}
                                    <span>
                                        Готов к выдаче
                                    </span>
                                </div>
                            )

                            :
                            <div>
                                <div className={s.status__success}>
                                </div>
                                {" "}
                                <span>
                                    Оплачен
                                </span>
                            </div>

                        )
                }
            </td>
            <td>
                {
                    (props.orderStatus === "process") ?
                        (
                            <div>
                                <Button type="primary" onClick={onOrderReady} icon={<CheckCircleOutlined style={{ fontSize: "14px", defaultActiveColor: "#fff" }} />}>
                                    Заказ собран
                                </Button>
                            </div>
                        )
                        :
                        ((props.orderStatus === "ready") ?
                            (
                                <div>
                                    <Button type="primary" onClick={onOrderApprove} icon={<CheckCircleOutlined style={{ fontSize: "14px" }} />}>
                                        Заказ отдан
                                    </Button>

                                </div>

                            )

                            :
                            <p className={s.order__ok}>Заказ отдан</p>
                        )
                }

            </td>
            <td>
                {
                    (props.orderStatus === "process") ?
                        <div>
                            <Button type="primary" danger icon={<CloseCircleOutlined style={{ fontSize: "14px" }} />}>Отменить заказ</Button>
                        </div>
                        :
                        ((props.orderStatus === "ready") ?
                            <div>
                                <Button type="primary" danger icon={<CloseCircleOutlined style={{ fontSize: "14px" }} />}>Отменить заказ</Button>
                            </div>
                            :
                            ""
                        )
                }

            </td>

        </tr>
    )
}

export default Order