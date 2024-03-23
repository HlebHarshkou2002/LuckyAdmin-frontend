import React from "react";
import s from "./SaleBoard.module.scss"
import { InfoCircleOutlined } from '@ant-design/icons';

import { Typography} from 'antd';
const { Title } = Typography;

function SaleBoard(props) {
    return(
        <div className={s.board__block}>
            <div className={s.board__icon}>
                {props.boardImg}
            </div>
            <p className={s.board__index}>{props.value} {props.calculation}</p>
            <Title level={5} type="secondary" className={s.board__title}>{props.title}</Title>
            <div className={s.info__icon}>
                <InfoCircleOutlined style={{ fontSize: '30px'}}/>
            </div>
        </div>
    )
}

export default SaleBoard;